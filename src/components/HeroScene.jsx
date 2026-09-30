import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { FloatingParticles } from './FloatingParticles.jsx';

export function HeroScene({ progress }) {
  const group=useRef(), bullionMaterial=useRef(), hallMaterial=useRef(), backdropMesh=useRef();
  const [bullion,hall]=useTexture(['/assets/gold-bullion-intro.png','/assets/golden-brand-hall.webp']);
  bullion.anisotropy=8; hall.anisotropy=8;
  useFrame((state)=>{
    const p=progress.current;
    if(group.current) group.current.visible=p<.31;
    if(bullionMaterial.current) bullionMaterial.current.opacity=Math.max(0,1-p/.13);
    if(hallMaterial.current) hallMaterial.current.opacity=Math.max(0,Math.min(1,(p-.055)/.07))*Math.max(0,1-Math.max(0,(p-.17)/.11));
    if(backdropMesh.current){
      const t=state.clock.elapsedTime;
      const pulse=1.015+Math.sin(t*.38)*.012;
      backdropMesh.current.scale.set(pulse,pulse,1);
      backdropMesh.current.position.x=Math.sin(t*.22)*.16;
      backdropMesh.current.position.y=1.35+Math.cos(t*.28)*.05;
    }
  });
  return <group ref={group}>
    <mesh ref={backdropMesh} position={[0,1.25,-4.2]}><planeGeometry args={[20.5,11.8]}/><meshBasicMaterial ref={bullionMaterial} map={bullion} transparent opacity={1} depthWrite={false}/></mesh>
    <mesh position={[0,1.35,-4.15]}><planeGeometry args={[26,16]}/><meshBasicMaterial ref={hallMaterial} map={hall} transparent opacity={0} depthWrite={false}/></mesh>
    <pointLight position={[0,1,2.4]} intensity={4.8} distance={9} color="#edae42"/>
    <pointLight position={[-4,3,-1]} intensity={2.2} distance={10} color="#ffca61"/>
    <pointLight position={[4,2,-1]} intensity={2} distance={10} color="#d77c18"/>
    <FloatingParticles count={240} radius={5.2} position={[0,1.4,0]}/>
  </group>;
}
