import { Row, Col, Layout, Divider, Button } from 'antd'
import { Link } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar'
import './CreatePage.scss'

function CreatePage() {
  const { Content } = Layout

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
                  <Button type='primary'>
                    <Link to='/create/store'>Create New Store</Link>
                  </Button>
                </div>
              </Col>
              <Col span={8}>
                <div className='space-align-container'>
                  <Button type='primary'>
                    <Link to='/create/collection'>Create New Collection</Link>
                  </Button>
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
