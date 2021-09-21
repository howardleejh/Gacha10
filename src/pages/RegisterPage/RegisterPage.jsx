import { useContext, useState, useEffect } from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Steps,
  Space,
  Divider,
  Typography,
  Collapse,
} from 'antd'
import { useHistory } from 'react-router-dom'
import { DownloadOutlined } from '@ant-design/icons'
import { useMoralis } from 'react-moralis'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-toastify'
import './RegisterPage.scss'

function RegisterPage() {
  const { Moralis } = useMoralis()
  const { Text } = Typography
  const { Step } = Steps

  const notify = (message) => toast.dark(message)

  const auth = useContext(AuthContext)
  const user = auth.user

  const { Panel } = Collapse
  const [form] = Form.useForm()

  const [activePanel, setActivePanel] = useState(1)
  const [btnDisabled, setBtnDisabled] = useState(false)

  async function CreateUser(username, email, confirmPass) {
    let history = useHistory()

    try {
      await Moralis.User.current()
    } catch (err) {
      return notify('User cannot be found')
    }
    try {
      user.set('username', username)
      user.set('email', email)
      user.set('password', confirmPass)
    } catch (err) {
      notify('create user failed')
      return
    }
    user.save()
    history.push('/dashboard')
    return
  }

  function onFinish(values) {
    if (values.password !== values.confirmPass) {
      notify('Password does not match')
      return
    }

    const userDetails = {
      username: values.username.trim(),
      email: values.email.trim(),
      confirmPass: values.confirmPass.trim(),
    }
    CreateUser(userDetails.username, userDetails.email, userDetails.confirmPass)
  }

  function onNext() {
    if (activePanel === 3) {
      return
    } else if (activePanel === 2) {
      if (!user) {
        setBtnDisabled(true)
        return
      }
    }
    setActivePanel(activePanel + 1)
  }

  function MetaAuth() {
    auth.metamaskAuth()
    setBtnDisabled(false)
  }

  useEffect(() => {
    auth.userCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <Row justify='center'>
        <Col span={16}>
          <Steps direction='vertical' current={activePanel - 1}>
            <Step
              title='INSTALL METAMASK'
              description={
                <Collapse accordion ghost activeKey={activePanel}>
                  <Panel showArrow={false} key='1'>
                    <div style={{ textAlign: 'center' }}>
                      <Row justify='center'>
                        <Col span={12}>
                          <h3 style={{ padding: '1vw' }}>
                            To install Metamask, please click the following:
                          </h3>
                        </Col>
                      </Row>
                      <Row justify='center'>
                        <Col span={12}>
                          <Space>
                            {!isMobile ? (
                              <>
                                <Button
                                  type='primary'
                                  href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
                                  target='_blank'
                                  shape='round'
                                  icon={<DownloadOutlined />}
                                >
                                  Chrome
                                </Button>
                                <Button
                                  type='primary'
                                  href='https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
                                  target='_blank'
                                  shape='round'
                                  icon={<DownloadOutlined />}
                                >
                                  Firefox
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  type='primary'
                                  href='https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&ref=producthunt&_branch_match_id=967814495376942741'
                                  target='_blank'
                                  shape='round'
                                  icon={<DownloadOutlined />}
                                >
                                  Android
                                </Button>
                                <Button
                                  type='primary'
                                  href='https://apps.apple.com/us/app/metamask/id1438144202?_branch_match_id=967814495376942741'
                                  target='_blank'
                                  shape='round'
                                  icon={<DownloadOutlined />}
                                >
                                  iOS
                                </Button>
                              </>
                            )}
                          </Space>
                        </Col>
                      </Row>
                      <Row justify='end' style={{ marginTop: '2vh' }}>
                        <Col span={12}>
                          <Button
                            type='primary'
                            ghost
                            onClick={onNext}
                            disabled={btnDisabled}
                          >
                            Next
                          </Button>
                        </Col>
                      </Row>
                      <Divider />
                    </div>
                  </Panel>
                </Collapse>
              }
            />
            <Step
              title='Authenticate Metamask'
              description={
                <Collapse accordion ghost activeKey={activePanel}>
                  <Panel showArrow={false} key='2'>
                    <div style={{ textAlign: 'center' }}>
                      <Row justify='center'>
                        <Col span={12}>
                          {user ? (
                            <div style={{ padding: '1vw' }}>
                              <h4>Your Metamask account is:</h4>
                              <Text italic>{user.ethAddress}</Text>
                            </div>
                          ) : (
                            <h3 style={{ padding: '1vw' }}>
                              Once Metamask is installed, please authenticate:
                            </h3>
                          )}
                        </Col>
                      </Row>
                      <Row justify='center'>
                        <Col span={12}>
                          <Space>
                            <Button type='primary' onClick={MetaAuth}>
                              Authenticate
                            </Button>
                          </Space>
                        </Col>
                      </Row>
                      <Row justify='end' style={{ marginTop: '2vh' }}>
                        <Col span={12}>
                          <Button
                            type='primary'
                            ghost
                            onClick={onNext}
                            disabled={btnDisabled}
                          >
                            Next
                          </Button>
                        </Col>
                      </Row>
                      <Divider />
                    </div>
                  </Panel>
                </Collapse>
              }
            />
            <Step
              title='Completed'
              description={
                <Collapse accordion ghost activeKey={activePanel}>
                  <Panel showArrow={false} key='3'>
                    <div style={{ textAlign: 'center' }}>
                      <Row>
                        <Col span={12} offset={4}>
                          <Form
                            form={form}
                            id='register-form'
                            name='registerForm'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                          >
                            <Form.Item
                              label='Username'
                              name='username'
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
                              label='Email'
                              name='email'
                              rules={[
                                {
                                  required: true,
                                  message: 'Please provide your email!',
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label='Password'
                              name='password'
                              rules={[
                                {
                                  required: true,
                                  message: 'Please provide your password!',
                                },
                              ]}
                            >
                              <Input.Password />
                            </Form.Item>
                            <Form.Item
                              label='Confirm Password'
                              name='confirmPass'
                              rules={[
                                {
                                  required: true,
                                  message: 'Please provide your password!',
                                },
                              ]}
                            >
                              <Input.Password />
                            </Form.Item>
                            <Form.Item style={{ float: 'right' }}>
                              <Button type='primary' htmlType='submit'>
                                Submit
                              </Button>
                            </Form.Item>
                          </Form>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                </Collapse>
              }
            />
          </Steps>
        </Col>
      </Row>
    </>
  )
}

export default RegisterPage
