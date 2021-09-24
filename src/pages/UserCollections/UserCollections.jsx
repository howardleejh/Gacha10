import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../components/AuthProvider/AuthProvider'
import SideBar from '../../components/SideBar/SideBar'
import { Link } from 'react-router-dom'
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
import { useMoralis } from 'react-moralis'
import './UserCollections.scss'

function UserCollections() {
  const { Moralis } = useMoralis()

  const auth = useContext(AuthContext)
  const user = auth.user

  const { Meta } = Card

  const [collections, setCollections] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { Content } = Layout

  useEffect(() => {
    const findUserCollections = async () => {
      setIsLoading(true)
      const UserCollections = Moralis.Object.extend('UserCollections')
      const query = new Moralis.Query(UserCollections)
      query.equalTo('owner_email', user.email)

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

      setCollections(resultsData)
      setIsLoading(false)
      return
    }

    findUserCollections()
  }, [])

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <Divider orientation='left'>Collections</Divider>
            <Skeleton active loading={isLoading}>
              {collections ? (
                <>
                  <Space
                    size={[50, 50]}
                    wrap
                    direction='horizontal'
                    style={{ width: '100%' }}
                  >
                    {collections.map((item) => (
                      <Card
                        hoverable
                        loading={isLoading}
                        style={{ width: 350, height: 400 }}
                        cover={
                          <Image
                            // width={200}
                            loading={isLoading}
                            height={200}
                            src={item.collectionImg.url}
                            fallback='http://via.placeholder.com/1920x1080'
                          />
                        }
                      >
                        <Meta
                          title={item.collectionName}
                          description={
                            <>
                              <p>{item.collectionDesc}</p>
                              <p>
                                <span>Created: </span>
                                {item.createdAt.toLocaleString().split(',')[0]}
                              </p>
                            </>
                          }
                        />
                        <Row justify='center' style={{ paddingTop: '2vh' }}>
                          <Col>
                            <Button type='primary'>
                              <Link to={`/collections/${item.collectionSlug}`}>
                                Go to Collection
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
                        total={collections.length}
                        hideOnSinglePage={true}
                        style={{ marginTop: '2vh' }}
                      />
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <h1>There is currently no collections available</h1>
                </>
              )}
            </Skeleton>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default UserCollections
