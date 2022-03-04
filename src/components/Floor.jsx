import {
    MeshReflectorMaterial
} from '@react-three/drei'

export default function Floor(props){
    let color = props.color

    return <mesh {...props}  rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
            blur={[50, 50]}
            resolution={1024}
            mixBlur={1}
            mixStrength={10}
            roughness={5}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color={color}
            metalness={0.1}
        />
    </mesh>
}

