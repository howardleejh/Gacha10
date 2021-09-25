import { useContext } from 'react'
import { Layout, Menu, Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthProvider/AuthProvider'
import './NavBar.scss'

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
        background: 'rgba(255, 255, 255, 0.7)',
        className: 'navbar',
        boxShadow: '5px 5px 1px (0, 0, 0, 1)',
      }}
    >
      <Row justify='space-between'>
        <Col span={4} style={{ width: '30vw', height: '10vh' }}>
          <Link to='/'>
            <Button type='link' ghost>
              <img
                className='LogoIcon'
                width={25}
                src='/GachaIcon.svg'
                alt='Logo'
              />
            </Button>
          </Link>
        </Col>
        <Col span={8} offset={8}>
          <Menu
            id='MenuBar'
            mode='horizontal'
            style={{
              background: 'rgba(0, 0, 0, 0)',
              border: '0',
            }}
          >
            <Menu.Item key='welcome'>
              {user && user.email ? (
                <Link to='/dashboard'>Welcome {user.username}</Link>
              ) : (
                <></>
              )}
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
