import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function createGalvanizedMatCapTexture(): THREE.CanvasTexture {
  const size = 256; // Optimized size for ultra-fast mobile GPU load
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;

  const grad = ctx.createRadialGradient(cx - 30, cy - 40, 10, cx, cy, size / 2);
  grad.addColorStop(0.00, '#FFFFFF');
  grad.addColorStop(0.20, '#F0F4F8');
  grad.addColorStop(0.45, '#CAD3DC');
  grad.addColorStop(0.70, '#8E99A6');
  grad.addColorStop(0.95, '#56606C');
  grad.addColorStop(1.00, '#3A4048');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

const CW = 0.14;
const CT = 0.014;

// Optimized C-Channel geometry with clean profile & slots for 60fps mobile performance
function makeSlottedCChannelGeometry(len: number): THREE.BufferGeometry {
  const halfW = CW / 2;
  const halfL = len / 2;

  const webShape = new THREE.Shape();
  webShape.moveTo(-halfW, -halfL);
  webShape.lineTo( halfW, -halfL);
  webShape.lineTo( halfW,  halfL);
  webShape.lineTo(-halfW,  halfL);
  webShape.lineTo(-halfW, -halfL);

  const slotPitch = 0.28;
  const slotLen = 0.12;
  const slotW = 0.046;
  const radius = slotW / 2;
  const straightHalf = (slotLen - slotW) / 2;

  const numSlots = Math.max(1, Math.floor((len - 0.1) / slotPitch));
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
    curveSegments: 6, // Low segments for high mobile FPS
  });
  webGeo.rotateX(Math.PI / 2);

  return webGeo;
}

function midpoint(a: THREE.Vector3, b: THREE.Vector3): THREE.Vector3 {
  return a.clone().add(b).multiplyScalar(0.5);
}

function quatFromEndpoints(a: THREE.Vector3, b: THREE.Vector3): THREE.Quaternion {
  const dir = b.clone().sub(a).normalize();
  const up = v3(0, 0, 1);
  return new THREE.Quaternion().setFromUnitVectors(up, dir);
}

