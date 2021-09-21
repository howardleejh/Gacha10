import { Row, Col, Form, Input, Button, Upload, Layout } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useMoralis } from 'react-moralis'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
import SideBar from '../../components/SideBar/SideBar'
import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import './CreateCollection.scss'

function CreateCollection() {
  const { Moralis } = useMoralis()

  let history = useHistory()

  const auth = useContext(AuthContext)
  const user = auth.user

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }
  const { Content } = Layout

  const { TextArea } = Input

  const [form] = Form.useForm()

  const [collectionName, setCollectionName] = useState('')
  const [collectionDesc, setcollectionDesc] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { Dragger } = Upload

  const notify = (message) => toast.dark(message)

  async function uploadFile(file) {
    const name = file.name

    const fileUpload = new Moralis.File(name, file)

    let resp = null
    // trying to upload file to moralis servers
    try {
      resp = await fileUpload.save()
    } catch (err) {
      notify('Upload to server failed.')
    }
    // creating referencing to Moralis Database
    const UserUpload = Moralis.Object.extend('UserUploads')
    const userUpload = new UserUpload()
    try {
      await userUpload.save({
        owner: user.username,
        owner_email: user.email,
        collectionName: collectionName,
        fileName: resp._name,
        fileUrl: resp._url,
        source: resp._source,
      })
    } catch (err) {
      notify('Upload Reference failed.')
      return
    }
    notify('Uploaded success!')
    return
  }

  const onFinish = async (values) => {
    setIsLoading(true)
    const CreateUserCollection = Moralis.Object.extend('UserCollections')
    const query = new Moralis.Query(CreateUserCollection)
    query.equalTo('collectionName', collectionName)
    const results = await query.first()

    if (results) {
      setIsLoading(false)
      notify('There is already an existing Collection.')
      return
    }

    const createUserCollection = new CreateUserCollection()

    try {
      await createUserCollection.save({
        owner: user.username,
        owner_email: user.email,
        collectionName: collectionName,
        collectionDesc: collectionDesc,
      })
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
    return notify('Collection is successfully created!')
  }

  const props = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => uploadFile(file),
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
                  onFinish={onFinish}
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
                      onChange={(e) => setCollectionName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label='Description' name='collectionDesc'>
                    <TextArea
                      rows={2}
                      onChange={(e) => setcollectionDesc(e.target.value)}
                    />
                  </Form.Item>
                  {collectionName && collectionDesc ? (
                    <>
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
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Item id='form-buttons' {...tailLayout}>
                    <Button
                      type='primary'
                      htmlType='submit'
                      loading={isLoading}
                    >
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

export default CreateCollection
