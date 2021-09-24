import React, { useContext, useState, useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import SideBar from '../../components/SideBar/SideBar'
import {
  Layout,
  Statistic,
  Row,
  Col,
  Button,
  Popover,
  Card,
  Table,
  Divider,
  Skeleton,
  Spin,
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Pie, Column } from '@ant-design/charts'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
import { useMoralis } from 'react-moralis'
import './UserDashboard.scss'

function UserDashboard() {
  const { Moralis } = useMoralis()

  const auth = useContext(AuthContext)

  const user = auth.user

  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0)
  const [collectionCount, setCollectionCount] = useState(0)
  const [storeCount, setStoreCount] = useState(0)

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
          textAlign: 'center',
          width: '100%',
          height: '90%',
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
      style: {
        paddingTop: '5%',
        width: '100%',
        height: '90%',
      },
    }
    return <Column {...config} />
  }

  // Table showing all Blockchain Transactions
  const columns = [
    {
      title: 'Block',
      dataIndex: 'block',
      width: 120,
    },
    {
      title: 'Hash',
      dataIndex: 'hash',
      width: 120,
    },
    {
      title: 'From',
      dataIndex: 'sent',
    },
    {
      title: 'To',
      dataIndex: 'received',
    },
    {
      title: 'Gas Price (ETH)',
      dataIndex: 'gas',
      width: 150,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: 150,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      width: 150,
    },
  ]

  const data = []
  for (let i = 0; i < transactions.length; i++) {
    data.push({
      key: i,
      block: transactions[i].block_number,
      hash: (
        <Popover content={transactions[i].hash} trigger='hover'>
          <Button>Hash</Button>
        </Popover>
      ),
      sent: transactions[i].from_address,
      received: transactions[i].to_address,
      gas: parseFloat(transactions[i].gas_price / Math.pow(10, 18)).toFixed(10),
      value: parseFloat(transactions[i].value / Math.pow(10, 18)).toFixed(2),
      timestamp: transactions[i].block_timestamp,
    })
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  useEffect(() => {
    setIsLoading(true)
    const options = {
      chain: 'ropsten',
      address: user.ethAddress,
      order: 'desc',
      from_block: '0',
    }

    const findTransactions = async () => {
      let transactions = null

      try {
        transactions = await Moralis.Web3API.account.getTransactions(options)
      } catch (err) {
        return console.log(err)
      }

      if (transactions.result.length === 0) {
        return console.log('no transactions yet')
      }

      let results = transactions.result

      console.log(transactions.result[0])
      setTransactions(results)
      return
    }

    const findBalance = async () => {
      let balance = null
      try {
        balance = await Moralis.Web3API.account.getNativeBalance(options)
      } catch (err) {
        return console.log(err)
      }
      return setBalance(
        parseFloat(balance.balance / Math.pow(10, 18)).toFixed(2)
      )
    }

    const findCollections = async () => {
      const UserCollections = Moralis.Object.extend('UserCollections')
      const query = new Moralis.Query(UserCollections)
      query.equalTo('owner_email', user.email)

      let results = null

      try {
        results = await query.count()
      } catch (err) {
        return console.log(err)
      }
      return setCollectionCount(results)
    }
    const findStores = async () => {
      // const UserCollections = Moralis.Object.extend('UserCollections')
      // const query = new Moralis.Query(UserCollections)
      // query.equalTo('owner_email', user.email)

      // let results = null

      // try {
      //   results = await query.count()
      // } catch (err) {
      //   return console.log(err)
      // }
      // return setCollectionCount(results)
      return
    }

    findTransactions()
    findCollections()
    findBalance()
    setIsLoading(false)
  }, [])

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content>
            <Divider orientation='left'>Dashboard</Divider>
            <Skeleton active loading={isLoading}>
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
                  className='stat-box'
                  key='1'
                  data-grid={{
                    x: 0,
                    y: 0,
                    w: 4,
                    h: 2,
                  }}
                >
                  <Card
                    style={{ background: 'transparent' }}
                    title='USER DETAILS'
                    bordered={false}
                    loading={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spin indicator={antIcon} spinning={true} />
                      </>
                    ) : (
                      <>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Statistic title='Username' value={user.username} />
                          </Col>
                          <Col span={12}>
                            <Statistic
                              title='Account Balance (ETH)'
                              value={balance}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Statistic
                              title='Colections'
                              value={collectionCount}
                            />
                          </Col>
                          <Col span={12}>
                            <Statistic title='Stores' value={storeCount} />
                          </Col>
                        </Row>
                        <Popover content={user.ethAddress} trigger='hover'>
                          <Button style={{ marginTop: '3vh', float: 'right' }}>
                            Wallet
                          </Button>
                        </Popover>
                      </>
                    )}
                  </Card>
                </div>
                <div
                  className='stat-box'
                  key='2'
                  data-grid={{ x: 4, y: 0, w: 4, h: 2 }}
                  style={{ padding: '2vh 4vw 0 0' }}
                >
                  <StoreProfits loading={isLoading} />
                </div>
                <div
                  className='stat-box'
                  key='3'
                  data-grid={{ x: 8, y: 0, w: 4, h: 2 }}
                >
                  <FavoriteCollection loading={isLoading} />
                </div>
                <div
                  className='stat-box'
                  key='4'
                  data-grid={{ x: 0, y: 2, w: 12, h: 3 }}
                >
                  <Card
                    title='Transactions'
                    bordered={false}
                    style={{ background: 'transparent' }}
                  >
                    <Table
                      style={{ background: 'transparent' }}
                      columns={columns}
                      dataSource={data}
                      scroll={{ y: 240 }}
                      pagination={false}
                      loading={isLoading}
                    />
                  </Card>
                  <h1 style={{ float: 'right', padding: '.5vw' }}>
                    Total Transactions: <span>{data.length}</span>
                  </h1>
                </div>
              </ResponsiveGridLayout>
            </Skeleton>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default UserDashboard
