import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function Field({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => [
    [-2.7, 1.6, 0], [-1.7, -.7, .8], [-.3, 1.2, -1], [.4, -.8, .4], [1.8, 1.5, .2], [2.7, -.6, -1], [0, 0, 0],
  ] as [number, number, number][], []);
  const connections = useMemo(() => [[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[1,3],[2,4]], []);

  useFrame((state, delta) => {
    if (!reducedMotion && group.current) {
      group.current.rotation.y += delta * .055;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * .18) * .08;
    }
  });

  return (
    <group ref={group}>
      {connections.map(([a,b], index) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...points[a]), new THREE.Vector3(...points[b]),
        ]);
        const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#5f8f7c', transparent: true, opacity: .48 }));
        return <primitive key={index} object={line} />;
      })}
      {points.map((position, index) => (
        <mesh key={index} position={position}>
          <icosahedronGeometry args={[index === 6 ? .48 : .22, 1]} />
          <meshStandardMaterial color={index === 6 ? '#c5f46d' : index % 2 ? '#86e3ef' : '#70edbe'} roughness={.35} metalness={.2} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.4, .012, 8, 128]} />
        <meshBasicMaterial color="#c5f46d" transparent opacity={.25} />
      </mesh>
    </group>
  );
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (reducedMotion) return;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * .45, .025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * .28, .025);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <div className="hero-canvas" aria-label="Abstract map of connected AI product systems">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 46 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.3} />
        <pointLight position={[3, 4, 5]} intensity={18} color="#c5f46d" />
        <pointLight position={[-4, -2, 3]} intensity={12} color="#70edbe" />
        <Field reducedMotion={reducedMotion} />
        <CameraRig reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
