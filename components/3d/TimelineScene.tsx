"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, Html, SpotLight } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import * as THREE from "three";
import { ChessPiece } from "./ChessPiece";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";

export interface Week {
  week: number;
  theme: string;
  piece: string;
  rank: string;
  desc: string;
  difficulty: string;
}

export type TimelineEntry = Week;

export function buildTimelineData(weeksData?: Week[]): TimelineEntry[] {
  if (weeksData && weeksData.length > 0) {
    return weeksData;
  }
  return TIMELINE_DATA;
}

export const TIMELINE_DATA: TimelineEntry[] = [
  // ROUND 1: Building the Foundation
  { 
    week: 1, 
    theme: "The Opening", 
    piece: "♙", 
    rank: "Pawn", 
    desc: "Every grandmaster started with a single step. Secure your first syntax wins and set the board for an epic journey ahead!", 
    difficulty: "Easy/medium" 
  },
  { 
    week: 2, 
    theme: "Knight's Tour", 
    piece: "♘", 
    rank: "Knight", 
    desc: "Time to think outside the straight lines! Master unpredictable control flows and hop over logic obstacles with agility.", 
    difficulty: "Easy/Medium" 
  },
  { 
    week: 3, 
    theme: "Bishop's Diagonal", 
    piece: "♗", 
    rank: "Bishop", 
    desc: "Slice through complexity. Slice your data structures cleanly and run algorithms that span the full length of the board.", 
    difficulty: "Medium/Hard" 
  },
  { 
    week: 4, 
    theme: "Rook's File", 
    piece: "♖", 
    rank: "Rook", 
    desc: "Build unshakeable, linear strength. Lock down your file inputs, data streams, and structural logic with absolute precision.", 
    difficulty: "Medium/Hard" 
  },
  { 
    week: 5, 
    theme: "Queen's Gambit", 
    piece: "♕", 
    rank: "Queen", 
    desc: "The ultimate test of versatility. Command competetive programming strategies to dominate the arena.", 
    difficulty: "Medium/Hard" 
  },
  { 
    week: 6, 
    theme: "Castle Defense", 
    piece: "♖", 
    rank: "Castle", 
    desc: "The final stand of Round 1. Secure your perimeter by optimization, debugging, and proving your code is entirely bulletproof.", 
    difficulty: "Hard" 
  },

  // ROUND 2: The Championship Arena
  { 
    week: 7, 
    theme: "Checkmate Strategy", 
    piece: "♔", 
    rank: "King", 
    desc: "Welcome to Round 2! The endgame is here—design elite, high-level system architectures where every single line of code counts.", 
    difficulty: "Expert" 
  },
  { 
    week: 8, 
    theme: "Grandmaster", 
    piece: "♛", 
    rank: "Grandmaster", 
    desc: "The pinnacle of the tournament. Onsite at TSEC Bandra campus, outwit the final challenge, and claim the crown!", 
    difficulty: "Master" 
  }
];

