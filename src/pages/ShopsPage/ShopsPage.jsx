import { Space, Button, Pagination } from 'antd'
import CardItem from '../../components/CardItem/CardItem'

function ShopsPage() {
  return (
    <>
      <h1>this is a gacha shops page</h1>
      <Space
        size={[50, 50]}
        wrap
        direction='horizontal'
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {new Array(24).fill(null).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CardItem
            width={350}
            imgUrl='https://www.icegif.com/wp-content/uploads/nyan-cat-icegif-4.gif'
            title='nyan pikachu'
            desc='this is a nyan pikachu'
            children={<Button type='primary'>Primary Button</Button>}
          />
        ))}
      </Space>
      <Pagination style={{ marginTop: '3vh' }} defaultCurrent={1} total={24} />
    </>
  )
}

export default ShopsPage
