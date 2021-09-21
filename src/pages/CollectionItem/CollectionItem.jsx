import SideBar from '../../components/SideBar/SideBar'
import { Layout } from 'antd'

function CollectionItem() {
  const { Content } = Layout

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <h1>this is a collection item page</h1>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default CollectionItem
