import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

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
  grad.addColorStop(0.18, '#EFF4F9');
  grad.addColorStop(0.42, '#CAD4DE');
  grad.addColorStop(0.68, '#8E9AA7');
  grad.addColorStop(0.92, '#58626E');
  grad.addColorStop(1.00, '#3A4048');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

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

const CW = 0.15;
const CT = 0.012;

function makeSlottedCChannelGeometry(len: number): THREE.BufferGeometry {
  const halfW = CW / 2;
  const halfL = len / 2;

  const webShape = new THREE.Shape();
  webShape.moveTo(-halfW, -halfL);
  webShape.lineTo( halfW, -halfL);
  webShape.lineTo( halfW,  halfL);
  webShape.lineTo(-halfW,  halfL);
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

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(4.5, 3.2, 8.5);
    camera.lookAt(0, 1.4, 0);

    const matCapTexture = createGalvanizedMatCapTexture();
    const steelMaterial = new THREE.MeshMatcapMaterial({
      matcap: matCapTexture,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });

    // Structure Definition
    const GFL = v3(-2.4, 0, 1.3);
    const GFR = v3( 2.4, 0, 1.3);
    const GRL = v3(-2.4, 0, -1.3);
    const GRR = v3( 2.4, 0, -1.3);

    const TFL = v3(-2.4, 1.30,  1.3);
    const TFR = v3( 2.4, 1.30,  1.3);
    const TRL = v3(-2.4, 2.30, -1.3);
    const TRR = v3( 2.4, 2.30, -1.3);

    const RAFTER_L_START = v3(-2.4, 1.15,  1.7);
    const RAFTER_L_END   = v3(-2.4, 2.50, -1.7);

    const RAFTER_R_START = v3( 2.4, 1.15,  1.7);
    const RAFTER_R_END   = v3( 2.4, 2.50, -1.7);

    const PURLIN_SPAN = 2.8;
    const PURLIN_1_L = v3(-PURLIN_SPAN, 1.30,  1.4);
    const PURLIN_1_R = v3( PURLIN_SPAN, 1.30,  1.4);

    const PURLIN_2_L = v3(-PURLIN_SPAN, 1.85,  0.0);
    const PURLIN_2_R = v3( PURLIN_SPAN, 1.85,  0.0);

    const PURLIN_3_L = v3(-PURLIN_SPAN, 2.40, -1.4);
    const PURLIN_3_R = v3( PURLIN_SPAN, 2.40, -1.4);

    const BRACE_FL_A = v3(-2.4, 0.55, 1.3);
    const BRACE_FL_B = v3(-2.4, 1.20, 1.6);

    const BRACE_FR_A = v3( 2.4, 0.55, 1.3);
    const BRACE_FR_B = v3( 2.4, 1.20, 1.6);

    const BRACE_RL_A = v3(-2.4, 1.10, -1.3);
    const BRACE_RL_B = v3(-2.4, 2.05, -0.6);

    const BRACE_RR_A = v3( 2.4, 1.10, -1.3);
    const BRACE_RR_B = v3( 2.4, 2.05, -0.6);

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

      const angle = idx * 2.1;
      const dist = 6 + (idx % 3) * 1.5;
      const initPos = v3(Math.cos(angle) * dist, 4 + (idx % 2) * 2, Math.sin(angle) * dist);
      const initQuat = finalQuat.clone();

      mesh.position.copy(initPos);
      mesh.quaternion.copy(initQuat);

      group.add(mesh);
      pieces.push({ mesh, initPos, finalPos, initQuat, finalQuat });
    });

    let startTime = performance.now();
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

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
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
      rotationVelocity = deltaX * 0.005;
      currentRotationY += rotationVelocity;
    };
    const onTouchEnd = () => { isDragging = false; };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    let rafId = 0;
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      // Assembly progress from 0 to 1 over 2.5 seconds
      const assembleProgress = clamp(elapsed / 2.5, 0, 1);
      const ease = easeInOutCubic(assembleProgress);

      pieces.forEach((p) => {
        p.mesh.position.lerpVectors(p.initPos, p.finalPos, ease);
        p.mesh.quaternion.slerpQuaternions(p.initQuat, p.finalQuat, ease);
      });

      // Smooth auto-rotation after assembly
      if (!isDragging) {
        currentRotationY += 0.0035;
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
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
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
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
    </div>
  );
};

export default Structure3DHero;
