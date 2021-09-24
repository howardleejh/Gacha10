import { Row, Col, Form, Input, Button, Select, Upload, Layout } from 'antd'
import SideBar from '../../components/SideBar/SideBar'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './CreateStore.scss'

function CreateStore() {
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  let history = useHistory()

  const [form] = Form.useForm()

  const [userName, setUserName] = useState('')

  const { Content } = Layout

  const fileList = [
    // {
    //   uid: '-1',
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   thumbUrl:
    //     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-2',
    //   name: 'yyy.png',
    //   status: 'error',
    // },
  ]

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <Row justify='center'>
              <Col span={24}>
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
                    label='Store Name'
                    name='StoreName'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Store Name.',
                      },
                    ]}
                  >
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label='Select Collection'>
                    <Select style={{ textAlign: 'left' }}>
                      <Select.Option value='collection1'>
                        Collection 1
                      </Select.Option>
                      <Select.Option value='collection2'>
                        Collection 2
                      </Select.Option>
                      <Select.Option value='collection3'>
                        Collection 3
                      </Select.Option>
                      <Select.Option value='collection4'>
                        Collection 4
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label='Upload Store Image(s)'>
                    <Upload
                      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                      listType='picture'
                      defaultFileList={[...fileList]}
                      className='upload-list-inline'
                      maxCount={3}
                    >
                      <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item id='form-buttons' {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                      Create
                    </Button>
                    <Button htmlType='button' onClick={() => history.goBack()}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default CreateStore
