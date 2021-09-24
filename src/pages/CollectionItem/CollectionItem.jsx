import './CollectionItem.scss'
import SideBar from '../../components/SideBar/SideBar'
import ThreeFiber from '../../components/ThreeFiber/ThreeFiber'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
import { useMoralis } from 'react-moralis'
import { useState, useEffect, useContext } from 'react'
import {
  Layout,
  Divider,
  Button,
  Space,
  Card,
  Col,
  Row,
  Image,
  Pagination,
  Skeleton,
} from 'antd'
import { Canvas, useLoader } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense } from 'react'

function CollectionItem() {
  const { Moralis } = useMoralis()

  let { collectionItem } = useParams()

  const { Content } = Layout

  const auth = useContext(AuthContext)
  const user = auth.user

  console.log(collectionItem)

  const [isLoading, setIsLoading] = useState(false)
  const [item, setItem] = useState(null)

  const Model = () => {
    const gltf = useLoader(GLTFLoader, item.fileUrl)
    return (
      <>
        <primitive object={gltf.scene} scale={1} />
      </>
    )
  }

  useEffect(() => {
    setIsLoading(true)
    const findOneItem = async () => {
      setIsLoading(true)

      const UserUploads = Moralis.Object.extend('UserUploads')
      const query = new Moralis.Query(UserUploads)
      query.equalTo('fileName', collectionItem)
      // query.equalTo('owner_email', user.email)
      // query.notEqualTo('isCollectionImg', true)

      let results = null

      try {
        results = await query.first()
      } catch (err) {
        return console.log(err)
      }
      return setItem(results.attributes)
    }
    findOneItem()
    console.log(item.fileUrl)
    setIsLoading(false)
  }, [])

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <Divider loading={isLoading} orientation='left'>
              {item.source.file.name}
            </Divider>
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[100, 50, 35]} />
              <Suspense fallback={null}>
                <Model />
                {/* <OrbitControls /> */}
              </Suspense>
            </Canvas>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
export default CollectionItem
