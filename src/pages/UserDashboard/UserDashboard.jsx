import React, { useContext } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import SideBar from '../../components/SideBar/SideBar'
import { Layout, Statistic, Row, Col, Button, Popover, Card, Table } from 'antd'
import { Pie, Column } from '@ant-design/charts'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
import './UserDashboard.scss'

function UserDashboard() {
  const auth = useContext(AuthContext)

  const user = auth.user

  console.log(user)

  const ResponsiveGridLayout = WidthProvider(Responsive)
  const { Content } = Layout

  // Pie Chart showing Store Profits
  const StoreProfits: React.FC = () => {
    let data = [
      {
        type: 'Store 1',
        value: 27,
      },
      {
        type: 'Store 2',
        value: 25,
      },
      {
        type: 'Store 3',
        value: 18,
      },
      {
        type: 'Store 4',
        value: 15,
      },
      {
        type: 'Store 5',
        value: 10,
      },
    ]
    const config = {
      autofit: true,
      data: data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.7,
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

  // Bar Chart showing favorite collections
  const FavoriteCollection: React.FC = () => {
    let data = [
      {
        type: 'Collection 1',
        value: 0.16,
      },
      {
        type: 'Collection 2',
        value: 0.125,
      },
      {
        type: 'Collection 3',
        value: 0.24,
      },
      {
        type: 'Collection 4',
        value: 0.19,
      },
      {
        type: 'Collection 5',
        value: 1,
      },
    ]
    let paletteSemanticRed = '#F4664A'
    let brandColor = '#5B8FF9'
    let config = {
      data: data,
      xField: 'type',
      yField: 'value',
      seriesField: '',
      color: function color(_ref) {
        let type = _ref.type
        if (type === '10-30分' || type === '30+分') {
          return paletteSemanticRed
        }
        return brandColor
      },
      label: {
        content: function content(originData) {
          let val = parseFloat(originData.value)
          if (val < 0.05) {
            return (val * 100).toFixed(1) + '%'
          }
        },
        offset: 10,
      },
      legend: false,
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
    }
    return <Column {...config} />
  }

  // Table showing all Blockchain Transactions
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 150,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ]

  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    })
  }

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content>
            <ResponsiveGridLayout
              className='dndLayout'
              isResizable={true}
              useCSSTransforms={true}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 1 }}
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
              >
                <Card title='USER DETAILS' bordered={false}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic title='Username' value={user.username} />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title='Account Balance (Eth)'
                        value={112893}
                        precision={2}
                      />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic title='Colections' value={112893} />
                    </Col>
                    <Col span={12}>
                      <Statistic title='Stores' value={112893} />
                    </Col>
                  </Row>
                  <Popover content={user.ethAddress} trigger='hover'>
                    <Button style={{ marginTop: '3vh', float: 'right' }}>
                      Wallet
                    </Button>
                  </Popover>
                </Card>
              </div>
              <div
                className='testbox'
                key='2'
                data-grid={{ x: 4, y: 0, w: 4, h: 2 }}
                style={{ padding: '2vh 4vw 0 0' }}
              >
                <StoreProfits />
              </div>
              <div
                className='testbox'
                key='3'
                data-grid={{ x: 8, y: 0, w: 4, h: 2 }}
              >
                <FavoriteCollection />
              </div>
              <div
                className='testbox'
                key='4'
                data-grid={{ x: 0, y: 2, w: 12, h: 4 }}
              >
                <Card title='Transactions' bordered={false}>
                  <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ y: 400 }}
                    pagination={false}
                  />
                </Card>
                <h1 style={{ float: 'right', padding: '0 2vw 0 0' }}>
                  Total Transactions: <span>{data.length}</span>
                </h1>
              </div>
            </ResponsiveGridLayout>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default UserDashboard
