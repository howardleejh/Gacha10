import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
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
        height: '45vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className='logo' />
      <Menu theme='dark' mode='vertical' style={{ paddingTop: '4vh' }}>
        <Menu.Item key='/dashboard' icon={<UserOutlined />}>
          <Link to='/dashboard'>
            <span>Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/create' icon={<UserOutlined />}>
          <Link to='/create'>
            <span>Create</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/stores' icon={<VideoCameraOutlined />}>
          <Link to='/stores'>
            <span>Stores</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/collections' icon={<UploadOutlined />}>
          <Link to='/collections'>
            <span>Collections</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/assets' icon={<BarChartOutlined />}>
          <Link to='/assets'>
            <span>Assets</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/faucet' icon={<CloudOutlined />}>
          <Link to='/faucet'>
            <span>Top Up</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/settings' icon={<AppstoreOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar
