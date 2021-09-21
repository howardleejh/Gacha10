import { useContext } from 'react'
import { Layout, Menu, Row, Col, Button } from 'antd'
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
        <Col span={9} offset={8}>
          <Menu id='MenuBar' mode='horizontal'>
            <Menu.Item key='welcome' disabled={true}>
              {user ? <span> Welcome {user.username}</span> : <></>}
            </Menu.Item>
            <Menu.Item key='shops'>
              <Link to='/gacha/shops'>Shops</Link>
            </Menu.Item>
            <Menu.Item key='marketplace'>
              <Link to='/gacha/marketplace'>Marketplace</Link>
            </Menu.Item>
            {!user ? (
              <>
                <Menu.Item key='register'>
                  <Link to='/register'>Register</Link>
                </Menu.Item>
                <Menu.Item key='login'>
                  <Link to='/login'>Login</Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key='dashboard'>
                  <Link to='/dashboard'>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key='logout' style={{ padding: '0' }}>
                  <Button type='link' onClick={auth.logout}>
                    Log Out
                  </Button>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Col>
      </Row>
    </Header>
  )
}
export default NavBar
