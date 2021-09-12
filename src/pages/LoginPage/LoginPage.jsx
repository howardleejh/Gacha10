import { Row, Col, Form, Input, Button } from 'antd'
import { useState } from 'react'
import './LoginPage.scss'

function LoginPage() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  const [form] = Form.useForm()

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
            onFinish={() => console.log('finished')}
          >
            <Form.Item
              label='Username'
              name='username'
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item id='form-buttons' {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                Login
              </Button>
              <Button
                htmlType='button'
                onClick={() => console.log('go back to previous page')}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default LoginPage
