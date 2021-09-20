import { useContext } from 'react'
import { Layout, Menu, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthProvider/AuthProvider'

function NavBar() {
  const { Header } = Layout

  const auth = useContext(AuthContext)
  const user = auth.user

  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: 'white',
      }}
    >
      <Row justify='space-between'>
        <Col span={6}>
          <Link to='/'>Logo</Link>
        </Col>
        <Col span={8} offset={8}>
          <Menu id='MenuBar' mode='horizontal'>
            <Menu.Item key='one'>
              <Link to='/gacha/shops'>Shops</Link>
            </Menu.Item>
            <Menu.Item key='two'>
              <Link to='/gacha/marketplace'>Marketplace</Link>
            </Menu.Item>
            <Menu.Item key='three'>
              <Link to='/register'>Register</Link>
            </Menu.Item>
            <Menu.Item key='four'>
              <Link to='/login'>Login</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  )
}
export default NavBar
