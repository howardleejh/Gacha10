import { Row, Col, Typography } from 'antd'
import ThreeFiber from '../../components/ThreeFiber/ThreeFiber'

function HomePage() {
  const { Title } = Typography

  return (
    <>
      <Row justify='center'>
        <Col style={{ width: '100vw' }}>
          <Title>Welcome to Gacha10</Title>
        </Col>
        <Col span={16} style={{ height: '75vh' }}>
          <ThreeFiber
            item='./ethereum.glb'
            autoRotate={true}
            pan={true}
            zoom={false}
          />
        </Col>
      </Row>
    </>
  )
}

export default HomePage
