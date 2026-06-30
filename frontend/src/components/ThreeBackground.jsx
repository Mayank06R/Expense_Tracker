import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sphere } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import { useTransactions } from "../lib/store";

function Blob({ pulseKey }) {
  const mesh = useRef();
  const matRef = useRef();
  const pulse = useRef(0);

  const { stats } = useTransactions();

  // Determine target color & distortion from balance/expense ratio
  const target = useMemo(() => {
    const { income, expense, balance } = stats;
    const ratio = income > 0 ? Math.min(1, expense / income) : expense > 0 ? 1 : 0;
    const healthy = balance >= 0;
    // sage -> terracotta gradient based on ratio
    const sage = [0.298, 0.478, 0.365]; // #4C7A5D
    const terra = [0.635, 0.373, 0.337]; // #A25F56
    const t = healthy ? ratio * 0.7 : 1;
    const color = sage.map((s, i) => s * (1 - t) + terra[i] * t);
    const distort = healthy ? 0.32 + ratio * 0.18 : 0.55;
    const speed = healthy ? 1.1 + ratio * 0.6 : 2.2;
    const scale = healthy ? 1 + Math.min(0.35, balance / 8000) : 0.82;
    return { color, distort, speed, scale };
  }, [stats]);

  useEffect(() => {
    pulse.current = 1;
  }, [pulseKey]);

  useFrame((state, delta) => {
    if (!mesh.current || !matRef.current) return;
    // Smooth rotation
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x += delta * 0.04;

    // Pulse decay
    pulse.current = Math.max(0, pulse.current - delta * 1.6);
    const pulseScale = 1 + pulse.current * 0.12;

    // Lerp scale & material
    const cur = mesh.current.scale.x;
    const next = cur + (target.scale * pulseScale - cur) * Math.min(1, delta * 2.2);
    mesh.current.scale.setScalar(next);

    const m = matRef.current;
    m.distort += (target.distort - m.distort) * Math.min(1, delta * 1.6);
    m.speed += (target.speed - m.speed) * Math.min(1, delta * 1.6);
    m.color.r += (target.color[0] - m.color.r) * Math.min(1, delta * 1.6);
    m.color.g += (target.color[1] - m.color.g) * Math.min(1, delta * 1.6);
    m.color.b += (target.color[2] - m.color.b) * Math.min(1, delta * 1.6);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <Sphere ref={mesh} args={[1.6, 96, 96]} position={[2.2, 0.1, 0]}>
        <MeshDistortMaterial
          ref={matRef}
          color="#4C7A5D"
          distort={0.35}
          speed={1.3}
          roughness={0.55}
          metalness={0.05}
        />
      </Sphere>
    </Float>
  );
}

function SmallOrb() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.18;
    ref.current.rotation.z += delta * 0.05;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.2}>
      <Sphere ref={ref} args={[0.42, 64, 64]} position={[-3.2, -1.4, -1]}>
        <MeshDistortMaterial color="#E8E2D2" distort={0.55} speed={1.8} roughness={0.35} />
      </Sphere>
    </Float>
  );
}

export default function ThreeBackground({ pulseKey }) {
  return (
    <div className="three-canvas" data-testid="three-background" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 38 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 6, 4]} intensity={1.1} color="#fff7e8" />
        <directionalLight position={[-4, -2, 3]} intensity={0.4} color="#a8c4b3" />
        <Blob pulseKey={pulseKey} />
        <SmallOrb />
      </Canvas>
    </div>
  );
}
