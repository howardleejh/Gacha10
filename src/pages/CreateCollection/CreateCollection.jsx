import { Row, Col, Form, Input, Button, Upload, message, Layout } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import SideBar from '../../components/SideBar/SideBar'
import { useState } from 'react'
import './CreateCollection.scss'

function CreateCollection() {
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }
  const { Content } = Layout

  const [form] = Form.useForm()

  const [userName, setUserName] = useState('')

  const { Dragger } = Upload

  const props = {
    name: 'file',
    multiple: true,
    action:
      'https://745551244114425:ss00pVOl82CvR653HG2vl0j04Bs@api.cloudinary.com/v1_1/dgpk8awuz/upload',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

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
                    label='Collection Name'
                    name='collectionName'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Collection Name.',
                      },
                    ]}
                  >
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label='Description' name='collectionDesc'>
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label='Upload Assets'>
                    <Dragger {...props}>
                      <p className='ant-upload-drag-icon'>
                        <InboxOutlined />
                      </p>
                      <p className='ant-upload-text'>
                        Click or drag file to this area to upload
                      </p>
                    </Dragger>
                  </Form.Item>
                  <Form.Item id='form-buttons' {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                      Create
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
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default CreateCollection
