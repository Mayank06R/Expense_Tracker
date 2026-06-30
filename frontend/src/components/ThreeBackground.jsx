import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useTransactions } from "../lib/store";

function Particles({ count = 60 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#F4C95D"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function AmbientOrb({ position, color, scale = 1, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
      ref.current.rotation.y += 0.002;
    }
  });
  return (
    <Float speed={1.5} floatIntensity={1.4} rotationIntensity={0.3}>
      <Sphere ref={ref} args={[scale, 48, 48]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          roughness={0.5}
          transparent
          opacity={0.5}
        />
      </Sphere>
    </Float>
  );
}

export default function ThreeBackground() {
  const { stats } = useTransactions();
  // Subtle hint of palette based on savings health
  const healthy = stats.savingsRate >= 0.2;

  return (
    <div className="three-canvas" data-testid="three-background" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.4]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 4]} intensity={0.5} color="#FFD9A8" />
        <Particles count={70} />
        <AmbientOrb position={[-4.2, 1.6, -2]} color={healthy ? "#10B981" : "#FF5C5C"} scale={0.6} speed={0.6} />
        <AmbientOrb position={[4.6, -1.4, -3]} color="#FF8B3D" scale={0.5} speed={0.8} />
        <AmbientOrb position={[2.5, 2.4, -4]} color="#A78BFF" scale={0.35} speed={1.0} />
      </Canvas>
    </div>
  );
}
