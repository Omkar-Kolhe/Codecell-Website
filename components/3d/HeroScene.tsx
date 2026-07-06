"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Sparkles, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { ChessPiece } from "./ChessPiece";

function ChessBoard() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  const mainPieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      {/* Scaled up by 1.8 and moved slightly further and lower to occupy maximum screen space majestically */}
      <group ref={group} position={[0, -7, -10]} rotation={[0, Math.PI / 4, 0]} scale={[1.8, 1.8, 1.8]}>
        
        {/* Base Platform */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[17, 0.8, 17]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Glowing Edge */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[17.2, 0.6, 17.2]} />
          <meshBasicMaterial color="#D4AF37" wireframe={true} transparent opacity={0.3} />
        </mesh>

        {/* Board Squares */}
        <group position={[0, 0.01, 0]}>
          {[...Array(8)].map((_, x) =>
            [...Array(8)].map((_, z) => (
              <mesh key={`${x}-${z}`} position={[x * 2 - 7, 0, z * 2 - 7]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[2, 2]} />
                <meshStandardMaterial
                  color={(x + z) % 2 === 0 ? "#111111" : "#D4AF37"}
                  metalness={0.8}
                  roughness={0.2}
                  envMapIntensity={2}
                />
              </mesh>
            ))
          )}
        </group>

        {/* Pieces */}
        <group>
          {/* Gold pieces (bottom/front side) */}
          {mainPieces.map((type, i) => (
            <ChessPiece key={`gold-main-${i}`} type={type} color="gold" position={[i * 2 - 7, 0, 7]} />
          ))}
          {[...Array(8)].map((_, i) => (
            <ChessPiece key={`gold-pawn-${i}`} type="pawn" color="gold" position={[i * 2 - 7, 0, 5]} />
          ))}

          {/* Black pieces (top/back side) */}
          {[...Array(8)].map((_, i) => (
            <ChessPiece key={`black-pawn-${i}`} type="pawn" color="black" position={[i * 2 - 7, 0, -5]} />
          ))}
          {mainPieces.map((type, i) => (
            <ChessPiece key={`black-main-${i}`} type={type} color="black" position={[i * 2 - 7, 0, -7]} />
          ))}
        </group>

      </group>
    </Float>
  );
}

function FloatingSymbols() {
  return (
    <Sparkles count={200} scale={40} size={4} speed={0.4} color="#D4AF37" opacity={0.5} />
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 bg-background overflow-hidden pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 8, 25], fov: 45 }}>
        <fog attach="fog" args={["#050505", 10, 45]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 10]} intensity={4} color="#FFD700" />
        <directionalLight position={[-10, 20, -10]} intensity={2} color="#ffffff" />
        <spotLight position={[0, 20, 0]} intensity={50} color="#D4AF37" angle={0.8} penumbra={1} distance={100} />
        
        <Environment preset="city" />
        
        <ChessBoard />
        <FloatingSymbols />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
