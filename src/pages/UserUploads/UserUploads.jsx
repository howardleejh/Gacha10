import './UserUploads.scss'
import SideBar from '../../components/SideBar/SideBar'
import { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import {
  Layout,
  Divider,
  Button,
  Space,
  Card,
  Col,
  Row,
  Image,
  Pagination,
  Select,
  Skeleton,
} from 'antd'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function UserUploads() {
  const { Content } = Layout
  const { Moralis } = useMoralis()

  const [uploads, setUploads] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const { Meta } = Card

  const { Option } = Select

  const findUserUploads = async () => {
    setIsLoading(true)
    const UserUploads = Moralis.Object.extend('UserUploads')
    const query = new Moralis.Query(UserUploads)

    let results = null

    try {
      results = await query.findAll()
    } catch (err) {
      return console.log(err)
    }
    let resultsData = []

    results.forEach((item) => {
      resultsData.push(item.attributes)
    })

    setUploads(resultsData)
    console.log(resultsData)
    setIsLoading(false)
    return
  }

  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  useEffect(() => {
    findUserUploads()
  }, [])

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <Divider orientation='left'>Uploads</Divider>
            <Skeleton active loading={isLoading}>
              {uploads ? (
                <>
                  <Row style={{ marginBottom: '2vh' }}>
                    <Col>
                      <p>
                        Filter Collections:
                        <span style={{ paddingLeft: '1vw' }}>
                          <Select
                            defaultValue='lucy'
                            style={{ width: 120 }}
                            onChange={handleChange}
                          >
                            {uploads.map((item) => (
                              <Option value={item.collectionName}>
                                {item.collectionName}
                              </Option>
                            ))}
                          </Select>
                        </span>
                      </p>
                    </Col>
                  </Row>
                  <Space
                    size={[50, 50]}
                    wrap
                    direction='horizontal'
                    style={{ width: '100%' }}
                  >
                    {uploads.map((item) => (
                      <Card
                        hoverable
                        loading={isLoading}
                        style={{ width: 350, height: 400 }}
                        cover={
                          <Image
                            // width={200}
                            loading={isLoading}
                            height={200}
                            src={item.fileUrl}
                            fallback='http://via.placeholder.com/1920x1080'
                          />
                        }
                      >
                        <Meta
                          title={item.source.file.name}
                          description={
                            <>
                              <p>Collection: {item.collectionName}</p>
                              <p>
                                <Space>
                                  Mint Status:
                                  {item.minted === 'minted' ? (
                                    <CheckCircleTwoTone twoToneColor='#52c41a' />
                                  ) : (
                                    <CloseCircleTwoTone twoToneColor='#DC143C' />
                                  )}
                                  Collection Image:
                                  {item.isCollectionImg ? (
                                    <CheckCircleTwoTone twoToneColor='#52c41a' />
                                  ) : (
                                    <CloseCircleTwoTone twoToneColor='#DC143C' />
                                  )}
                                </Space>
                              </p>
                            </>
                          }
                        />
                        <Row justify='center' style={{ paddingTop: '2vh' }}>
                          <Col>
                            <Button type='primary'>Mint this item!</Button>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Space>
                  <Row>
                    <Col>
                      <Pagination
                        defaultPageSize={3}
                        total={uploads.length}
                        hideOnSinglePage={true}
                        style={{ marginTop: '2vh' }}
                      />
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <h1>There is currently no uploads available</h1>
                </>
              )}
            </Skeleton>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default UserUploads
