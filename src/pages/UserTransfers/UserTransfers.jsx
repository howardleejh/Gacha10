import SideBar from '../../components/SideBar/SideBar'
import {
  Layout,
  Divider,
  Card,
  Row,
  Col,
  Statistic,
  Popover,
  Button,
  Input,
  Form,
  Modal,
} from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'
import './UserTransfers.scss'

function UserTransfers() {
  const { Content } = Layout
  const { Moralis } = useMoralis()
  const { Meta } = Card
  const auth = useContext(AuthContext)
  const user = auth.user
  const metaUser = auth.metaUser
  const [form] = Form.useForm()
  const notify = (message) => toast.dark(message)

  const [userBalance, setUserBalance] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const findBalance = async () => {
    let balance = null

    const options = {
      chain: 'ropsten',
      address: user.ethAddress,
      order: 'desc',
      from_block: '0',
    }
    try {
      balance = await Moralis.Web3API.account.getNativeBalance(options)
    } catch (err) {
      return console.log(err)
    }
    let balanceAmt = parseFloat(balance.balance / Math.pow(10, 18)).toFixed(2)

    setUserBalance(balanceAmt)
    return
  }

  const onFinish = async (values) => {
    setIsLoading(true)

    const options = {
      type: 'native',
      amount: Moralis.Units.ETH(values.amount),
      receiver: values.ethAdd,
    }

    let results = null

    try {
      results = await Moralis.transfer(options)
    } catch (err) {
      setModalMessage(err)
      return
    }
    setModalMessage('Transaction is successful!')
    showModal()

    setIsLoading(false)
    return
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  useEffect(() => {
    findBalance()
  }, [userBalance])

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <Divider orientation='left'>Transfer Ethereum</Divider>
            <Row>
              <Col span={16} offset={5}>
                <Card style={{ width: '35vw', height: '45vh' }}>
                  <Meta
                    title={
                      <>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Statistic title='Username' value={user.username} />
                          </Col>
                          <Col span={12}>
                            <Statistic
                              title='Account Balance (ETH)'
                              value={userBalance}
                              precision={2}
                            />
                          </Col>
                        </Row>
                        <Popover
                          content={user.ethAddress}
                          trigger='hover'
                          placement='bottom'
                        >
                          <Button style={{ marginTop: '1vh' }}>Wallet</Button>
                        </Popover>
                      </>
                    }
                    description={
                      <>
                        <Row justify='center'>
                          <Col span={12}>
                            <Form
                              form={form}
                              labelCol={{ span: 8 }}
                              wrapperCol={{ span: 24 }}
                              labelAlign='left'
                              id='register-form'
                              name='registerForm'
                              initialValues={{ remember: true }}
                              onFinish={onFinish}
                            >
                              <Form.Item
                                label='To Address'
                                name='ethAdd'
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please provide your username!',
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                label='Amount'
                                name='amount'
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please provide your username!',
                                  },
                                ]}
                              >
                                <Input
                                  prefix={<i class='fab fa-ethereum'></i>}
                                  suffix='ETH'
                                />
                              </Form.Item>
                              <Form.Item style={{ float: 'right' }}>
                                <Button
                                  type='primary'
                                  loading={isLoading}
                                  htmlType='submit'
                                >
                                  Confirm
                                </Button>
                                <Button type='default' loading={isLoading}>
                                  Cancel
                                </Button>
                              </Form.Item>
                            </Form>
                          </Col>
                          <Col>
                            <>
                              <p>
                                Please select the right Metamask Account before
                                Transaction.
                              </p>
                            </>
                          </Col>
                        </Row>
                      </>
                    }
                  />
                </Card>
              </Col>
            </Row>
            <Modal
              title='Transaction Status'
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {modalMessage}
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default UserTransfers
