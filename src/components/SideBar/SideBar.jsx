import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import '../SideBar/SideBar.scss'

function SideBar() {
  const { Sider } = Layout

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '50vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className='logo' />
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
        <Menu.Item key='1' icon={<UserOutlined />}>
          <Link to='/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<VideoCameraOutlined />}>
          <Link to='/stores'>Stores</Link>
        </Menu.Item>
        <Menu.Item key='3' icon={<UploadOutlined />}>
          <Link to='/collections'>Collections</Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<BarChartOutlined />}>
          <Link to='/assets'>Assets</Link>
        </Menu.Item>
        <Menu.Item key='5' icon={<CloudOutlined />}>
          <Link to='/faucet'>Top Up</Link>
        </Menu.Item>
        <Menu.Item key='6' icon={<AppstoreOutlined />}>
          Settings
        </Menu.Item>
        <Menu.Item key='7' icon={<TeamOutlined />}>
          nav 7
        </Menu.Item>
        <Menu.Item key='8' icon={<ShopOutlined />}>
          nav 8
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar
