import { Row, Col, Form, Input, Button, Upload, Layout } from 'antd'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
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
  const [collectionDesc, setCollectionDesc] = useState('')
  const [isCollectionImg, setIsCollectionImg] = useState(true)
  const [collectionImg, setCollectionImg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { Dragger } = Upload

  const notify = (message) => toast.dark(message)

  const profilePicUpload = []

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
        isCollectionImg: isCollectionImg,
        minted: 'not minted',
      })
    } catch (err) {
      notify('Upload Reference failed.')
      return
    }
    notify('Upload success!')
    setCollectionImg(resp._url)
    setIsCollectionImg(false)
  }

  const onFinish = async (values) => {
    setIsLoading(true)
    const CreateUserCollection = Moralis.Object.extend('UserCollections')
    const query = new Moralis.Query(CreateUserCollection)
    query.equalTo('collectionName', collectionName)

    let results = null

    try {
      results = await query.first()
    } catch (err) {
      return console.log(err)
    }

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
        collectionImg: {
          url: collectionImg,
        },
        collectionSlug: collectionName.trim().split(' ').join('-'),
      })
    } catch (err) {
      return console.log(err)
    }
    setIsLoading(false)
    return notify('Collection is successfully created!')
  }

  const props = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => uploadFile(file),
    onClick: () => setIsCollectionImg(false),
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
                      onChange={(e) => setCollectionDesc(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label='Collection Image'>
                    <Upload
                      action={(file) => {
                        let uploaded = uploadFile(file)
                        setCollectionImg(uploaded)
                        console.log(uploaded)
                        return
                      }}
                      listType='picture'
                      defaultFileList={[...profilePicUpload]}
                      className='upload-list-inline'
                      onClick={() => {
                        setIsCollectionImg(true)
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                  {collectionName && collectionDesc ? (
                    <>
                      <Form.Item label='Assets'>
                        <Dragger {...props}>
                          <p className='ant-upload-drag-icon'>
                            <InboxOutlined />
                          </p>
                          <p className='ant-upload-text'>
                            Click or drag file to this area to upload
                          </p>
                          <p className='ant-upload-hint'>
                            Please rename your assets accordingly
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
