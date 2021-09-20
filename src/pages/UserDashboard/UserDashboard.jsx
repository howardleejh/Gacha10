import React, { useContext } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import SideBar from '../../components/SideBar/SideBar'
import { Layout, Statistic, Row, Col, Button, Card } from 'antd'
import { Pie } from '@ant-design/charts'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
import './UserDashboard.scss'

function UserDashboard() {
  const auth = useContext(AuthContext)

  const user = auth.user

  const ResponsiveGridLayout = WidthProvider(Responsive)
  const { Content } = Layout

  const DemoPie: React.FC = () => {
    var data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其他',
        value: 5,
      },
    ]
    const config = {
      autofit: true,
      data: data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      label: {
        type: 'inner',
        offset: '-30%',
        content: function content(_ref) {
          let percent = _ref.percent
          return ''.concat((percent * 100).toFixed(0), '%')
        },
        style: {
          fontSize: 14,
          textAlign: 'left',
        },
      },
      interactions: [{ type: 'element-active' }],
    }
    return <Pie {...config} />
  }

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content>
            <ResponsiveGridLayout
              className='dndLayout'
              useCSSTransforms={true}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 4, xs: 2, xxs: 1 }}
              rowHeight={150}
              containerPadding={{
                lg: [20, 20],
                md: [20, 20],
                sm: [20, 20],
                xs: [20, 20],
                xxs: [20, 20],
              }}
            >
              <div
                className='testbox'
                key='1'
                data-grid={{
                  x: 0,
                  y: 0,
                  w: 4,
                  h: 2,
                }}
                style={{ padding: '1vw' }}
              >
                <span className='dragTest'>Drag Here</span>
                {/* <Row gutter={16}>
                  <Col span={12}>
                    <Statistic title='Account' value={112893} />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title='Account Balance (CNY)'
                      value={112893}
                      precision={2}
                    />
                    <Button
                      style={{ marginTop: 16 }}
                      type='primary'
                      onClick={(e) => console.log('clicked')}
                    >
                      Recharge
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Statistic title='Active Users' value={112893} loading />
                  </Col>
                </Row> */}
              </div>
              <div
                className='testbox'
                key='2'
                data-grid={{ x: 4, y: 0, w: 4, h: 2 }}
                // style={{ padding: '1vw' }}
              >
                <DemoPie />
              </div>
            </ResponsiveGridLayout>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default UserDashboard
