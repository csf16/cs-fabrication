import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const lp = (g: number, s: number, e: number) => clamp((g - s) / Math.max(1e-4, e - s));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

/* ══════════════════════════════════════════════════════════
   HIGH-PERFORMANCE PROCEDURAL TEXTURES
   Galvanized Steel MatCap: Pre-baked studio lighting + zinc sheen
══════════════════════════════════════════════════════════ */
function createGalvanizedMatCapTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;

  const grad = ctx.createRadialGradient(cx - 50, cy - 70, 20, cx, cy, size / 2);
  grad.addColorStop(0.00, '#FFFFFF');
  grad.addColorStop(0.12, '#E5E7EB');
  grad.addColorStop(0.32, '#D1D5DB');
  grad.addColorStop(0.55, '#94A3B8');
  grad.addColorStop(0.75, '#647488');
  grad.addColorStop(0.90, '#475569');
  grad.addColorStop(1.00, '#334155');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Add subtle zinc spangle crystal flakes
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % size;
    const y = Math.floor((i / 4) / size);
    const dist = Math.hypot(x - cx, y - cy);
    if (dist <= size / 2) {
      const noise = ((Math.sin(x * 12.3 + y * 34.7) * 43758.5453) % 1) * 16 - 8;
      const brush = Math.sin((x + y * 0.5) * 0.4) * 6;
      data[i] = clamp(data[i] + noise + brush, 0, 255);
      data[i + 1] = clamp(data[i + 1] + noise + brush + 2, 0, 255);
      data[i + 2] = clamp(data[i + 2] + noise + brush + 4, 0, 255);
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/* ══════════════════════════════════════════════════════════
   ACCURATE SLOTTED C-CHANNEL / UNISTRUT GEOMETRY
   Features real oval punch holes on back web & return lips
══════════════════════════════════════════════════════════ */
const CW = 0.15;        // Flange width (41mm scaled)
const CH = 0.15;        // Web height (41mm scaled)
const CT = 0.012;       // Steel gauge thickness
const LIP = 0.028;      // Inward return lip
const LIP_DOWN = 0.012; // Downward return curl

function makeSlottedCChannelGeometry(len: number): THREE.BufferGeometry {
  const halfW = CW / 2;
  const halfL = len / 2;

  // 1. Back Web with real oval punch slots
  const webShape = new THREE.Shape();
  webShape.moveTo(-halfW, -halfL);
  webShape.lineTo(halfW, -halfL);
  webShape.lineTo(halfW, halfL);
  webShape.lineTo(-halfW, halfL);
  webShape.lineTo(-halfW, -halfL);

  const slotPitch = 0.16;
  const slotLen = 0.095;
  const slotW = 0.046;
  const radius = slotW / 2;
  const straightHalf = (slotLen - slotW) / 2;

  const numSlots = Math.max(1, Math.floor((len - 0.06) / slotPitch));
  const startZ = -((numSlots - 1) * slotPitch) / 2;

  for (let i = 0; i < numSlots; i++) {
    const cz = startZ + i * slotPitch;
    const hole = new THREE.Path();
    hole.absarc(0, cz + straightHalf, radius, 0, Math.PI, false);
    hole.lineTo(-radius, cz - straightHalf);
    hole.absarc(0, cz - straightHalf, radius, Math.PI, Math.PI * 2, false);
    hole.lineTo(radius, cz + straightHalf);
    webShape.holes.push(hole);
  }

  const webGeo = new THREE.ExtrudeGeometry(webShape, {
    depth: CT,
    bevelEnabled: false,
    curveSegments: 8,
  });
  webGeo.rotateX(Math.PI / 2);
  webGeo.translate(0, -CH / 2 + CT / 2, 0);

  // 2. Left Flange with Return Lip
  const leftShape = new THREE.Shape();
  leftShape.moveTo(-halfW, -CH / 2);
  leftShape.lineTo(-halfW, CH / 2);
  leftShape.lineTo(-halfW + LIP, CH / 2);
  leftShape.lineTo(-halfW + LIP, CH / 2 - LIP_DOWN);
  leftShape.lineTo(-halfW + CT, CH / 2 - LIP_DOWN);
  leftShape.lineTo(-halfW + CT, -CH / 2 + CT);
  leftShape.lineTo(-halfW + CT, -CH / 2);
  leftShape.lineTo(-halfW, -CH / 2);

  const leftGeo = new THREE.ExtrudeGeometry(leftShape, { depth: len, bevelEnabled: false });
  leftGeo.translate(0, 0, -halfL);

  // 3. Right Flange with Return Lip
  const rightShape = new THREE.Shape();
  rightShape.moveTo(halfW, -CH / 2);
  rightShape.lineTo(halfW, CH / 2);
  rightShape.lineTo(halfW - LIP, CH / 2);
  rightShape.lineTo(halfW - LIP, CH / 2 - LIP_DOWN);
  rightShape.lineTo(halfW - CT, CH / 2 - LIP_DOWN);
  rightShape.lineTo(halfW - CT, -CH / 2 + CT);
  rightShape.lineTo(halfW - CT, -CH / 2);
  rightShape.lineTo(halfW, -CH / 2);

  const rightGeo = new THREE.ExtrudeGeometry(rightShape, { depth: len, bevelEnabled: false });
  rightGeo.translate(0, 0, -halfL);

  const merged = mergeGeometries([webGeo, leftGeo, rightGeo]);
  merged.computeVertexNormals();

  webGeo.dispose();
  leftGeo.dispose();
  rightGeo.dispose();

  return merged;
}

function makeBasePlateGeometry(): THREE.BufferGeometry {
  // Precision 4-hole steel base plate
  return new THREE.BoxGeometry(0.36, 0.018, 0.36);
}

const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const Z_DIR = new THREE.Vector3(0, 0, 1);

function quatFromEndpoints(a: THREE.Vector3, b: THREE.Vector3): THREE.Quaternion {
  const dir = new THREE.Vector3().subVectors(b, a).normalize();
  if (dir.lengthSq() < 1e-4) return new THREE.Quaternion();
  try {
    return new THREE.Quaternion().setFromUnitVectors(Z_DIR, dir);
  } catch {
    return new THREE.Quaternion();
  }
}

function midpoint(a: THREE.Vector3, b: THREE.Vector3): THREE.Vector3 {
  return new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
}

interface Piece {
  mesh: THREE.Mesh;
  iP: THREE.Vector3;
  iQ: THREE.Quaternion;
  fP: THREE.Vector3;
  fQ: THREE.Quaternion;
  iOp: number;
  as: number;
  ae: number;
}

interface Hero3DProps {
  fixedViewport?: boolean;
  minimal?: boolean;
  children?: React.ReactNode;
}

export const Hero3D: React.FC<Hero3DProps> = ({ fixedViewport = false, minimal = false, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetScrollRef = useRef(0);

  const animateProgressTo = useCallback((targetP: number, duration = 1600) => {
    const startP = targetScrollRef.current;
    const distance = targetP - startP;
    if (Math.abs(distance) < 0.01) return;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      targetScrollRef.current = clamp(startP + distance * ease, 0, 1);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, []);

  const smoothScrollTo = useCallback((targetY: number, duration = 2200) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 5) return;
    const startTime = performance.now();

    const scrollStep = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Gentle ease-in-out cubic curve for natural cinematic glide
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
  }, []);

  const handleScrub = useCallback((targetPercent: number, duration = 2200) => {
    if (fixedViewport) {
      animateProgressTo(targetPercent, 1600);
    } else {
      if (!containerRef.current) return;
      const total = containerRef.current.offsetHeight - window.innerHeight;
      smoothScrollTo(targetPercent * total, duration);
    }
  }, [fixedViewport, animateProgressTo, smoothScrollTo]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F5F4EF');

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 200);

    const matCapTexture = createGalvanizedMatCapTexture();

    const steelMaterial = new THREE.MeshMatcapMaterial({
      matcap: matCapTexture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });

    /* ══════════════════════════════════════════════════════════
       PRECISION STRUCTURAL GEOMETRY (Solar Ground Mount Racking)
    ══════════════════════════════════════════════════════════════ */
    const GFL = v3(-2.8, 0, 1.5);
    const GFR = v3(2.8, 0, 1.5);
    const GRL = v3(-2.8, 0, -1.5);
    const GRR = v3(2.8, 0, -1.5);

    const TFL = v3(-2.8, 1.50, 1.5);
    const TFR = v3(2.8, 1.50, 1.5);
    const TRL = v3(-2.8, 2.70, -1.5);
    const TRR = v3(2.8, 2.70, -1.5);

    const RAFTER_L_START = v3(-2.8, 1.30, 2.0);
    const RAFTER_L_END = v3(-2.8, 2.90, -2.0);

    const RAFTER_R_START = v3(2.8, 1.30, 2.0);
    const RAFTER_R_END = v3(2.8, 2.90, -2.0);

    const BRACE_FL_A = v3(-2.8, 0.65, 1.5);
    const BRACE_FL_B = v3(-2.8, 1.35, 1.88);

    const BRACE_FR_A = v3(2.8, 0.65, 1.5);
    const BRACE_FR_B = v3(2.8, 1.35, 1.88);

    const BRACE_RL_A = v3(-2.8, 1.30, -1.5);
    const BRACE_RL_B = v3(-2.8, 2.35, -0.65);

    const BRACE_RR_A = v3(2.8, 1.30, -1.5);
    const BRACE_RR_B = v3(2.8, 2.35, -0.65);

    const PURLIN_SPAN = 3.3;
    const PURLIN_1_L = v3(-PURLIN_SPAN, 1.45, 1.65);
    const PURLIN_1_R = v3(PURLIN_SPAN, 1.45, 1.65);

    const PURLIN_2_L = v3(-PURLIN_SPAN, 2.10, 0.00);
    const PURLIN_2_R = v3(PURLIN_SPAN, 2.10, 0.00);

    const PURLIN_3_L = v3(-PURLIN_SPAN, 2.75, -1.65);
    const PURLIN_3_R = v3(PURLIN_SPAN, 2.75, -1.65);

    type PieceDef = {
      a: THREE.Vector3;
      b: THREE.Vector3;
      as: number;
      ae: number;
      vis: boolean;
    };

    const definitions: PieceDef[] = [
      // 1. PRIMARY VERTICAL POSTS
      { a: GFL, b: TFL, as: 0.04, ae: 0.28, vis: true },
      { a: GFR, b: TFR, as: 0.06, ae: 0.30, vis: true },
      { a: GRL, b: TRL, as: 0.16, ae: 0.42, vis: true },
      { a: GRR, b: TRR, as: 0.18, ae: 0.44, vis: true },

      // 2. MAIN LONGITUDINAL RAFTER CHANNELS
      { a: RAFTER_L_START, b: RAFTER_L_END, as: 0.32, ae: 0.56, vis: true },
      { a: RAFTER_R_START, b: RAFTER_R_END, as: 0.34, ae: 0.58, vis: true },

      // 3. HORIZONTAL PURLIN RAILS
      { a: PURLIN_1_L, b: PURLIN_1_R, as: 0.50, ae: 0.68, vis: false },
      { a: PURLIN_2_L, b: PURLIN_2_R, as: 0.56, ae: 0.74, vis: false },
      { a: PURLIN_3_L, b: PURLIN_3_R, as: 0.62, ae: 0.80, vis: false },

      // 4. DIAGONAL KNEE BRACES
      { a: BRACE_FL_A, b: BRACE_FL_B, as: 0.72, ae: 0.88, vis: false },
      { a: BRACE_FR_A, b: BRACE_FR_B, as: 0.74, ae: 0.90, vis: false },
      { a: BRACE_RL_A, b: BRACE_RL_B, as: 0.80, ae: 0.94, vis: false },
      { a: BRACE_RR_A, b: BRACE_RR_B, as: 0.82, ae: 0.96, vis: false },
    ];

    /* ── INITIAL HERO STATE (Matches Image 1 Exact Side-By-Side Reference) ──
       Only clean steel channels in center hero view. No background boxes or artifacts.
    ── */
    const initialPositions = [
      v3(-0.48, 0.28, 0.40),
      v3(0.48, 0.22, 0.15),
      v3(-0.25, 0.60, -0.20),
      v3(0.35, 0.50, -0.40),
      v3(-0.10, 0.78, 0.20),
      v3(0.15, 0.12, -0.25),
    ];

    const initialRotations = [
      new THREE.Euler(0.40, Math.PI / 2 + 0.18, 0.08),
      new THREE.Euler(-0.35, Math.PI / 2 - 0.22, 0.05),
      new THREE.Euler(0.08, Math.PI / 2 + 0.25, -0.04),
      new THREE.Euler(-0.05, Math.PI / 2 - 0.15, 0.03),
      new THREE.Euler(0.12, Math.PI / 2 + 0.04, 0.06),
      new THREE.Euler(-0.08, Math.PI / 2 - 0.08, -0.02),
    ];

    const pieces: Piece[] = [];
    definitions.forEach((def, idx) => {
      const len = def.a.distanceTo(def.b);
      const geo = makeSlottedCChannelGeometry(len);
      const mesh = new THREE.Mesh(geo, steelMaterial.clone());

      const finalPos = midpoint(def.a, def.b);
      const finalQuat = quatFromEndpoints(def.a, def.b);

      let initPos: THREE.Vector3;
      let initQuat: THREE.Quaternion;

      if (def.vis && idx < initialPositions.length) {
        initPos = initialPositions[idx].clone();
        initQuat = new THREE.Quaternion().setFromEuler(initialRotations[idx]);
      } else {
        const angle = idx * 2.399;
        const dist = 22 + (idx % 4) * 3;
        initPos = v3(Math.cos(angle) * dist, 3 + (idx % 3) * 1.5, Math.sin(angle) * dist);
        initQuat = finalQuat.clone();
      }

      mesh.position.copy(initPos);
      mesh.quaternion.copy(initQuat);

      if (!def.vis) {
        (mesh.material as THREE.MeshMatcapMaterial).opacity = 0;
      }

      scene.add(mesh);
      pieces.push({
        mesh,
        iP: initPos,
        iQ: initQuat,
        fP: finalPos,
        fQ: finalQuat,
        iOp: def.vis ? 1 : 0,
        as: def.as,
        ae: def.ae,
      });
    });

    // Steel Base Plates ONLY (100% hidden at Stage 1, fade in during assembly Stage 3)
    const plateGeo = makeBasePlateGeometry();

    const footings = [GFL, GFR, GRL, GRR].map((pos, i) => {
      const pMesh = new THREE.Mesh(plateGeo, steelMaterial.clone());
      pMesh.position.set(pos.x, 0.010, pos.z);
      pMesh.visible = false;
      (pMesh.material as THREE.MeshMatcapMaterial).opacity = 0;
      scene.add(pMesh);

      return { pMesh, trigger: 0.12 + i * 0.05 };
    });

    const camStartPos = v3(1.7, 1.85, 6.2);
    const camStartLook = v3(0, 0.95, 0);

    const camEndPos = v3(6.8, 4.4, 14.8);
    const camEndLook = v3(0, 1.45, 0);

    // Responsive camera position: on mobile portrait (aspect < 1), pull back so NO edges are cut off!
    const adjustCamera = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      const aspect = w / h;
      camera.aspect = aspect;

      const mobileScale = aspect < 1 ? Math.max(1, 0.90 / Math.max(0.38, aspect)) : 1;
      camStartPos.set(1.7 * (aspect < 1 ? 0.35 : 1), 1.85 * (aspect < 1 ? 1.1 : 1), 6.2 * mobileScale);
      camStartLook.set(0, aspect < 1 ? 0.65 : 0.95, 0);
      camEndPos.set(6.8 * (aspect < 1 ? 0.65 : 1), 4.4 * (aspect < 1 ? 1.15 : 1), 14.8 * mobileScale);

      camera.updateProjectionMatrix();
    };

    adjustCamera();

    camera.position.copy(camStartPos);
    camera.lookAt(camStartLook);

    let currentScroll = 0;
    let lastRenderTime = performance.now();
    let rafId = 0;
    let lastStateDispatch = 0;

    const currentCamPos = new THREE.Vector3();
    const currentCamLook = new THREE.Vector3();

    const tick = (now: number) => {
      const delta = Math.min(1, (now - lastRenderTime) / 16.666);
      lastRenderTime = now;

      // Fast, smooth spring physics on mobile and desktop
      const spring = clamp(0.38 * delta, 0.18, 0.95);
      currentScroll += (targetScrollRef.current - currentScroll) * spring;

      if (now - lastStateDispatch > 50) {
        setScrollProgress(currentScroll);
        lastStateDispatch = now;
      }

      const camEase = easeInOutCubic(currentScroll);
      currentCamPos.lerpVectors(camStartPos, camEndPos, camEase);
      currentCamLook.lerpVectors(camStartLook, camEndLook, camEase);
      camera.position.copy(currentCamPos);
      camera.lookAt(currentCamLook);

      const idleMultiplier = clamp(1 - currentScroll * 5, 0, 1);

      pieces.forEach((piece, i) => {
        const rawProgress = lp(currentScroll, piece.as, piece.ae);
        const easePos = easeInOutCubic(rawProgress);
        const easeOp = easeOutCubic(rawProgress);

        piece.mesh.position.lerpVectors(piece.iP, piece.fP, easePos);

        if (i < 6 && idleMultiplier > 0.01) {
          const phase = i * 1.14;
          const floatAmt = idleMultiplier * (1 - easePos);
          piece.mesh.position.y += Math.sin(now * 0.001 + phase) * 0.014 * floatAmt;
          piece.mesh.position.x += Math.cos(now * 0.0007 + phase) * 0.008 * floatAmt;
        }

        piece.mesh.quaternion.slerpQuaternions(piece.iQ, piece.fQ, easePos);

        const mat = piece.mesh.material as THREE.MeshMatcapMaterial;
        mat.opacity = THREE.MathUtils.lerp(piece.iOp, 1, easeOp);
      });

      // Base plates fade in seamlessly when posts land
      footings.forEach(({ pMesh, trigger }) => {
        if (currentScroll < trigger - 0.02) {
          pMesh.visible = false;
        } else {
          pMesh.visible = true;
          const plateProgress = easeOutQuint(lp(currentScroll, trigger, trigger + 0.14));
          (pMesh.material as THREE.MeshMatcapMaterial).opacity = plateProgress;
        }
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const updateScrollTarget = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollable = Math.max(1, rect.height - window.innerHeight);
      targetScrollRef.current = clamp(-rect.top / totalScrollable, 0, 1);
    };

    let cleanupFixedEvents = () => { };

    if (fixedViewport) {
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY * 0.0016;
        targetScrollRef.current = clamp(targetScrollRef.current + delta, 0, 1);
      };

      let lastTouchY = 0;
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          lastTouchY = e.touches[0].clientY;
        }
      };

      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          e.preventDefault();
          const currentY = e.touches[0].clientY;
          const deltaY = lastTouchY - currentY;
          lastTouchY = currentY;
          targetScrollRef.current = clamp(targetScrollRef.current + deltaY * 0.0038, 0, 1);
        }
      };

      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });

      cleanupFixedEvents = () => {
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
      };
    } else {
      window.addEventListener('scroll', updateScrollTarget, { passive: true });
      updateScrollTarget();
    }

    rafId = requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w > 0 && h > 0) {
        renderer.setSize(w, h, false);
        adjustCamera();
      }
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      cleanupFixedEvents();
      if (!fixedViewport) {
        window.removeEventListener('scroll', updateScrollTarget);
      }
      resizeObserver.disconnect();
      pieces.forEach(p => {
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
      });
      footings.forEach(({ pMesh }) => {
        pMesh.geometry.dispose();
        (pMesh.material as THREE.Material).dispose();
      });
      plateGeo.dispose();
      matCapTexture.dispose();
      renderer.dispose();
    };
  }, [fixedViewport]);

  const STAGES = [
    { label: 'SLOTTED HDG C-CHANNELS', s: 0, e: 0.18 },
    { label: 'SEPARATION · ALIGNMENT', s: 0.18, e: 0.45 },
    { label: 'STRUCTURAL FABRICATION', s: 0.45, e: 0.78 },
    { label: 'COMPLETED FRAMEWORK', s: 0.78, e: 1.00 },
  ];

  const activeIdx = Math.max(0, STAGES.findIndex(st => scrollProgress >= st.s && scrollProgress < st.e));
  const currentStage = STAGES[activeIdx] || STAGES[0];

  // Hero intro fades out cleanly as scroll begins, leaving the 3D assembly clear with zero navbar clipping
  const heroHeaderOpacity = clamp(1 - scrollProgress * 7);

  const midStageOpacity = clamp(scrollProgress * 8 - 1.0) * clamp((0.92 - scrollProgress) * 12);
  const finalOpacity = clamp((scrollProgress - 0.88) * 10);
  const hintOpacity = clamp(1 - scrollProgress * 7);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${fixedViewport ? 'h-[100dvh] overflow-hidden' : ''}`}
      style={{ height: fixedViewport ? '100dvh' : '240vh' }}
    >
      <div className={`w-full overflow-hidden bg-[#F8FAFC] ${fixedViewport ? 'h-full relative' : 'sticky top-0'}`} style={{ height: fixedViewport ? '100%' : '100svh' }}>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />

        {minimal ? (
          children
        ) : (
          <>
            {/* ── Hero Landing Header (Fades smoothly on scroll, 100% navbar clearance, zero clipping) ── */}
            <div
              className="absolute inset-x-0 top-0 w-full flex flex-col items-center pointer-events-none px-6 sm:px-10 md:px-16 pt-28 sm:pt-32 transition-all duration-100 ease-out"
              style={{
                opacity: heroHeaderOpacity,
                transform: `translate3d(0, -${Math.min(scrollProgress * 40, 20)}px, 0)`,
                display: heroHeaderOpacity <= 0.005 ? 'none' : 'flex',
              }}
            >
              <div className="flex flex-col items-center gap-2.5 sm:gap-3.5 text-center pointer-events-auto w-full max-w-5xl mx-auto">

                <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0049CA] uppercase leading-[1.08] max-w-4xl">
                  PRECISION IN EVERY STRUCTURE
                </h1>

                <p className="text-[#647488] text-sm sm:text-base font-normal leading-relaxed text-center max-w-2xl">
                  From solar electrical products to precision-fabricated structures and components, CSF delivers solutions designed for dependable solar infrastructure.
                </p>
              </div>
            </div>

            <div
              className="absolute bottom-10 left-6 md:left-14 pointer-events-none transition-opacity duration-300"
              style={{ opacity: midStageOpacity }}
            >
              <div className="flex flex-col gap-2.5 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-[#E5E7EB] shadow-lg pointer-events-auto">
                <div className="flex items-center justify-between gap-6">
                  <span className="text-[10px] text-[#647488] uppercase tracking-wider font-semibold">
                    STAGE {activeIdx + 1} OF {STAGES.length}
                  </span>
                  <span className="text-xs text-[#0049CA] font-bold">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {STAGES.map((_, i) => (
                    <div
                      key={i}
                      className="h-[3px] w-8 md:w-12 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor: i <= activeIdx ? '#0049CA' : '#E5E7EB',
                      }}
                    />
                  ))}
                </div>

                <span className="text-xs text-[#0F2130] uppercase tracking-wider font-bold">
                  {currentStage.label}
                </span>
              </div>
            </div>

            <div
              className="absolute top-1/2 right-6 md:right-14 -translate-y-1/2 pointer-events-none transition-opacity duration-300 hidden sm:block"
              style={{ opacity: midStageOpacity * clamp((scrollProgress - 0.3) * 4) }}
            >
              <div className="flex flex-col gap-3.5 text-right bg-white/90 backdrop-blur-md p-5 rounded-xl border border-[#E5E7EB] shadow-lg pointer-events-auto">
                {[
                  { k: 'PROFILE', v: 'SLOTTED C-CHANNEL 41×41' },
                  { k: 'MATERIAL', v: 'IS 2062 HDG STEEL' },
                  { k: 'WIND RATING', v: '200 KM/H SURGE' },
                  { k: 'ZINC COAT', v: '85+ MICRONS' },
                  { k: 'CNC SLOTS', v: '28×14MM OVAL PUNCH' },
                ].map(({ k, v }) => (
                  <div key={k} className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-[#647488] uppercase tracking-wider font-medium">{k}</span>
                    <span className="text-xs text-[#0049CA] font-bold tracking-wide">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seamless ambient fade for effortless readability without any card/box container */}
            <div
              className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#F5F4EF] via-[#F5F4EF]/80 to-transparent pointer-events-none transition-opacity duration-500"
              style={{ opacity: finalOpacity }}
            />

            <div
              className="absolute bottom-10 sm:bottom-14 inset-x-0 flex flex-col items-center pointer-events-none px-6 z-10 transition-all duration-500 ease-out"
              style={{
                opacity: finalOpacity,
                transform: `translate3d(0, ${(1 - finalOpacity) * 16}px, 0)`,
              }}
            >
              <div className="flex flex-col items-center gap-2.5 sm:gap-3 text-center max-w-2xl pointer-events-auto">
                <div className="inline-flex items-center gap-2 text-[#0049CA] text-[10px] sm:text-xs font-mono font-bold tracking-[0.14em] uppercase">
                  <span className="w-1.5 h-1.5 bg-[#0049CA] animate-pulse" />
                  <span>COMPLETED STRUCTURE · CSF</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F2130] uppercase leading-[1.12]">
                  ENGINEERED FOR <span className="text-[#0049CA]">DEPENDABLE SUPPORT</span>
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-[#647488] font-medium max-w-md sm:max-w-lg leading-relaxed">
                  High-tensile galvanized framework built for complete system stability.
                </p>
              </div>
            </div>

            <div
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pointer-events-auto"
              style={{ opacity: clamp(scrollProgress * 6 - 0.2) }}
            >
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPos = clamp((e.clientY - rect.top) / rect.height, 0, 1);
                  handleScrub(clickPos);
                }}
                className="w-2.5 md:w-3.5 h-36 bg-[#E5E7EB] hover:bg-[#D1D5DB] rounded-full relative cursor-pointer transition-colors p-0.5 flex flex-col items-center shadow-inner"
                title="Click or drag to scrub assembly"
              >
                <div
                  className="w-full bg-[#0049CA] rounded-full transition-none shadow-sm"
                  style={{ height: `${Math.max(8, scrollProgress * 100)}%` }}
                />
              </div>
              <span
                className="text-[9px] text-[#647488] tracking-wider font-semibold"
                style={{ writingMode: 'vertical-rl' }}
              >
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
              style={{ opacity: hintOpacity }}
            >
              <span className="text-[10px] text-[#647488] uppercase tracking-widest font-semibold">
                SCROLL TO ASSEMBLE
              </span>
              <div className="w-[2px] h-7 bg-gradient-to-b from-[#0049CA] to-transparent animate-pulse rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#0049CA] animate-bounce" />
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Hero3D;
