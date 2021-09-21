import { Row, Col, Form, Input, Button } from 'antd'
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

  const tailLayout = {
    wrapperCol: { offset: 12, span: 8 },
  }

  const [form] = Form.useForm()

  const notify = (message) => toast.dark(message)

  async function OnFinish(values) {
    const userDetails = {
      email: values.email.trim(),
      password: values.password.trim(),
    }
    try {
      await auth.login(userDetails.email, userDetails.password)
    } catch (err) {
      return notify('Unable to log in, please try again')
    }
    history.push('/dashboard')
  }

  useEffect(() => {
    auth.userCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <Row justify='center'>
        <Col span={16}>
          <Form
            form={form}
            id='register-form'
            name='registerForm'
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
            <Form.Item id='form-buttons' {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                Login
              </Button>
              <Button htmlType='button'>
                <Link to={'/'}> Cancel </Link>
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default LoginPage