function StandardBoard() {
  return (
    <group position={[0, -2, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Base Platform */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[17, 0.8, 17]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
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
    </group>
  );
}

const PATH_COORDS = [
  { x: -3, z: 3 },
  { x: -1, z: 2 },
  { x: 1, z: 1 },
  { x: 3, z: 0 },
  { x: 2, z: -1 },
  { x: 0, z: -2 },
  { x: -2, z: -3 },
  { x: 0, z: -4 },
];

interface TimelineProps {
  scrollProgress: MotionValue<number>;
  stageIndex: number;
  timelineData: TimelineEntry[];
}

function AnimatedMovingPiece({ scrollProgress, stageIndex, timelineData }: TimelineProps) {
  const pieceRef = useRef<THREE.Group>(null);
  const htmlGroupRef = useRef<THREE.Group>(null);
  const visualRef = useRef<THREE.Group>(null);
  const prevStageIndex = useRef(stageIndex);
  
  const types = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'rook', 'king', 'king'];

  // Trigger rapid pop animation when stage index changes
  useEffect(() => {
    if (prevStageIndex.current !== stageIndex && visualRef.current) {
      visualRef.current.scale.set(0, 0, 0);
    }
    prevStageIndex.current = stageIndex;
  }, [stageIndex]);

  useFrame(() => {
    if (pieceRef.current) {
      const progress = scrollProgress.get(); 
      
      const exactStage = progress * 7; 
      const currentIndex = Math.floor(exactStage);
      const nextIndex = Math.min(7, currentIndex + 1);
      const fraction = exactStage - currentIndex;
      
      const currentWorldX = PATH_COORDS[currentIndex].x * 2;
      const currentWorldZ = PATH_COORDS[currentIndex].z * 2;
      const nextWorldX = PATH_COORDS[nextIndex].x * 2;
      const nextWorldZ = PATH_COORDS[nextIndex].z * 2;
      
      const targetX = THREE.MathUtils.lerp(currentWorldX, nextWorldX, fraction);
      const targetZ = THREE.MathUtils.lerp(currentWorldZ, nextWorldZ, fraction);
      const targetY = Math.sin(fraction * Math.PI) * 3; // jump height

      pieceRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1);
      
      if (fraction > 0.1 && fraction < 0.9) {
        pieceRef.current.rotation.y += 0.15;
      } else {
        pieceRef.current.rotation.y = THREE.MathUtils.lerp(pieceRef.current.rotation.y, 0, 0.1);
      }
    }
    
    // Smoothly glide the HTML card group to track the piece
    if (htmlGroupRef.current) {
      const progress = scrollProgress.get(); 
      const exactStage = progress * 7; 
      const currentIndex = Math.floor(exactStage);
      const nextIndex = Math.min(7, currentIndex + 1);
      const fraction = exactStage - currentIndex;
      
      const currentWorldX = PATH_COORDS[currentIndex].x * 2;
      const currentWorldZ = PATH_COORDS[currentIndex].z * 2;
      const nextWorldX = PATH_COORDS[nextIndex].x * 2;
      const nextWorldZ = PATH_COORDS[nextIndex].z * 2;
      
      const targetX = THREE.MathUtils.lerp(currentWorldX, nextWorldX, fraction);
      const targetZ = THREE.MathUtils.lerp(currentWorldZ, nextWorldZ, fraction);
      
      // Keep the card closer to the piece vertically so it doesn't clip out of the camera view when zooming!
      htmlGroupRef.current.position.lerp(new THREE.Vector3(targetX + 2.5, 0, targetZ), 0.05);
    }
    
    // Gradual pop-in animation
    if (visualRef.current) {
      const isKing = stageIndex === 7;
      const targetScale = isKing ? 2.0 : 1.5; // King is larger
      visualRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }
  });

  const activeData = timelineData[stageIndex];
  const isKing = stageIndex === 7;

  return (
    <group position={[0, -2, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1.2, 1.2, 1.2]}>
      
      <group ref={pieceRef}>
        <group ref={visualRef}>
          <ChessPiece type={types[stageIndex]} color="gold" scale={[1, 1, 1]} />
        </group>
        
        {/* Glow effect that intensifies for the final King */}
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={isKing ? 0.4 : 0.15} />
        </mesh>

        {/* Cinematic God-Rays for the Final Week */}
        {isKing && (
          <SpotLight
            position={[0, 20, 0]}
            angle={0.2}
            penumbra={0.5}
            intensity={200}
            color="#FFD700"
            distance={50}
            castShadow
          />
        )}
      </group>
      
      {/* Floating HTML Card attached to a separate group to prevent spinning and bouncing */}
      <group ref={htmlGroupRef}>
        <Html center zIndexRange={[100, 0]}>
          <div className="w-72 md:w-[26rem] pointer-events-none transform translate-x-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={stageIndex}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`glass-card p-6 md:p-8 rounded-2xl transition-colors duration-700 ${
                  isKing 
                    ? 'bg-gold/20 border-gold shadow-[0_0_50px_rgba(212,175,55,0.4)] backdrop-blur-2xl' 
                    : 'bg-[#050505]/90 border-gold/40 shadow-[0_10px_40px_rgba(212,175,55,0.15)] backdrop-blur-xl'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`font-bold uppercase tracking-widest text-sm drop-shadow-md ${isKing ? 'text-white' : 'text-gold'}`}>Week {activeData.week}</span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-inner ${isKing ? 'bg-gold text-black' : 'bg-white/10 text-white/90'}`}>
                    {activeData.difficulty}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold mb-2 font-outfit drop-shadow-sm ${isKing ? 'text-gold glow-text' : 'text-white'}`}>
                  {activeData.theme}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">{activeData.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Html>
      </group>

      {/* Epic Sparkles for the Final Week */}
      {isKing && (
        <Sparkles count={500} scale={15} size={6} speed={0.8} color="#FFD700" opacity={0.8} />
      )}
    </group>
  );
}

