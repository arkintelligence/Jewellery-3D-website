import { Sparkles, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { FloatingParticles } from './FloatingParticles.jsx';
import { LightingSetup } from './LightingSetup.jsx';

const products = [
  { type:'necklace', src:'/assets/hero-necklace-cloche.png' },
  { type:'ring', src:'/assets/hero-ring-cloche.png' },
  { type:'earrings', src:'/assets/hero-earrings-cloche.png' },
  { type:'bangle', src:'/assets/hero-bangle-cloche.png' },
  { type:'necklace-return', src:'/assets/hero-necklace-cloche.png' },
];

function FixedShowroom() {
  const ref=useRef();
  const world=useRef(new THREE.Vector3());
  const worldScale=useRef(new THREE.Vector3());
  const { camera, size }=useThree();
  const texture=useTexture('/assets/showroom-rich-bg.png');
  texture.colorSpace=THREE.SRGBColorSpace;
  texture.anisotropy=8;
  useFrame(()=>{
    if(!ref.current)return;
    ref.current.getWorldPosition(world.current);
    ref.current.parent.getWorldScale(worldScale.current);
    const distance=Math.abs(camera.position.z-world.current.z);
    const height=2*Math.tan(THREE.MathUtils.degToRad(camera.fov*.5))*distance;
    const width=height*(size.width/size.height);
    ref.current.scale.set(width*1.13/worldScale.current.x,height*1.46/worldScale.current.y,1);
  });
  return <mesh ref={ref} position={[0,.28,-4.1]}><planeGeometry args={[1,1]}/><meshBasicMaterial map={texture} toneMapped={false} fog={false}/></mesh>;
}

function ClocheStrip({ progress }) {
  const refs=useRef([]);
  const textures=useTexture(products.map(product=>product.src));
  textures.forEach(texture=>{texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=8;});
  useFrame((state,delta)=>{
    const travel=THREE.MathUtils.smoothstep(progress.current,.47,.88)*3.55;
    refs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const x=(index-travel)*4.6;
      mesh.visible=Math.abs(x)<7.2;
      const focus=1-Math.min(1,Math.abs(x)/4.6);
      mesh.position.x=THREE.MathUtils.damp(mesh.position.x,x,3.25,delta);
      // Keep every complete vitrine planted on the showroom dais while it travels.
      mesh.position.y=THREE.MathUtils.damp(mesh.position.y,-.56,4.2,delta);
      mesh.position.z=-3.94+focus*.2;
      const scale=.64+focus*.62;
      mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x,scale,4,delta));
      mesh.rotation.z=Math.sin(state.clock.elapsedTime*.34+index)*.012;
    });
  });
  return <group>{products.map((product,index)=><mesh key={product.type} ref={node=>{refs.current[index]=node}} position={[(index-1)*4.35,-.43,-3.94]}><planeGeometry args={[4.15,5.15]}/><meshBasicMaterial map={textures[index]} transparent alphaTest={.02} depthWrite={false} toneMapped={false} fog={false}/></mesh>)}<Sparkles count={22} scale={[10,3.4,.3]} position={[0,2.2,-3.75]} size={2} speed={.18} opacity={.55} color="#fff1bd"/><Sparkles count={18} scale={[2.8,3,.18]} position={[0,2,-3.62]} size={3.2} speed={.28} opacity={.95} color="#fff8dc"/></group>;
}

export function ShowroomScene({ progress }) {
  const group=useRef(),lights=useRef();
  useFrame(()=>{
    const p=progress.current;
    if(group.current){group.current.visible=p>.23;const e=Math.max(0,Math.min(1,(p-.27)/.22));group.current.position.y=(1-e)*-.35;group.current.scale.setScalar(.92+e*.08)}
    if(lights.current)lights.current.scale.setScalar(Math.max(.01,Math.min(1,(p-.26)/.18)));
  });
  return <group ref={group} position={[0,0,-10.8]}><group ref={lights}><LightingSetup showroom/><FloatingParticles count={75} radius={8} color="#d9ae60" position={[0,2,-1]}/></group><FixedShowroom/><ClocheStrip progress={progress}/></group>;
}