export const Structure3DHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // Mobile performance: cap devicePixelRatio at 1.5 to prevent GPU thermal throttling on iOS
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, canvas.clientWidth / canvas.clientHeight, 0.1, 100);

    // Responsive camera position: on mobile portrait, pull camera back so NO edges are clipped!
    const adjustCamera = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      const aspect = w / h;
      camera.aspect = aspect;

      if (aspect < 1) {
        // Mobile portrait: scale distance inversely to aspect ratio with safety padding
        const dist = 8.5 * Math.max(1, 0.85 / Math.max(0.4, aspect));
        camera.position.set(dist * 0.45, dist * 0.35, dist);
      } else {
        // Desktop / tablet landscape
        camera.position.set(4.2, 3.0, 8.2);
      }
      camera.lookAt(0, 1.3, 0);
      camera.updateProjectionMatrix();
    };

    adjustCamera();

    const matCapTexture = createGalvanizedMatCapTexture();
    const steelMaterial = new THREE.MeshMatcapMaterial({
      matcap: matCapTexture,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });

    // ── Structure Dimensions ──────────────────────────────────────
    const GFL = v3(-2.2, 0, 1.2);
    const GFR = v3( 2.2, 0, 1.2);
    const GRL = v3(-2.2, 0, -1.2);
    const GRR = v3( 2.2, 0, -1.2);

    const TFL = v3(-2.2, 1.25,  1.2);
    const TFR = v3( 2.2, 1.25,  1.2);
    const TRL = v3(-2.2, 2.20, -1.2);
    const TRR = v3( 2.2, 2.20, -1.2);

    const RAFTER_L_START = v3(-2.2, 1.10,  1.6);
    const RAFTER_L_END   = v3(-2.2, 2.38, -1.6);

    const RAFTER_R_START = v3( 2.2, 1.10,  1.6);
    const RAFTER_R_END   = v3( 2.2, 2.38, -1.6);

    const PURLIN_SPAN = 2.6;
    const PURLIN_1_L = v3(-PURLIN_SPAN, 1.25,  1.3);
    const PURLIN_1_R = v3( PURLIN_SPAN, 1.25,  1.3);

    const PURLIN_2_L = v3(-PURLIN_SPAN, 1.76,  0.0);
    const PURLIN_2_R = v3( PURLIN_SPAN, 1.76,  0.0);

    const PURLIN_3_L = v3(-PURLIN_SPAN, 2.27, -1.3);
    const PURLIN_3_R = v3( PURLIN_SPAN, 2.27, -1.3);

    const BRACE_FL_A = v3(-2.2, 0.50, 1.2);
    const BRACE_FL_B = v3(-2.2, 1.15, 1.5);

    const BRACE_FR_A = v3( 2.2, 0.50, 1.2);
    const BRACE_FR_B = v3( 2.2, 1.15, 1.5);

    const BRACE_RL_A = v3(-2.2, 1.05, -1.2);
    const BRACE_RL_B = v3(-2.2, 1.95, -0.6);

    const BRACE_RR_A = v3( 2.2, 1.05, -1.2);
    const BRACE_RR_B = v3( 2.2, 1.95, -0.6);

    const definitions = [
      { a: GFL, b: TFL },
      { a: GFR, b: TFR },
      { a: GRL, b: TRL },
      { a: GRR, b: TRR },
      { a: RAFTER_L_START, b: RAFTER_L_END },
      { a: RAFTER_R_START, b: RAFTER_R_END },
      { a: PURLIN_1_L, b: PURLIN_1_R },
      { a: PURLIN_2_L, b: PURLIN_2_R },
      { a: PURLIN_3_L, b: PURLIN_3_R },
      { a: BRACE_FL_A, b: BRACE_FL_B },
      { a: BRACE_FR_A, b: BRACE_FR_B },
      { a: BRACE_RL_A, b: BRACE_RL_B },
      { a: BRACE_RR_A, b: BRACE_RR_B },
    ];

    const group = new THREE.Group();
    scene.add(group);

    const pieces: { mesh: THREE.Mesh; initPos: THREE.Vector3; finalPos: THREE.Vector3; initQuat: THREE.Quaternion; finalQuat: THREE.Quaternion }[] = [];

    definitions.forEach((def, idx) => {
      const len = def.a.distanceTo(def.b);
      const geo = makeSlottedCChannelGeometry(len);
      const mesh = new THREE.Mesh(geo, steelMaterial.clone());

      const finalPos = midpoint(def.a, def.b);
      const finalQuat = quatFromEndpoints(def.a, def.b);

      const angle = idx * 2.2;
      const dist = 5.5 + (idx % 3) * 1.2;
      const initPos = v3(Math.cos(angle) * dist, 3.5 + (idx % 2) * 1.5, Math.sin(angle) * dist);
      const initQuat = finalQuat.clone();

      mesh.position.copy(initPos);
      mesh.quaternion.copy(initQuat);

      group.add(mesh);
      pieces.push({ mesh, initPos, finalPos, initQuat, finalQuat });
    });

    const startTime = performance.now();
    let isDragging = false;
    let prevMouseX = 0;
    let rotationVelocity = 0;
    let currentRotationY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      rotationVelocity = deltaX * 0.005;
      currentRotationY += rotationVelocity;
    };

    const onMouseUp = () => { isDragging = false; };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch handlers for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      prevMouseX = e.touches[0].clientX;
      rotationVelocity = deltaX * 0.006;
      currentRotationY += rotationVelocity;
    };
    const onTouchEnd = () => { isDragging = false; };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    let rafId = 0;
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const assembleProgress = clamp(elapsed / 2.2, 0, 1);
      const ease = easeInOutCubic(assembleProgress);

      pieces.forEach((p) => {
        p.mesh.position.lerpVectors(p.initPos, p.finalPos, ease);
        p.mesh.quaternion.slerpQuaternions(p.initQuat, p.finalQuat, ease);
      });

      if (!isDragging) {
        currentRotationY += 0.003;
      }
      group.rotation.y = currentRotationY;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w > 0 && h > 0) {
        renderer.setSize(w, h, false);
        adjustCamera();
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing touch-none" />
    </div>
  );
};

export default Structure3DHero;
