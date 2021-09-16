import { Card, Button } from 'antd'
import './CardItem.scss'

function CardItem(props) {
  const { Meta } = Card

  return (
    <>
      <Card
        hoverable
        style={{ width: props.width }}
        cover={<img alt='example' src={props.imgUrl} />}
      >
        <Meta title={props.title} description={props.desc} />
        <div style={{ marginTop: '3vh' }}>
          <Button type='primary'>Visit Shop</Button>
        </div>
      </Card>
    </>
  )
}

export default CardItem
