import './CollectionItem.scss'
import SideBar from '../../components/SideBar/SideBar'
import { useParams } from 'react-router-dom'
import { useMoralis } from 'react-moralis'
import { useState, useEffect } from 'react'
import ThreeFiber from '../../components/ThreeFiber/ThreeFiber'
import {
  Layout,
  Divider,
  Row,
  Col,
  Spin,
  Descriptions,
  Skeleton,
  Button,
} from 'antd'
import { useHistory } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

function CollectionItem() {
  const { Moralis } = useMoralis()

  let { collectionItem } = useParams()

  let history = useHistory()

  const { Content } = Layout

  const [isLoading, setIsLoading] = useState(false)
  const [item, setItem] = useState(null)

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  useEffect(() => {
    setIsLoading(true)
    const findOneItem = async () => {
      const UserUploads = Moralis.Object.extend('UserUploads')
      const query = new Moralis.Query(UserUploads)
      query.equalTo('fileName', collectionItem)
      // query.equalTo('owner_email', user.email)
      // query.notEqualTo('isCollectionImg', true)

      let results = null

      try {
        results = await query.first()
      } catch (err) {
        return console.log(err)
      }
      console.log(results.attributes)
      return setItem(results.attributes)
    }
    findOneItem()
    setIsLoading(false)
  }, [])

  return (
    <>
      <Layout>
        <SideBar />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <Divider loading={isLoading} orientation='left'>
              {item ? item.source.file.name : ''}
            </Divider>
            <Row>
              <Col span={10} className='item-container'>
                {!item ? (
                  <>
                    <Spin indicator={antIcon} />
                  </>
                ) : (
                  <>
                    <ThreeFiber
                      item={item.fileUrl}
                      autoRotate={true}
                      zoom={true}
                    />
                  </>
                )}
              </Col>
              <Col span={10} offset={1}>
                <Descriptions
                  title='Item Info'
                  layout='vertical'
                  bordered
                  justify='center'
                  className='item-container'
                  style={{ paddingTop: '5vh' }}
                >
                  {!item ? (
                    <Skeleton active loading={isLoading} />
                  ) : (
                    <>
                      <Descriptions.Item label='Product'>
                        {'' || item.source.file.name}
                      </Descriptions.Item>
                      <Descriptions.Item label='Size'>
                        {'' || item.source.file.size}
                      </Descriptions.Item>
                      <Descriptions.Item label='Minted?'>
                        {'' || item.minted}
                      </Descriptions.Item>
                      <Descriptions.Item label='Collection' span={2}>
                        {'' || item.collectionName}
                      </Descriptions.Item>
                      <Descriptions.Item label='Owner' span={3}>
                        {'' || item.owner}
                      </Descriptions.Item>
                      <Descriptions.Item label='Value'>
                        ETH 7.00
                      </Descriptions.Item>
                      <Descriptions.Item label='Quantity'>
                        6345
                      </Descriptions.Item>
                      <Descriptions.Item label='Rarity'>Rare</Descriptions.Item>
                      <Descriptions.Item>
                        <Button type='primary' onClick={() => history.goBack()}>
                          Back to Collection
                        </Button>
                      </Descriptions.Item>
                    </>
                  )}
                </Descriptions>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
export default CollectionItem
