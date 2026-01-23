import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Tile } from '@/data/tiles';

interface RoomProps {
  selectedTile: Tile | null;
}

export function Room({ selectedTile }: RoomProps) {
  const floorRef = useRef<THREE.Mesh>(null);
  
  // Create floor material based on selected tile
  const floorMaterial = useMemo(() => {
    const color = selectedTile?.textureColor || '#e8e4de';
    const roughness = selectedTile?.roughness ?? 0.2;
    const metalness = selectedTile?.metalness ?? 0.1;
    
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness,
      metalness,
      side: THREE.DoubleSide,
    });
  }, [selectedTile]);

  // Subtle animation
  useFrame((state) => {
    if (floorRef.current && floorRef.current.material && !Array.isArray(floorRef.current.material)) {
      const material = floorRef.current.material as THREE.MeshStandardMaterial;
      // Subtle light shimmer effect
      const time = state.clock.getElapsedTime();
      material.metalness = (selectedTile?.metalness ?? 0.1) + Math.sin(time * 0.5) * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Floor */}
      <mesh 
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
        material={floorMaterial}
      >
        <planeGeometry args={[12, 12]} />
      </mesh>

      {/* Floor Grid Lines (tile pattern) */}
      <gridHelper args={[12, 12, '#cccccc', '#e0e0e0']} position={[0, 0.01, 0]} />

      {/* Walls */}
      {/* Back Wall */}
      <mesh position={[0, 2.5, -6]} receiveShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#faf9f7" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-6, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#f5f4f2" />
      </mesh>

      {/* Right Wall with Window */}
      <mesh position={[6, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#f5f4f2" />
      </mesh>

      {/* Window on right wall */}
      <mesh position={[5.85, 3, 0]}>
        <boxGeometry args={[0.05, 2.5, 3]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.4} />
      </mesh>
      
      {/* Window frame */}
      <mesh position={[5.9, 3, 0]}>
        <boxGeometry args={[0.15, 2.7, 0.1]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[5.9, 3, 1.45]}>
        <boxGeometry args={[0.15, 2.7, 0.1]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[5.9, 3, -1.45]}>
        <boxGeometry args={[0.15, 2.7, 0.1]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>

      {/* Baseboard */}
      <mesh position={[0, 0.15, -5.9]}>
        <boxGeometry args={[12, 0.3, 0.15]} />
        <meshStandardMaterial color="#e5e5e5" />
      </mesh>
      <mesh position={[-5.9, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[12, 0.3, 0.15]} />
        <meshStandardMaterial color="#e5e5e5" />
      </mesh>
      <mesh position={[5.9, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[12, 0.3, 0.15]} />
        <meshStandardMaterial color="#e5e5e5" />
      </mesh>

      {/* Furniture - Minimalist Sofa */}
      <group position={[-2.5, 0, -3.5]}>
        {/* Sofa base */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[3, 0.6, 1.2]} />
          <meshStandardMaterial color="#8b8b8b" />
        </mesh>
        {/* Sofa back */}
        <mesh position={[0, 0.8, -0.5]} castShadow>
          <boxGeometry args={[3, 0.8, 0.2]} />
          <meshStandardMaterial color="#8b8b8b" />
        </mesh>
        {/* Cushions */}
        <mesh position={[-0.8, 0.7, 0]} castShadow>
          <boxGeometry args={[0.9, 0.25, 0.9]} />
          <meshStandardMaterial color="#a0a0a0" />
        </mesh>
        <mesh position={[0.8, 0.7, 0]} castShadow>
          <boxGeometry args={[0.9, 0.25, 0.9]} />
          <meshStandardMaterial color="#a0a0a0" />
        </mesh>
        {/* Legs */}
        {[[-1.3, -0.45], [1.3, -0.45], [-1.3, 0.45], [1.3, 0.45]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.05, z]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1]} />
            <meshStandardMaterial color="#2d2d2d" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Coffee Table */}
      <group position={[-2.5, 0, -1]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.5, 0.05, 0.8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.8} />
        </mesh>
        {/* Legs */}
        {[[-0.6, -0.3], [0.6, -0.3], [-0.6, 0.3], [0.6, 0.3]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.175, z]}>
            <cylinderGeometry args={[0.03, 0.03, 0.35]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Kitchen Island */}
      <group position={[3, 0, 2]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2, 1, 1]} />
          <meshStandardMaterial color="#2d2d2d" />
        </mesh>
        {/* Countertop */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[2.1, 0.1, 1.1]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Bar stools */}
        {[-0.5, 0.5].map((x, i) => (
          <group key={i} position={[x, 0, 0.9]}>
            <mesh position={[0, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.15, 0.6]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0, 0.75, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.1]} />
              <meshStandardMaterial color="#8b6914" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Floor Lamp */}
      <group position={[-0.5, 0, -4.5]}>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial color="#2d2d2d" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.7]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <coneGeometry args={[0.25, 0.35, 32]} />
          <meshStandardMaterial color="#f5f5dc" emissive="#f5f5dc" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Rug under coffee table */}
      <mesh position={[-2.5, 0.02, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#d4c4a8" roughness={0.9} />
      </mesh>

      {/* Pendant Light */}
      <group position={[3, 4.5, 2]}>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial 
            color="#fff8dc" 
            emissive="#fff8dc" 
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5]} />
          <meshStandardMaterial color="#2d2d2d" />
        </mesh>
      </group>

      {/* Plant */}
      <group position={[4.5, 0, -4.5]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.2, 0.6]} />
          <meshStandardMaterial color="#d4c4a8" />
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#2d5a27" />
        </mesh>
      </group>
    </group>
  );
}

export default Room;