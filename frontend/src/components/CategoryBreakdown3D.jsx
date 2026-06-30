import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useTransactions } from "../lib/store";
import { EXPENSE_CATEGORIES } from "../lib/categories";
import { formatINR } from "../lib/format";

function Bar({ x, height, color, label, value, index }) {
  const meshRef = useRef();
  const glowRef = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      // subtle idle hover
      meshRef.current.position.y = height / 2 + Math.sin(t * 1.2 + index) * 0.04;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.35 + Math.sin(t * 1.5 + index) * 0.08;
    }
  });

  const h = Math.max(0.1, height);

  return (
    <group position={[x, 0, 0]}>
      {/* Glow base */}
      <mesh ref={glowRef} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>

      {/* The pillar */}
      <RoundedBox
        ref={meshRef}
        args={[0.55, h, 0.55]}
        radius={0.08}
        smoothness={4}
        position={[0, h / 2, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.35}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </RoundedBox>

      {/* Floating value above */}
      <Text
        position={[0, h + 0.35, 0]}
        fontSize={0.18}
        color="#F5F2EA"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#000"
      >
        {formatINR(value)}
      </Text>

      {/* Label below */}
      <Text
        position={[0, -0.35, 0]}
        fontSize={0.14}
        color="#B9B7AF"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.4}
      >
        {label}
      </Text>
    </group>
  );
}

function Scene({ data }) {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  const maxValue = Math.max(1, ...data.map((d) => d.value));
  const spacing = 0.82;
  const startX = -((data.length - 1) * spacing) / 2;

  return (
    <group ref={groupRef} position={[0, -1.0, 0]}>
      {/* Floor disc */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[Math.max(3.8, data.length * 0.55), 64]} />
        <meshStandardMaterial
          color="#0E1020"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Ring accent */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[Math.max(3.7, data.length * 0.53), Math.max(3.8, data.length * 0.55), 96]} />
        <meshBasicMaterial color="#FF8B3D" transparent opacity={0.4} />
      </mesh>

      {data.map((d, i) => {
        const h = (d.value / maxValue) * 2.4;
        return (
          <Bar
            key={d.id}
            x={startX + i * spacing}
            height={h}
            color={d.color}
            label={d.label}
            value={d.value}
            index={i}
          />
        );
      })}
    </group>
  );
}

export default function CategoryBreakdown3D() {
  const { stats, monthRef } = useTransactions();

  const data = useMemo(() => {
    const arr = EXPENSE_CATEGORIES
      .map((c) => ({ id: c.id, label: c.label, color: c.color, value: stats.catTotals.get(c.id) || 0 }))
      .filter((c) => c.value > 0)
      .sort((a, b) => b.value - a.value);
    return arr.slice(0, 8);
  }, [stats.catTotals]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass card-hover rounded-3xl relative overflow-hidden"
      data-testid="category-3d-card"
    >
      <div className="p-7 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif tracking-tight" style={{ fontSize: "1.5rem", color: "#F5F2EA", fontWeight: 500 }}>
              Category Breakdown
            </h3>
            <p className="text-sm mt-1" style={{ color: "#7A7A83" }}>
              3D visualization — {monthRef.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </p>
          </div>
          <span className="chip" data-testid="category-3d-hint">
            <span className="dot" style={{ background: "#FF8B3D" }} />
            Drag to rotate
          </span>
        </div>
      </div>

      <div style={{ height: 440 }} data-testid="category-3d-canvas">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm" style={{ color: "#7A7A83" }}>
            Log some expenses to see the 3D breakdown.
          </div>
        ) : (
          <Canvas
            shadows
            camera={{ position: [0, 2.6, 8.4], fov: 38 }}
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: true }}
          >
            <color attach="background" args={["#00000000"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 6, 4]} intensity={1.1} castShadow color="#FFD9A8" />
            <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#7CC8FF" />
            <pointLight position={[0, 4, 2]} intensity={0.6} color="#FF8B3D" />
            <Scene data={data} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 3.4}
              maxPolarAngle={Math.PI / 2.05}
              rotateSpeed={0.6}
              autoRotate={false}
            />
          </Canvas>
        )}
      </div>
    </motion.section>
  );
}
