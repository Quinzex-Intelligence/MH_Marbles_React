import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Room } from './Room';
import { Tile } from '@/data/tiles';

interface SceneProps {
  selectedTile: Tile | null;
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#d4af37" wireframe />
    </mesh>
  );
}

export function Scene({ selectedTile }: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: 'linear-gradient(180deg, #f5f4f2 0%, #e8e4de 100%)' }}
    >
      <Suspense fallback={<Loader />}>
        <PerspectiveCamera 
          makeDefault 
          position={[8, 6, 8]} 
          fov={45}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[3, 4, 2]} intensity={0.5} color="#fff8dc" />
        <pointLight position={[-2, 3, -4]} intensity={0.3} color="#f5f5dc" />
        
        {/* Environment for reflections */}
        <Environment preset="apartment" />
        
        {/* Contact shadows for realism */}
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={10}
        />
        
        {/* Room with selected tile */}
        <Room selectedTile={selectedTile} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={5}
          maxDistance={20}
          target={[0, 1, 0]}
          enableDamping
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
}

export default Scene;