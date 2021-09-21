import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
import SideBar from '../../components/SideBar/SideBar'
import { Layout } from 'antd'
import { useMoralis } from 'react-moralis'
import './UserCollections.scss'
import { set } from 'gl-vec2'

function UserCollections() {
  const { Moralis } = useMoralis()

  const auth = useContext(AuthContext)
  const user = auth.user

  const [findCollections, setFindCollections] = useState([])

  const findUserCollections = async () => {
    const UserCollections = Moralis.Object.extend('UserCollections')
    const query = new Moralis.Query(UserCollections)
    const results = await query.findAll()

    results.map((item) => {
      console.log(item.attributes)
      setFindCollections([...findCollections, item.attributes])
    })

    return console.log(findCollections)
  }

  const { Content } = Layout

  useEffect(() => {
    findUserCollections()
  }, [])

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <h1>this is collections page</h1>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default UserCollections
