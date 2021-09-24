import { Row, Col } from 'antd'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense } from 'react'

function HomePage() {
  const Model = () => {
    const gltf = useLoader(
      GLTFLoader,
      'https://3s2m9pj4axpg.grandmoralis.com:2053/server/files/MCS19nYgDdfO126NoIdPlfTneItstjhblGvCs5qp/5dd1694c1aa16aaf1cc74e8a27d89162_ethereum.glb'
    )
    return (
      <>
        <primitive object={gltf.scene} scale={1} />
      </>
    )
  }

  return (
    <>
      <Row justify='center'>
        <Col span={16} style={{ height: '75vh' }}>
          <Canvas>
            <ambientLight intensity={0.25} />
            <directionalLight position={[5, 5, 5]} />
            <Suspense fallback={null}>
              <Model />
              <OrbitControls />
            </Suspense>
          </Canvas>
        </Col>
      </Row>
    </>
  )
}

export default HomePage
