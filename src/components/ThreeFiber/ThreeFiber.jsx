import { Canvas, useLoader } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense } from 'react'

const Model = (props) => {
  const gltf = useLoader(GLTFLoader, `${props.item}`)
  return (
    <>
      <primitive object={gltf.scene} scale={1} />
    </>
  )
}

export default function ThreeFiber() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[100, 50, 35]} />
      <Suspense fallback={null}>
        <Model />
        {/* <OrbitControls /> */}
      </Suspense>
    </Canvas>
  )
}
