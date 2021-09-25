import React, { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function ThreeFiber(props) {
  const Model = () => {
    const gltf = useLoader(GLTFLoader, props.item)
    return (
      <>
        <primitive object={gltf.scene} scale={0.7} />
      </>
    )
  }

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
      <Suspense fallback={null}>
        <Model />
        <Environment preset='studio' />
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -0.65, 0]}
          opacity={1}
          width={5}
          height={5}
          blur={3}
          far={1.1}
        />
      </Suspense>
      <OrbitControls
        autoRotate={props.autoRotate}
        enablePan={props.pan}
        enableZoom={props.zoom}
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 2.3}
      />
    </Canvas>
  )
}
