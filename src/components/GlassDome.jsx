import { Html, RoundedBox, Sparkles, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const jewelryAssets = {
  earrings: '/assets/r3f-earrings.png',
  necklace: '/assets/r3f-emerald-necklace.png',
  ring: '/assets/r3f-diamond-ring.png',
  bangle: '/assets/r3f-gold-bangle.png',
  pendant: '/assets/r3f-emerald-pendant.png',
};

function Jewelry({ type }) {
  const ref = useRef();
  const texture = useTexture(jewelryAssets[type]);
  texture.anisotropy = 8;
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * .38) * .12;
    ref.current.position.y = 1.12 + Math.sin(state.clock.elapsedTime * .7) * .025;
  });
  const size = type === 'necklace' ? [1.48,1.48,1] : type === 'earrings' ? [1.13,1.13,1] : type === 'ring' ? [1.08,1.08,1] : type === 'pendant' ? [1.04,1.04,1] : [1.15,1.15,1];
  return <group><mesh ref={ref} position={[0,1.12,.43]} scale={size} renderOrder={10}><planeGeometry args={[1,1]} /><meshBasicMaterial map={texture} transparent alphaTest={.03} depthWrite={false} depthTest={false} toneMapped={false} /></mesh><Sparkles count={9} scale={[1.1,1.3,.45]} position={[0,1.18,.48]} size={2.2} speed={.28} opacity={.8} color="#fff0b5" /></group>;
}

function DisplayStand({ type }) {
  const material = <meshPhysicalMaterial color="#f7f0e5" roughness={.34} clearcoat={.72} clearcoatRoughness={.2} />;
  if (type === 'earrings') return <group position={[0,.55,0]}><mesh position-y={.34}><cylinderGeometry args={[.035,.045,.78,20]} />{material}</mesh><mesh position-y={.71}><boxGeometry args={[.72,.045,.05]} />{material}</mesh><mesh position-y={-.05}><cylinderGeometry args={[.36,.43,.16,40]} />{material}</mesh></group>;
  if (type === 'necklace') return <group position={[0,.7,-.02]}><mesh scale={[.62,.78,.18]}><sphereGeometry args={[.78,48,48,0,Math.PI*2,0,Math.PI*.72]} />{material}</mesh><mesh position-y={-.42}><cylinderGeometry args={[.52,.62,.18,48]} />{material}</mesh></group>;
  if (type === 'ring') return <group position={[0,.38,-.02]}><mesh rotation-x={-.12}><cylinderGeometry args={[.19,.25,.48,40]} />{material}</mesh><mesh position-y={-.28}><cylinderGeometry args={[.34,.42,.14,40]} />{material}</mesh></group>;
  if (type === 'pendant') return <group position={[0,.48,-.02]}><mesh><cylinderGeometry args={[.17,.23,.58,40]} />{material}</mesh><mesh position-y={-.34}><cylinderGeometry args={[.32,.4,.14,40]} />{material}</mesh></group>;
  return <group position={[0,.35,-.02]}><mesh rotation-z={Math.PI/2}><cylinderGeometry args={[.045,.045,.72,24]} />{material}</mesh><mesh position-y={-.25}><cylinderGeometry args={[.3,.38,.15,40]} />{material}</mesh></group>;
}

export function GlassDome({ position, type, scale=1 }) {
  const label = type === 'necklace' ? 'NECKLACES' : type === 'ring' ? 'RINGS' : type === 'earrings' ? 'EARRINGS' : type === 'pendant' ? 'PENDANTS' : 'BANGLES';
  return <group position={position} scale={scale}>
    <RoundedBox receiveShadow castShadow args={[1.88,.27,1.48]} radius={.065} smoothness={8} position-y={-.2}><meshPhysicalMaterial color="#faf7f0" roughness={.17} clearcoat={1} /></RoundedBox>
    <RoundedBox receiveShadow castShadow args={[1.62,.12,1.22]} radius={.04} smoothness={8} position-y={.0}><meshPhysicalMaterial color="#fffdf8" roughness={.12} clearcoat={1} /></RoundedBox>
    <mesh position={[0,.08,.63]}><boxGeometry args={[1.57,.042,.035]}/><meshBasicMaterial color="#d0a04a" toneMapped={false}/></mesh>
    <Html position={[0,-.22,.76]} center transform distanceFactor={5}><span className="vitrine-label">{label}</span></Html>
    <group position={[0,.1,-.48]}>
      <mesh position={[-.78,1.38,0]}><boxGeometry args={[.05,2.54,.055]}/><meshBasicMaterial color="#d19d42" toneMapped={false}/></mesh>
      <mesh position={[.78,1.38,0]}><boxGeometry args={[.05,2.54,.055]}/><meshBasicMaterial color="#d19d42" toneMapped={false}/></mesh>
      <mesh position={[0,2.63,0]}><torusGeometry args={[.78,.028,12,80,Math.PI]}/><meshBasicMaterial color="#d8a84d" toneMapped={false}/></mesh>
    </group>
    <RoundedBox castShadow args={[1.7,3.02,1.2]} radius={.68} smoothness={16} position-y={1.55}><meshPhysicalMaterial color="#fffdf5" transmission={1} thickness={.28} ior={1.52} roughness={.012} clearcoat={1} clearcoatRoughness={.012} transparent opacity={.3} envMapIntensity={2.4} attenuationColor="#f5dca8" attenuationDistance={3} /></RoundedBox>
    <pointLight position={[0,2.92,.5]} intensity={1.12} distance={4} color="#ffe2a0" />
    <DisplayStand type={type} />
    <Jewelry type={type} />
  </group>;
}
