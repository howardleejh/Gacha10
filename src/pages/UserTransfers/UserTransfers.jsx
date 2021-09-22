import SideBar from '../../components/SideBar/SideBar'
import { Layout } from 'antd'
import './UserTransfers.scss'

function UserTransfers() {
  const { Content } = Layout

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <h1>this is a eth transfer page</h1>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default UserTransfers
