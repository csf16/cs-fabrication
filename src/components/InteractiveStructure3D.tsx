import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function createGalvanizedMatCapTexture(): THREE.CanvasTexture {
  const size = 256;
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

function makeSlottedCChannelGeometry(len: number): THREE.BufferGeometry {
  const halfW = CW / 2;
  const halfL = len / 2;

  const webShape = new THREE.Shape();
  webShape.moveTo(-halfW, -halfL);
  webShape.lineTo( halfW, -halfL);
  webShape.lineTo( halfW,  halfL);
  webShape.lineTo(-halfW,  halfL);
  webShape.lineTo(-halfW, -halfL);

  const slotPitch = 0.30;
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
    curveSegments: 5,
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

interface InteractiveStructure3DProps {
  progress: number;
  onProgressChange: (p: number) => void;
}

export const InteractiveStructure3D: React.FC<InteractiveStructure3DProps> = ({
  progress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetProgressRef = useRef(progress);
  const currentProgressRef = useRef(progress);

  useEffect(() => {
    targetProgressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

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
    const camera = new THREE.PerspectiveCamera(36, canvas.clientWidth / canvas.clientHeight, 0.1, 100);

    // Responsive camera position: pull back on mobile portrait so NO edges are cut off
    const adjustCamera = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      const aspect = w / h;
      camera.aspect = aspect;

      if (aspect < 1) {
        // Mobile portrait: scale distance with safety margin so edges are completely visible
        const dist = 9.5 * Math.max(1, 0.90 / Math.max(0.38, aspect));
        camera.position.set(dist * 0.40, dist * 0.32, dist);
      } else {
        // Desktop / tablet
        camera.position.set(4.5, 3.0, 8.5);
      }
      camera.lookAt(0, 1.25, 0);
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

    // ── Structure Coordinates ─────────────────────────────────────
    const GFL = v3(-2.1, 0, 1.15);
    const GFR = v3( 2.1, 0, 1.15);
    const GRL = v3(-2.1, 0, -1.15);
    const GRR = v3( 2.1, 0, -1.15);

    const TFL = v3(-2.1, 1.20,  1.15);
    const TFR = v3( 2.1, 1.20,  1.15);
    const TRL = v3(-2.1, 2.10, -1.15);
    const TRR = v3( 2.1, 2.10, -1.15);

    const RAFTER_L_START = v3(-2.1, 1.05,  1.5);
    const RAFTER_L_END   = v3(-2.1, 2.25, -1.5);

    const RAFTER_R_START = v3( 2.1, 1.05,  1.5);
    const RAFTER_R_END   = v3( 2.1, 2.25, -1.5);

    const PURLIN_SPAN = 2.5;
    const PURLIN_1_L = v3(-PURLIN_SPAN, 1.20,  1.25);
    const PURLIN_1_R = v3( PURLIN_SPAN, 1.20,  1.25);

    const PURLIN_2_L = v3(-PURLIN_SPAN, 1.65,  0.0);
    const PURLIN_2_R = v3( PURLIN_SPAN, 1.65,  0.0);

    const PURLIN_3_L = v3(-PURLIN_SPAN, 2.10, -1.25);
    const PURLIN_3_R = v3( PURLIN_SPAN, 2.10, -1.25);

    const BRACE_FL_A = v3(-2.1, 0.45, 1.15);
    const BRACE_FL_B = v3(-2.1, 1.10, 1.45);

    const BRACE_FR_A = v3( 2.1, 0.45, 1.15);
    const BRACE_FR_B = v3( 2.1, 1.10, 1.45);

    const BRACE_RL_A = v3(-2.1, 0.95, -1.15);
    const BRACE_RL_B = v3(-2.1, 1.85, -0.55);

    const BRACE_RR_A = v3( 2.1, 0.95, -1.15);
    const BRACE_RR_B = v3( 2.1, 1.85, -0.55);

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
      const dist = 5.2 + (idx % 3) * 1.1;
      const initPos = v3(Math.cos(angle) * dist, 3.2 + (idx % 2) * 1.3, Math.sin(angle) * dist);
      const initQuat = finalQuat.clone();

      mesh.position.copy(initPos);
      mesh.quaternion.copy(initQuat);

      group.add(mesh);
      pieces.push({ mesh, initPos, finalPos, initQuat, finalQuat });
    });

    let isDragging = false;
    let prevMouseX = 0;
    let rotationVelocity = 0;
    let currentRotationY = 0;

    // Interactive Drag to Rotate
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      rotationVelocity = deltaX * 0.006;
      currentRotationY += rotationVelocity;
    };
    const onMouseUp = () => { isDragging = false; };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Mobile Touch Drag to Rotate
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
      rotationVelocity = deltaX * 0.007;
      currentRotationY += rotationVelocity;
    };
    const onTouchEnd = () => { isDragging = false; };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    let rafId = 0;
    const animate = () => {
      // Smooth interpolation to target assembly progress
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.15;
      const ease = easeInOutCubic(currentProgressRef.current);

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

export default InteractiveStructure3D;
