import { Row, Col, Layout } from 'antd'
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
            <Row gutter={[16, 16]} align='center'>
              <Col span={8}>
                <div className='space-align-container'>
                  <button>
                    <Link to='/create/store'>Create New Store</Link>
                  </button>
                </div>
              </Col>
              <Col span={8}>
                <div className='space-align-container'>
                  <button>
                    <Link to='/create/collection'>Create New Collection</Link>
                  </button>
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
