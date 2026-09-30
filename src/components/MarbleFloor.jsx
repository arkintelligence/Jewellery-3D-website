import { MeshReflectorMaterial } from '@react-three/drei';
export function MarbleFloor(){return <mesh receiveShadow rotation-x={-Math.PI/2} position={[0,-.42,-10.8]}><planeGeometry args={[28,28]}/><MeshReflectorMaterial color="#e8dfcf" roughness={.28} metalness={.08} mirror={.48} blur={[500,120]} mixBlur={1} mixStrength={2.4} resolution={512}/></mesh>}
