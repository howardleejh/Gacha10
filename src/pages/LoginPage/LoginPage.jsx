import { Row, Col, Form, Input, Button, Divider, Space } from 'antd'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import './LoginPage.scss'

function LoginPage() {
  let history = useHistory()

  const auth = useContext(AuthContext)
  const user = auth.user
  const metaUser = auth.metaUser

  const [form] = Form.useForm()

  const notify = (message) => toast.dark(message)

  useEffect(() => {
    localStorage.clear()
  }, [])

  async function OnFinish(values) {
    const userDetails = {
      email: values.email.trim(),
      password: values.password.trim(),
    }
    try {
      await auth.login(userDetails.email, userDetails.password)
    } catch (err) {
      console.log(err)
      return notify('Unable to log in, please try again')
    }
    history.push('/dashboard')
    return
  }

  return (
    <>
      <Row justify='center'>
        <Col span={16}>
          <Divider orientation='left'>Log In</Divider>
          <Form
            form={form}
            id='login-form'
            name='loginForm'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={OnFinish}
          >
            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item align='center'>
              <Space>
                <Button type='primary' htmlType='submit'>
                  Login
                </Button>
                <Button>
                  <Link to={'/'}> Go Back </Link>
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default LoginPage
