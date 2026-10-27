"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Real-time black hole: a fullscreen GLSL quad with gravitational lensing,
 * a differentially-rotating accretion disk (fbm noise, doppler-boosted on
 * the approaching side), a photon ring, and a twinkling parallax starfield.
 * The whole scene drifts subtly with the mouse.
 *
 * Falls back to a static CSS gradient (`.hero-fallback`) on touch devices,
 * low-power hardware, reduced motion, or when WebGL is unavailable.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec2  uRes;
  uniform float uTime;
  uniform vec2  uMouse; // eased, -1..1

  varying vec2 vUv;

  #define VIOLET   vec3(0.545, 0.361, 0.965)
  #define MAGENTA  vec3(0.851, 0.275, 0.937)
  #define CYAN     vec3(0.133, 0.827, 0.933)
  #define HOT      vec3(1.0, 0.92, 0.88)

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.55;
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p = p * 2.1 + vec2(13.7, 7.3);
      amp *= 0.5;
    }
    return v;
  }

  // One twinkling star layer on a jittered grid.
  float stars(vec2 uv, float density, float threshold) {
    vec2 g = uv * density;
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    float h = hash21(id);
    if (h < threshold) return 0.0;
    vec2 offset = (vec2(h, fract(h * 37.91)) - 0.5) * 0.7;
    float d = length(f - offset);
    float star = smoothstep(0.08, 0.0, d);
    float twinkle = 0.55 + 0.45 * sin(uTime * (1.0 + h * 4.0) + h * 40.0);
    return star * twinkle;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);

    // Subtle camera drift with the mouse
    vec2 drift = uMouse * vec2(0.06, 0.04);
    uv -= drift;

    vec2 center = vec2(0.0, 0.02);
    vec2 toC = uv - center;
    float r = length(toC);

    // --- Gravitational lensing: bend space toward the hole ---
    float lens = 0.028 / (r + 0.09);
    vec2 lensedUv = uv - normalize(toC) * lens;

    vec3 col = vec3(0.0);

    // --- Starfield (sampled in lensed space => stars warp near the hole) ---
    vec2 su = lensedUv + drift * 0.5; // slight parallax against the drift
    float s = 0.0;
    s += stars(su + 13.0, 22.0, 0.965) * 0.9;
    s += stars(su * 1.8 + 41.0, 30.0, 0.975) * 0.6;
    s += stars(su * 3.1 + 7.0, 45.0, 0.985) * 0.35;
    col += vec3(0.85, 0.85, 1.0) * s;

    // Faint violet nebula haze
    float neb = fbm(su * 1.4 + vec2(uTime * 0.012, 0.0));
    col += VIOLET * neb * neb * 0.10;
    col += MAGENTA * fbm(su * 0.8 - vec2(0.0, uTime * 0.008)) * 0.045;
    float neb2 = fbm(su * 1.1 + vec2(-uTime * 0.009, uTime * 0.006) + 50.0);
    col += CYAN * neb2 * neb2 * 0.05;

    // --- Accretion disk (flattened => seen at an angle) ---
    vec2 dp = lensedUv - center;
    dp.y *= 2.9;
    float dr = length(dp);

    // Differential rotation: inner material orbits faster
    float spin = uTime * 0.55 / max(dr, 0.12);
    float cs = cos(spin), sn = sin(spin);
    vec2 rp = mat2(cs, -sn, sn, cs) * dp;

    float diskMask = smoothstep(0.13, 0.19, dr) * (1.0 - smoothstep(0.30, 0.78, dr));
    float density = fbm(rp * 5.5 + vec2(uTime * 0.05, 0.0));
    density = pow(density, 1.6);

    // Doppler beaming: the side rotating toward us glows brighter
    float doppler = 1.0 + 0.75 * (1.0 - smoothstep(-0.4, 0.4, dp.x / max(dr, 1e-4)));

    float heat = 1.0 - smoothstep(0.16, 0.65, dr); // hotter toward the inner edge
    // Cool cyan at the disk's cold outer rim, through violet and magenta,
    // to white-hot plasma at the inner edge
    vec3 diskCol = mix(CYAN * 0.6, VIOLET * 0.85, smoothstep(0.0, 0.45, heat));
    diskCol = mix(diskCol, MAGENTA, smoothstep(0.35, 0.85, heat));
    diskCol = mix(diskCol, HOT, heat * heat * 0.85);

    col += diskCol * diskMask * density * doppler * 2.3;

    // --- Event horizon: swallow all light ---
    float horizon = 0.085;
    float hole = smoothstep(horizon * 0.92, horizon * 1.1, r);
    col *= hole;

    // --- Photon ring: razor-thin bright rim at the horizon ---
    float ring = exp(-pow((r - horizon * 1.12) * 46.0, 2.0));
    col += mix(HOT, MAGENTA, 0.35) * ring * 1.6;

    // Soft ambient glow around the hole
    col += VIOLET * 0.055 / (r * r * 14.0 + 0.35) * hole;

    // --- Vignette + tonemap + grain ---
    float vig = 1.0 - smoothstep(0.55, 1.35, length(uv));
    col *= mix(0.45, 1.0, vig);
    col = col / (col + 0.85);              // soft Reinhard
    col = pow(col, vec3(0.92));            // slight lift
    col += (hash21(vUv * uRes + uTime) - 0.5) * 0.02;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function shouldFallback() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  if (window.innerWidth < 768) return true;
  if (navigator.deviceMemory && navigator.deviceMemory <= 4) return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;
  return false;
}

export default function BlackHole() {
  const mountRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (shouldFallback()) {
      setFallback(true);
      return;
    }

    const mount = mountRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
    } catch {
      setFallback(true);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uRes: { value: new THREE.Vector2(mount.clientWidth * dpr, mount.clientHeight * dpr) },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    // Eased mouse
    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const onMouse = (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // Pause when off-screen or tab hidden
    let visible = true;
    let inView = true;
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    io.observe(mount);
    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const clock = new THREE.Clock();
    let rafId;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      if (!visible || !inView) return;
      eased.x += (target.x - eased.x) * 0.04;
      eased.y += (target.y - eased.y) * 0.04;
      uniforms.uMouse.value.set(eased.x, eased.y);
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(loop);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.uRes.value.set(w * dpr, h * dpr);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (fallback) {
    return <div className="hero-fallback absolute inset-0" aria-hidden="true" />;
  }

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
