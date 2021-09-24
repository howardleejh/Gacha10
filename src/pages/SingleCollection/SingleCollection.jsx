import SideBar from '../../components/SideBar/SideBar'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
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
  Skeleton,
} from 'antd'
import { Link, useParams } from 'react-router-dom'
import { useMoralis } from 'react-moralis'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'

function SingleCollection() {
  const { Moralis } = useMoralis()

  const { Content } = Layout
  const { Meta } = Card

  const [collectionItems, setCollectionItems] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const auth = useContext(AuthContext)
  const user = auth.user

  const { collection } = useParams()

  let paramsName = collection.split('-').join(' ')

  console.log(collection.split('-').join(' '))

  useEffect(() => {
    const findCollectionItems = async () => {
      setIsLoading(true)

      const UserUploads = Moralis.Object.extend('UserUploads')
      const query = new Moralis.Query(UserUploads)
      query.equalTo('collectionName', paramsName)
      query.equalTo('owner_email', user.email)
      query.notEqualTo('isCollectionImg', true)

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
      console.log(resultsData[0])
      setCollectionItems(resultsData)
      setIsLoading(false)
      return
    }
    findCollectionItems()
  }, [])

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <Divider orientation='left'>Collection Items</Divider>
            <Skeleton active loading={isLoading}>
              {collectionItems ? (
                <>
                  <Space
                    size={[50, 50]}
                    wrap
                    direction='horizontal'
                    style={{ width: '100%' }}
                  >
                    {collectionItems.map((item) => (
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
                                </Space>
                              </p>
                            </>
                          }
                        />
                        <Row justify='center' style={{ paddingTop: '2vh' }}>
                          <Col>
                            <Button type='primary'>
                              <Link
                                to={`/collections/${collection}/${item.fileName}`}
                              >
                                Go to Item
                              </Link>
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Space>
                  <Row>
                    <Col>
                      <Pagination
                        defaultPageSize={3}
                        total={collectionItems.length}
                        hideOnSinglePage={true}
                        style={{ marginTop: '2vh' }}
                      />
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <h1>There is currently no collectionItems available</h1>
                </>
              )}
            </Skeleton>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default SingleCollection
