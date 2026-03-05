import React, { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface GloveProps {
  scrollProgress: MotionValue<number> | number;
  highlightedPart?: string | null;
  modelUrl?: string; // Optional URL for custom GLB model
  disableAutoPosition?: boolean;
}

// Pre-load a default model if you have one, or use this as a placeholder
// useGLTF.preload('/path/to/your/model.glb');

const CustomModel: React.FC<{ url: string; highlightedPart?: string | null }> = ({ url, highlightedPart }) => {
  const { scene } = useGLTF(url);
  
  // You can traverse the scene to apply custom materials or highlights if needed
  useMemo(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        
        // Example: If the mesh name matches a part, we could highlight it
        // if (highlightedPart && obj.name.toLowerCase().includes(highlightedPart.toLowerCase())) {
        //   obj.material = new THREE.MeshStandardMaterial({ color: '#00f2ff', emissive: '#00f2ff', emissiveIntensity: 2 });
        // }
      }
    });
  }, [scene, highlightedPart]);

  return <Clone object={scene} scale={2.5} position={[0, -1, 0]} />;
};

export const GloveModel: React.FC<GloveProps> = ({ scrollProgress, highlightedPart, modelUrl, disableAutoPosition }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const progress = typeof scrollProgress === 'number' ? scrollProgress : scrollProgress.get();
    
    // Rotation logic - Base rotation + extra rotation to face camera when highlighted
    let targetRotationY = progress * Math.PI * 2;
    
    // If a part is highlighted, we might want to nudge the rotation to show it better
    if (highlightedPart === 'motion' || highlightedPart === 'haptic' || highlightedPart === 'display') {
      // These are on the back/top of the hand
      targetRotationY = Math.PI; // Face back to camera
    } else if (highlightedPart === 'flex') {
      // Fingers/Palm
      targetRotationY = 0; // Face palm to camera
    } else if (highlightedPart === 'macros' || highlightedPart === 'smarthome' || highlightedPart === 'bluetooth') {
      // Wrist electronics
      targetRotationY = Math.PI * 1.1; // Slight angle for wrist
    }

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(progress * Math.PI) * 0.2, 0.05);
    
    // Position logic
    if (!disableAutoPosition) {
      // Shift to the right (x: 1.5) at the start, move to center (x: 0) as we scroll
      const targetX = progress < 0.2 ? 1.5 * (1 - progress / 0.2) : 0;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
      
      // Scale logic - slightly smaller in hero to avoid crowding
      const targetScale = progress < 0.2 ? 1.0 + (progress / 0.2) * 0.2 : 1.2;
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
    } else {
      groupRef.current.position.x = 0;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
      groupRef.current.scale.setScalar(1.2);
    }
  });

  const techTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Dark base
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, 256, 256);
      
      // Hex/Grid pattern
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      for (let i = 0; i < 256; i += 16) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 256);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(256, i);
        ctx.stroke();
      }
      
      // Random tech dots
      ctx.fillStyle = '#222';
      for (let i = 0; i < 20; i++) {
        ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 8);
    return tex;
  }, []);

  const materials = useMemo(() => ({
    fabric: new THREE.MeshPhysicalMaterial({
      map: techTexture,
      color: '#111',
      roughness: 0.8,
      metalness: 0.1,
      sheen: 0.2,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color('#222'),
    }),
    leather: new THREE.MeshPhysicalMaterial({
      color: '#050505',
      roughness: 0.2,
      metalness: 0.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    }),
    pcbBlue: new THREE.MeshPhysicalMaterial({
      color: '#002266',
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      emissive: '#001133',
      emissiveIntensity: 0.5,
    }),
    pcbGreen: new THREE.MeshPhysicalMaterial({
      color: '#004411',
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      emissive: '#002205',
      emissiveIntensity: 0.5,
    }),
    neonBlue: new THREE.MeshStandardMaterial({ 
      color: '#00f2ff', 
      emissive: '#00f2ff', 
      emissiveIntensity: 12 
    }),
    neonPurple: new THREE.MeshStandardMaterial({ 
      color: '#bc13fe', 
      emissive: '#bc13fe', 
      emissiveIntensity: 12 
    }),
    neonGreen: new THREE.MeshStandardMaterial({ 
      color: '#39ff14', 
      emissive: '#39ff14', 
      emissiveIntensity: 12 
    }),
    copper: new THREE.MeshStandardMaterial({ 
      color: '#b87333', 
      metalness: 1.0, 
      roughness: 0.1,
      emissive: '#442200',
      emissiveIntensity: 0.2
    }),
    metal: new THREE.MeshStandardMaterial({ 
      color: '#888', 
      metalness: 1.0, 
      roughness: 0.05 
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#fff',
      transparent: true,
      opacity: 0.2,
      transmission: 0.9,
      roughness: 0.05,
      thickness: 0.2,
      ior: 1.5,
    }),
    solar: new THREE.MeshPhysicalMaterial({
      color: '#010101',
      metalness: 1.0,
      roughness: 0.01,
      clearcoat: 1.0,
      reflectivity: 1.0,
    }),
    sensorPad: new THREE.MeshPhysicalMaterial({
      color: '#000',
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      emissive: '#001111',
      emissiveIntensity: 1.0,
    }),
  }), [techTexture]);

  return (
    <group ref={groupRef}>
      {modelUrl ? (
        <Suspense fallback={null}>
          <CustomModel url={modelUrl} highlightedPart={highlightedPart} />
        </Suspense>
      ) : (
        <>
          {/* Procedural Fallback Model - Refined Anatomical Hand */}
          {/* Main Hand Body */}
          <group>
            {/* Palm - Lower (Fleshy part) */}
            <mesh position={[0, -0.1, 0]} material={materials.fabric}>
              <sphereGeometry args={[0.5, 32, 16]} />
              <mesh scale={[1.1, 0.8, 0.4]}>
                <sphereGeometry args={[0.5, 32, 16]} />
              </mesh>
            </mesh>
            
            {/* Palm - Upper (Knuckle base) */}
            <mesh position={[0, 0.25, 0]} material={materials.fabric}>
              <sphereGeometry args={[0.48, 32, 16]} />
              <mesh scale={[1.2, 0.7, 0.35]}>
                <sphereGeometry args={[0.48, 32, 16]} />
              </mesh>
            </mesh>

            {/* Thumb Base (Thenar Eminence) */}
            <mesh position={[0.38, -0.05, 0.05]} material={materials.fabric} rotation={[0, 0, -0.5]}>
              <sphereGeometry args={[0.22, 32, 16]} />
              <mesh scale={[1, 1.5, 0.8]}>
                <sphereGeometry args={[0.22, 32, 16]} />
              </mesh>
            </mesh>

            {/* Back of Hand Reinforcement - Contoured Leather */}
            <mesh position={[0, 0.1, 0.15]} material={materials.leather}>
              <boxGeometry args={[0.8, 0.7, 0.1]} />
              {/* Subtle curve to the back plate */}
              <mesh position={[0, 0, 0.05]} scale={[1, 1, 0.5]}>
                <sphereGeometry args={[0.4, 32, 16]} />
              </mesh>
            </mesh>

            {/* Haptic Vibration Motor */}
            <group position={[0, 0.1, 0.22]}>
              <mesh material={materials.metal} rotation={[Math.PI/2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
              </mesh>
              {highlightedPart === 'haptic' && (
                <mesh scale={[1.4, 1.4, 1.4] as [number, number, number]} rotation={[Math.PI/2, 0, 0]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
                  <meshBasicMaterial color="#00f2ff" wireframe />
                </mesh>
              )}
            </group>
            
            {/* Glowing Palm Circuit Lines */}
            <mesh position={[0.15, 0.1, 0.21]} rotation={[0, 0, 0.15]}>
              <boxGeometry args={[0.008, 0.4, 0.008]} />
              <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={4} />
            </mesh>
            <mesh position={[-0.15, 0, 0.21]} rotation={[0, 0, -0.15]}>
              <boxGeometry args={[0.008, 0.35, 0.008]} />
              <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={4} />
            </mesh>
          </group>
          
          {/* Palm Side Details */}
          <group position={[0, 0, -0.18]}>
            <mesh position={[0.2, -0.15, 0]} material={materials.sensorPad}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <mesh scale={[1, 1, 0.2]}>
                <sphereGeometry args={[0.08, 16, 16]} />
              </mesh>
            </mesh>
            <mesh position={[-0.2, -0.05, 0]} material={materials.sensorPad}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <mesh scale={[1, 1, 0.2]}>
                <sphereGeometry args={[0.07, 16, 16]} />
              </mesh>
            </mesh>
          </group>

          {/* Wrist Assembly */}
          <group position={[0, -0.75, 0]}>
            {/* Wrist Strap */}
            <mesh rotation={[Math.PI/2, 0, 0]} material={materials.leather}>
              <cylinderGeometry args={[0.38, 0.42, 0.5, 32]} />
            </mesh>
            
            {/* Electronics Base Plate */}
            <group position={[0, 0, 0.3]}>
              <mesh material={materials.glass}>
                <boxGeometry args={[0.8, 0.5, 0.05]} />
              </mesh>
              
              {/* Arduino Nano */}
              <group position={[-0.18, 0.08, 0.04]}>
                <mesh material={materials.pcbBlue}>
                  <boxGeometry args={[0.18, 0.3, 0.02]} />
                </mesh>
                {(highlightedPart === 'arduino' || highlightedPart === 'macros') && (
                  <mesh scale={[1.2, 1.2, 1.2] as [number, number, number]}>
                    <boxGeometry args={[0.18, 0.3, 0.02]} />
                    <meshBasicMaterial color="#39ff14" wireframe />
                  </mesh>
                )}
              </group>

              {/* Bluetooth Module */}
              <group position={[0.18, 0.12, 0.04]}>
                <mesh material={materials.pcbGreen}>
                  <boxGeometry args={[0.14, 0.25, 0.02]} />
                </mesh>
                {highlightedPart === 'bluetooth' && (
                  <mesh scale={[1.2, 1.2, 1.2] as [number, number, number]}>
                    <boxGeometry args={[0.14, 0.25, 0.02]} />
                    <meshBasicMaterial color="#00f2ff" wireframe />
                  </mesh>
                )}
              </group>

              {/* Solar Panel */}
              <group position={[0.12, -0.12, 0.04]}>
                <mesh material={materials.solar}>
                  <boxGeometry args={[0.25, 0.18, 0.02]} />
                </mesh>
                <mesh position={[0, 0, 0.012]} material={materials.glass}>
                  <planeGeometry args={[0.22, 0.15]} />
                </mesh>
              </group>

              {/* Battery Holder */}
              <group position={[-0.18, -0.12, 0.04]}>
                <mesh material={materials.metal} rotation={[Math.PI/2, 0, 0]}>
                  <cylinderGeometry args={[0.07, 0.07, 0.03, 32]} />
                </mesh>
              </group>

              {/* Smart Home Module */}
              <group position={[0, -0.15, 0.04]}>
                <mesh material={materials.pcbGreen}>
                  <boxGeometry args={[0.12, 0.12, 0.02]} />
                </mesh>
                {highlightedPart === 'smarthome' && (
                  <mesh scale={[1.3, 1.3, 1.3] as [number, number, number]}>
                    <boxGeometry args={[0.12, 0.12, 0.02]} />
                    <meshBasicMaterial color="#39ff14" wireframe />
                  </mesh>
                )}
              </group>
            </group>
          </group>

          {/* OLED Display */}
          <group position={[0, 0.15, 0.2]} rotation={[-0.15, 0, 0]}>
            <mesh material={materials.leather}>
              <boxGeometry args={[0.65, 0.45, 0.06]} />
            </mesh>
            <mesh position={[0, 0, 0.04]} material={materials.glass}>
              <boxGeometry args={[0.55, 0.35, 0.01]} />
            </mesh>
            <Text
              position={[0, 0, 0.05]}
              fontSize={0.025}
              color="#00f2ff"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.4}
            >
              {`LUPHONIX\nBATT: 88%\nBT: OK`}
            </Text>
            {highlightedPart === 'display' && (
              <mesh scale={[1.1, 1.1, 1.1] as [number, number, number]}>
                <boxGeometry args={[0.65, 0.45, 0.06]} />
                <meshBasicMaterial color="#00f2ff" wireframe />
              </mesh>
            )}
          </group>

          {/* Fingers - Segmented & Tapered */}
          {[
            { pos: [-0.32, 0.55, 0] as [number, number, number], rot: 0.12, len: 0.65, name: 'pinky' },
            { pos: [-0.1, 0.65, 0] as [number, number, number], rot: 0.04, len: 0.8, name: 'ring' },
            { pos: [0.12, 0.7, 0] as [number, number, number], rot: 0, len: 0.9, name: 'middle' },
            { pos: [0.34, 0.65, 0] as [number, number, number], rot: -0.04, len: 0.8, name: 'index' },
          ].map((f, i) => (
            <group key={i} position={f.pos} rotation={[0, 0, f.rot]}>
              {/* Proximal Phalanx */}
              <mesh position={[0, f.len * 0.2, 0]} material={materials.fabric}>
                <cylinderGeometry args={[0.06, 0.08, f.len * 0.4, 16]} />
              </mesh>
              {/* Middle Phalanx */}
              <mesh position={[0, f.len * 0.55, 0]} material={materials.fabric}>
                <cylinderGeometry args={[0.05, 0.06, f.len * 0.3, 16]} />
              </mesh>
              {/* Distal Phalanx */}
              <mesh position={[0, f.len * 0.85, 0]} material={materials.fabric}>
                <cylinderGeometry args={[0.04, 0.05, f.len * 0.3, 16]} />
              </mesh>
              
              {/* Knuckle Joint */}
              <mesh material={materials.leather}>
                <sphereGeometry args={[0.09, 16, 16]} />
              </mesh>
              {/* Middle Joint */}
              <mesh position={[0, f.len * 0.4, 0]} material={materials.leather}>
                <sphereGeometry args={[0.07, 16, 16]} />
              </mesh>
              {/* Tip Joint */}
              <mesh position={[0, f.len * 0.7, 0]} material={materials.leather}>
                <sphereGeometry args={[0.06, 16, 16]} />
              </mesh>

              {/* Glowing Circuit Line on Finger */}
              <mesh position={[0, f.len/2, 0.07]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.005, f.len * 0.9, 0.005]} />
                <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={5} />
              </mesh>
              
              {/* Flex Sensors */}
              <mesh position={[0, f.len/2, 0.08]} material={materials.copper}>
                <boxGeometry args={[0.03, f.len * 0.8, 0.005]} />
                {highlightedPart === 'flex' && (
                  <mesh scale={[1.5, 1.1, 1.5] as [number, number, number]}>
                    <boxGeometry args={[0.03, f.len * 0.8, 0.005]} />
                    <meshBasicMaterial color="#bc13fe" wireframe />
                  </mesh>
                )}
              </mesh>

              {/* Pressure Sensors */}
              <mesh position={[0, f.len * 0.9, -0.07]} material={materials.sensorPad}>
                <sphereGeometry args={[0.03, 16, 16]} />
              </mesh>
            </group>
          ))}

          {/* Thumb - Refined */}
          <group position={[0.45, 0.1, 0]} rotation={[0, 0, -0.6]}>
            <mesh position={[0, 0.2, 0]} material={materials.fabric}>
              <cylinderGeometry args={[0.08, 0.1, 0.4, 16]} />
            </mesh>
            <mesh position={[0, 0.5, 0]} material={materials.fabric}>
              <cylinderGeometry args={[0.06, 0.08, 0.3, 16]} />
            </mesh>
            <mesh material={materials.leather}>
              <sphereGeometry args={[0.11, 16, 16]} />
            </mesh>
            <mesh position={[0, 0.35, 0]} material={materials.leather}>
              <sphereGeometry args={[0.09, 16, 16]} />
            </mesh>
            <mesh position={[0, 0.6, -0.07]} material={materials.sensorPad}>
              <sphereGeometry args={[0.04, 16, 16]} />
            </mesh>
          </group>

          {/* MPU-6050 Sensor */}
          <group position={[0.35, -0.15, 0.18]}>
            <mesh material={materials.pcbBlue}>
              <boxGeometry args={[0.12, 0.12, 0.03]} />
            </mesh>
          </group>

          {/* Wiring (Ribbon Cables & Individual Wires) */}
          <group>
            {/* Main Ribbon Cable from fingers to under OLED */}
            {[...Array(6)].map((_, i) => (
              <mesh key={`ribbon-${i}`} position={[0.02 + i*0.02, 0.4, 0.18]} rotation={[0, 0, 0.02]}>
                <boxGeometry args={[0.006, 0.6, 0.006]} />
                <meshStandardMaterial color={i % 2 === 0 ? "#b87333" : "#111"} />
              </mesh>
            ))}
            
            {/* Wires from OLED to Wrist Electronics */}
            {[...Array(4)].map((_, i) => (
              <mesh key={`wrist-wire-${i}`} position={[-0.1 + i*0.05, -0.4, 0.25]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[0.005, 0.5, 0.005]} />
                <meshStandardMaterial color={["#ff0000", "#ffff00", "#00ff00", "#0000ff"][i]} />
              </mesh>
            ))}
          </group>

          {/* MPU-6050 Sensor (Mounted near thumb base) */}
          <group position={[0.4, -0.2, 0.25]}>
            <mesh material={materials.pcbBlue}>
              <boxGeometry args={[0.18, 0.18, 0.04]} />
            </mesh>
            {highlightedPart === 'motion' && (
              <mesh scale={[1.8, 1.8, 1.8] as [number, number, number]}>
                <boxGeometry args={[0.18, 0.18, 0.04]} />
                <meshBasicMaterial color="#bc13fe" wireframe />
              </mesh>
            )}
          </group>

          {/* Complex Wiring (Ribbon Cables) */}
          <group>
            {/* Main Ribbon Cable */}
            <mesh position={[0.1, -0.3, 0.22]} rotation={[0, 0, 0.1]}>
              <boxGeometry args={[0.08, 1.2, 0.01]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            {/* Individual wires to fingers */}
            {[...Array(4)].map((_, i) => (
              <mesh key={i} position={[0.15 + i*0.02, 0.1, 0.22]} rotation={[0, 0, 0.1 + i*0.05]}>
                <boxGeometry args={[0.01, 1.0, 0.01]} />
                <meshStandardMaterial color={i % 2 === 0 ? "#b87333" : "#111"} />
              </mesh>
            ))}
          </group>

          {/* Side Controls */}
          <group position={[0.6, -0.8, 0.2]} rotation={[0, Math.PI/2, 0]}>
            {/* USB-C Port */}
            <mesh material={materials.metal}>
              <boxGeometry args={[0.15, 0.06, 0.1]} />
            </mesh>
            {/* Side Button */}
            <mesh position={[0, 0.15, 0]} material={materials.leather}>
              <boxGeometry args={[0.1, 0.08, 0.05]} />
            </mesh>
          </group>
        </>
      )}
    </group>
  );
};
