import { Row, Col, Layout, Divider, Button } from 'antd'
import { Link } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar'
import React, { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import './CreatePage.scss'

function CreatePage() {
  const { Content } = Layout

  const Store = () => {
    const gltf = useLoader(GLTFLoader, '/dragonShop.glb')
    return (
      <>
        <primitive object={gltf.scene} scale={1} />
      </>
    )
  }
  const Collection = () => {
    const gltf = useLoader(GLTFLoader, '/books.glb')
    return (
      <>
        <primitive object={gltf.scene} scale={1} />
      </>
    )
  }

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <Divider orientation='left'>Create</Divider>
            <Row gutter={[24, 12]}>
              <Col span={8} offset={3}>
                <div className='space-align-container'>
                  <Col
                    style={{ width: '100%', height: '85%', paddingTop: '3vh' }}
                  >
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5.5] }}>
                      <ambientLight intensity={1} />
                      <Suspense fallback={null}>
                        <Store />
                        <ContactShadows
                          rotation-x={Math.PI / 2}
                          position={[0, -0.65, 0]}
                          opacity={0.35}
                          width={5}
                          height={5}
                          blur={3}
                          far={1.1}
                        />
                      </Suspense>
                      <OrbitControls
                        autoRotate={true}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2.3}
                        maxPolarAngle={Math.PI / 2.3}
                      />
                    </Canvas>
                  </Col>
                  <Row justify='center' style={{ marginTop: '1vh' }}>
                    <Col>
                      <Button type='primary'>
                        <Link to='/create/store'>Create New Store</Link>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={8}>
                <div className='space-align-container'>
                  <Col
                    style={{ width: '100%', height: '85%', paddingTop: '3vh' }}
                  >
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3.5] }}>
                      <ambientLight intensity={1} />
                      <Suspense fallback={null}>
                        <Collection />
                        <ContactShadows
                          rotation-x={Math.PI / 2}
                          position={[0, -0.65, 0]}
                          opacity={0.35}
                          width={5}
                          height={5}
                          blur={3}
                          far={1.1}
                        />
                      </Suspense>
                      <OrbitControls
                        autoRotate={true}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2.3}
                        maxPolarAngle={Math.PI / 2.3}
                      />
                    </Canvas>
                  </Col>
                  <Row justify='center' style={{ marginTop: '1vh' }}>
                    <Col>
                      <Button type='primary'>
                        <Link to='/create/collection'>
                          Create New Collection
                        </Link>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default CreatePage
