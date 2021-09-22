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
        <Menu.Item key='/uploads' icon={<BarChartOutlined />}>
          <Link to='/uploads'>
            <span>Uploads</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/transfer' icon={<CloudOutlined />}>
          <Link to='/transfer'>
            <span>Transfer</span>
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
