import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function MorphedScene({ intensity = 1, reduceMotion = false }) {
  const knotRef = useRef(null);
  const shaderRef = useRef(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uIntensity: { value: intensity },
    }),
    [intensity],
  );

  const pointerTarget = useRef({ x: 0, y: 0 });
  const scrollTarget = useRef(0);
  const pointerCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      pointerTarget.current.x = clamp((e.clientX / w - 0.5) * 2, -1, 1);
      pointerTarget.current.y = clamp((e.clientY / h - 0.5) * 2, -1, 1);
    };
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      scrollTarget.current = clamp((window.scrollY || 0) / max, 0, 1);
    };

    onScroll();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    const t = reduceMotion ? delta * 0.2 : delta;
    uniforms.uTime.value += t * 1.1 * intensity;
    uniforms.uIntensity.value = intensity;

    pointerCurrent.current.x += (pointerTarget.current.x - pointerCurrent.current.x) * 0.06;
    pointerCurrent.current.y += (pointerTarget.current.y - pointerCurrent.current.y) * 0.06;

    uniforms.uPointer.value.set(pointerCurrent.current.x, pointerCurrent.current.y);
    uniforms.uScroll.value = scrollTarget.current;

    if (knotRef.current) {
      const px = pointerCurrent.current.x;
      const py = pointerCurrent.current.y;
      knotRef.current.rotation.x = py * 0.55 + uniforms.uTime.value * 0.12;
      knotRef.current.rotation.y = px * 0.75 + uniforms.uTime.value * 0.22;
      const s = 1 + uniforms.uScroll.value * 0.07;
      knotRef.current.scale.setScalar(s);
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uPointer;
    uniform float uScroll;
    uniform float uIntensity;

    varying vec3 vNormal;
    varying vec3 vPos;

    void main() {
      vec3 pos = position;
      vec3 n = normal;

      float t = uTime;
      float px = uPointer.x;
      float py = uPointer.y;

      float f1 = sin(pos.x * 2.4 + t * 1.25 + px * 1.5);
      float f2 = cos(pos.y * 2.1 + t * 0.95 + py * 1.25);
      float f3 = sin((pos.z * 1.6) - t * 0.85);

      float disp = (f1 + f2 + f3) * 0.22;
      disp *= (0.65 + uScroll * 0.6) * uIntensity;

      pos += n * disp;

      vNormal = normalize(normalMatrix * n);
      vPos = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uIntensity;
    varying vec3 vNormal;
    varying vec3 vPos;

    void main() {
      vec3 n = normalize(vNormal);
      vec3 v = normalize(-vPos); // approximate view for stylized look

      float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.0);

      vec3 gold = vec3(0.83, 0.69, 0.20);
      vec3 champagne = vec3(1.0, 0.97, 0.84);
      vec3 amber = vec3(0.72, 0.52, 0.12);

      vec3 base = mix(amber, gold, fresnel);
      vec3 highlight = mix(champagne, gold, fresnel);

      float rim = fresnel * 1.2;
      vec3 col = base + highlight * rim * uIntensity;

      // Soft emissive-like output
      col = mix(col, vec3(1.0) * fresnel, 0.18);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return (
    <group>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 2, 3]} intensity={1.2} />

      {/* Main morphing knot */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.15, 0.42, 220, 22]} />
        <shaderMaterial
          ref={shaderRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={false}
          depthWrite={true}
        />
      </mesh>

      {/* Secondary glow core */}
      <mesh scale={1.18} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshStandardMaterial
          color={new THREE.Color('#D4AF37')}
          emissive={new THREE.Color('#D4AF37')}
          emissiveIntensity={reduceMotion ? 0.9 : 1.35}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>
    </group>
  );
}

export default function ReelMorphedStage({ intensity = 1, className = '' }) {
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <MorphedScene intensity={intensity} reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}

