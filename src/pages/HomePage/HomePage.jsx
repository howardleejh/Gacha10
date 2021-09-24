import { Row, Col } from 'antd'
import ThreeFiber from '../../components/ThreeFiber/ThreeFiber'

function HomePage() {
  return (
    <>
      <Row justify='center'>
        <Col span={16} style={{ height: '75vh' }}>
          <ThreeFiber
            item='./ethereum.glb'
            autoRotate={true}
            pan={true}
            zoom={false}
          />
        </Col>
        <Col style={{ width: '100vw' }}>
          <h1>Welcome to Gacha10</h1>
        </Col>
      </Row>
    </>
  )
}

export default HomePage
