import { RoundedBox, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function GoldenOrb({ progress }) {
  const group=useRef(), crest=useRef();
  const texture=useTexture('/assets/goldentree-logo.png');
  texture.anisotropy=8;
  useFrame((state)=>{
    if(!group.current)return;
    const p=progress.current;
    const reveal=Math.min(1,p/.07);
    const exit=Math.max(0,Math.min(1,(p-.2)/.14));
    group.current.position.y=.8+Math.sin(state.clock.elapsedTime*.55)*.035;
    group.current.rotation.y=Math.sin(state.clock.elapsedTime*.22)*.025;
    group.current.rotation.x=-.08+exit*.12;
    group.current.scale.setScalar((.92+reveal*.08)*(1-exit*.32));
    if(crest.current)crest.current.opacity=reveal*(1-exit);
  });
  return <group ref={group} position={[0,.8,0]}>
    <RoundedBox args={[3.65,2.35,.34]} radius={.22} smoothness={10} castShadow>
      <meshPhysicalMaterial color="#c58b20" metalness={1} roughness={.16} clearcoat={1} clearcoatRoughness={.05} emissive="#6b3500" emissiveIntensity={.13}/>
    </RoundedBox>
    <mesh position={[0,.14,.19]} scale={1.15} renderOrder={4}>
      <planeGeometry args={[1.45,1.45]}/>
      <meshBasicMaterial ref={crest} map={texture} transparent depthWrite={false} toneMapped={false}/>
    </mesh>
  </group>;
}
