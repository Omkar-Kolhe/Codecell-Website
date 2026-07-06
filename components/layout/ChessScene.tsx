import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh, Group } from "three";

function ChessPiece({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <cylinderGeometry args={[0.35, 0.55, 1.4, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.18} emissive="#3a2a08" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[position[0], position[1] + 0.85, position[2]]} scale={scale}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#f0d78c" metalness={0.95} roughness={0.15} emissive="#3a2a08" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
}

function Board() {
  const group = useRef<Group>(null);
  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.x = -0.5 + Math.sin(t * 0.3) * 0.05 + mouse.y * 0.1;
    group.current.rotation.z = Math.cos(t * 0.2) * 0.04 + mouse.x * 0.08;
  });
  const tiles = [];
  for (let x = 0; x < 8; x++) {
    for (let z = 0; z < 8; z++) {
      const dark = (x + z) % 2 === 0;
      tiles.push(
        <mesh key={`${x}-${z}`} position={[x - 3.5, 0, z - 3.5]}>
          <boxGeometry args={[0.95, 0.1, 0.95]} />
          <meshStandardMaterial
            color={dark ? "#0a0a0a" : "#d4af37"}
            metalness={dark ? 0.3 : 0.9}
            roughness={dark ? 0.6 : 0.25}
            emissive={dark ? "#000" : "#3a2a08"}
            emissiveIntensity={dark ? 0 : 0.3}
          />
        </mesh>
      );
    }
  }
  return (
    <group ref={group} position={[0, -1.2, 0]}>
      {tiles}
      <ChessPiece position={[-2.5, 0.8, -1.5]} scale={0.8} />
      <ChessPiece position={[1.5, 0.8, 2]} scale={0.9} />
      <ChessPiece position={[2.5, 0.8, -2.5]} scale={0.7} />
    </group>
  );
}

function Particles() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });
  const points = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * Math.PI * 2;
    const r = 4 + Math.random() * 3;
    return [Math.cos(angle) * r, (Math.random() - 0.5) * 4, Math.sin(angle) * r] as [number, number, number];
  });
  return (
    <group ref={ref}>
      {points.map((p, i) => (
        <Float key={i} speed={0.6 + Math.random()} floatIntensity={2}>
          <mesh position={p}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#f0d78c" />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function ChessScene() {
  return (
    <Canvas
      camera={{ position: [0, 3.5, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <pointLight position={[5, 8, 5]} intensity={1.8} color="#f0d78c" />
        <pointLight position={[-6, 4, -4]} intensity={1.2} color="#d4af37" />
        <spotLight position={[0, 10, 0]} angle={0.4} penumbra={1} intensity={2} color="#fff5d1" />
        <Board />
        <Particles />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
