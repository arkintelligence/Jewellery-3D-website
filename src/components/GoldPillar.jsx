export function GoldPillar({ position, scale = 1 }) {
  return <group position={position} scale={scale}>
    <mesh castShadow><cylinderGeometry args={[.22,.28,7,48]}/><meshPhysicalMaterial color="#d9a447" metalness={.92} roughness={.16} clearcoat={1}/></mesh>
    <mesh position-y={-3.55}><cylinderGeometry args={[.44,.5,.26,48]}/><meshStandardMaterial color="#c7953b" metalness={.9} roughness={.2}/></mesh>
    <mesh position-y={3.55}><cylinderGeometry args={[.48,.4,.28,48]}/><meshStandardMaterial color="#f0c96d" metalness={.95} roughness={.16}/></mesh>
  </group>;
}