function CameraTracker({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  useFrame((state) => {
    const progress = scrollProgress.get();
    
    // Find exact piece world coordinates to track it
    const exactStage = progress * 7; 
    const currentIndex = Math.floor(exactStage);
    const nextIndex = Math.min(7, currentIndex + 1);
    const fraction = exactStage - currentIndex;
    
    // Convert to world coordinates matching the board transform
    const currentWorldX = PATH_COORDS[currentIndex].x * 2 * 1.2;
    const currentWorldZ = PATH_COORDS[currentIndex].z * 2 * 1.2;
    const nextWorldX = PATH_COORDS[nextIndex].x * 2 * 1.2;
    const nextWorldZ = PATH_COORDS[nextIndex].z * 2 * 1.2;
    
    // We must rotate the coordinates by PI/4 to match the board rotation
    const cosPi4 = Math.cos(Math.PI / 4);
    const sinPi4 = Math.sin(Math.PI / 4);
    
    const applyTransform = (x: number, z: number) => ({
      x: x * cosPi4 - z * sinPi4,
      z: x * sinPi4 + z * cosPi4
    });
    
    const currentTransformed = applyTransform(currentWorldX, currentWorldZ);
    const nextTransformed = applyTransform(nextWorldX, nextWorldZ);
    
    const targetX = THREE.MathUtils.lerp(currentTransformed.x, nextTransformed.x, fraction);
    const targetZ = THREE.MathUtils.lerp(currentTransformed.z, nextTransformed.z, fraction);

    // Zooming Cinematic Logic
    let radius = 25;
    let height = 15;
    
    if (progress < 0.15) {
      // Zoomed closely on the Pawn at the start
      const zoomFraction = 1 - (progress / 0.15); // 1 down to 0
      // Smooth easing
      const ease = zoomFraction * zoomFraction * (3 - 2 * zoomFraction); 
      radius = THREE.MathUtils.lerp(25, 12, ease);
      height = THREE.MathUtils.lerp(15, 6, ease);
    } else if (progress > 0.85) {
      // Zoomed closely on the King at the end
      const zoomFraction = (progress - 0.85) / 0.15; // 0 up to 1
      const ease = zoomFraction * zoomFraction * (3 - 2 * zoomFraction);
      radius = THREE.MathUtils.lerp(25, 12, ease);
      height = THREE.MathUtils.lerp(15, 6, ease);
    }

    // Smooth camera orbit
    const startAngle = Math.PI / 3;
    const endAngle = -Math.PI / 3;
    const currentAngle = THREE.MathUtils.lerp(startAngle, endAngle, progress);
    
    // Camera positions relative to the piece
    const camX = targetX + Math.sin(currentAngle) * radius;
    const camZ = targetZ + Math.cos(currentAngle) * radius;
    
    state.camera.position.lerp(new THREE.Vector3(camX, height, camZ), 0.05);
    
    // ALWAYS look exactly at the piece to keep it perfectly centered, 
    // ensuring the HTML card never leaves the frame.
    if (!state.camera.userData.target) {
      state.camera.userData.target = new THREE.Vector3(0, -2, 0);
    }
    state.camera.userData.target.lerp(new THREE.Vector3(targetX, -2, targetZ), 0.05);
    state.camera.lookAt(state.camera.userData.target);
  });
  return null;
}

interface TimelineSceneProps {
  scrollProgress: MotionValue<number>;
  weeksData?: Week[];
}

export default function TimelineScene({ scrollProgress, weeksData }: TimelineSceneProps) {
  const [stageIndex, setStageIndex] = useState(0);

  const timelineData = useMemo(() => buildTimelineData(weeksData), [weeksData]);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    const idx = Math.min(7, Math.max(0, Math.floor(latest * 8)));
    if (idx !== stageIndex) {
      setStageIndex(idx);
    }
  });

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 15, 25], fov: 45 }}>
        <Suspense fallback={null}>
          <fog attach="fog" args={["#0a0a0a", 15, 50]} />
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 20, 10]} intensity={4} color="#FFD700" />
          <directionalLight position={[-10, 20, -10]} intensity={2} color="#ffffff" />
          
          {/* Fill light */}
          <spotLight position={[0, 20, 0]} intensity={20} color="#D4AF37" angle={1} penumbra={1} distance={100} />
          
          <Environment preset="city" />
          
          <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1}>
            <StandardBoard />
            <AnimatedMovingPiece scrollProgress={scrollProgress} stageIndex={stageIndex} timelineData={timelineData} />
          </Float>
          
          <CameraTracker scrollProgress={scrollProgress} />
          
          {/* Background ambient sparkles */}
          <Sparkles count={150} scale={30} size={3} speed={0.2} color="#D4AF37" opacity={0.3} />
        </Suspense>
      </Canvas>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />
    </div>
  );
}