import { useState } from 'react'
import { Row, Col, Form, Input, Button, Steps, message } from 'antd'
import { useMoralis } from 'react-moralis'
import './RegisterPage.scss'

function RegisterPage() {
  const { Step } = Steps

  const [form] = Form.useForm()

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const steps = [
    {
      title: 'First',
      content: 'some text',
    },
    {
      title: 'Second',
      content: (
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
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item id='form-buttons' {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
            <Button
              htmlType='button'
              onClick={() => console.log('go back to previous page')}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ]

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  return (
    <>
      <Row justify='center'>
        <Col span={16}>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className='steps-content'>{steps[current].content}</div>
          <div className='steps-action'>
            {current < steps.length - 1 && (
              <Button type='primary' disabled={true} onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type='primary'
                onClick={() => message.success('Processing complete!')}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default RegisterPage
