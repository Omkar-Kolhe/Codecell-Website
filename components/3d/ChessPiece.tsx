import * as THREE from "three";

interface ChessPieceProps {
  type: string;
  color: 'black' | 'gold' | 'glass';
  position?: [number, number, number];
  scale?: [number, number, number];
}

export function ChessPiece({ type, color, position = [0, 0, 0], scale = [1, 1, 1] }: ChessPieceProps) {
  const materialProps = color === 'gold' 
    ? { color: "#D4AF37", metalness: 1, roughness: 0.15, envMapIntensity: 1.5 }
    : color === 'glass'
    ? { color: "#ffffff", metalness: 0.1, roughness: 0.05, transmission: 0.9, transparent: true, opacity: 0.8, envMapIntensity: 2 }
    : { color: "#1a1a1a", metalness: 0.9, roughness: 0.2, envMapIntensity: 1.5 };

  return (
    <group position={position} scale={scale}>
      {/* Elegant Base for all pieces */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 64]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.1, 16, 64]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 0.2, 64]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      
      {/* Type specific elegant tops */}
      {type === 'pawn' && (
        <group>
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.2, 0.5, 1.2, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.25, 0.1, 16, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 2.0, 0]}>
            <sphereGeometry args={[0.4, 64, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </group>
      )}
      {type === 'rook' && (
        <group>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.4, 0.6, 1.6, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 2.1, 0]}>
            <cylinderGeometry args={[0.5, 0.4, 0.4, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 2.35, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.1, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </group>
      )}
      {type === 'knight' && (
        <group>
          <mesh position={[0, 1.0, 0]} rotation={[0, 0, 0.1]}>
            <cylinderGeometry args={[0.3, 0.6, 1.2, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[-0.2, 1.8, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.4, 0.5, 1.0, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[-0.6, 1.9, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.3, 0.6, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </group>
      )}
      {type === 'bishop' && (
        <group>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.25, 0.6, 1.6, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 2.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.3, 0.1, 16, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 2.4, 0]}>
            <sphereGeometry args={[0.3, 64, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 2.8, 0]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </group>
      )}
      {type === 'queen' && (
        <group>
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.2, 0.6, 2.0, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 2.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35, 0.1, 16, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 2.7, 0]}>
            <cylinderGeometry args={[0.4, 0.2, 0.5, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 3.0, 0]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </group>
      )}
      {type === 'king' && (
        <group>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.25, 0.6, 2.2, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.4, 0.1, 16, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 2.9, 0]}>
            <cylinderGeometry args={[0.5, 0.3, 0.5, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 3.4, 0]}>
            <boxGeometry args={[0.15, 0.6, 0.15]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh position={[0, 3.4, 0]}>
            <boxGeometry args={[0.5, 0.15, 0.15]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </group>
      )}
    </group>
  );
}
