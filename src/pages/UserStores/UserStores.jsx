import SideBar from '../../components/SideBar/SideBar'
import { Layout } from 'antd'
import './UserStores.scss'

function UserStores() {
  const { Content } = Layout

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <h1>this is a user stores page</h1>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default UserStores
