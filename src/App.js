import { Layout, Menu, Row, Col } from 'antd'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ShopsPage from './pages/ShopsPage/ShopsPage'
import Marketplace from './pages/MarketPlace/MarketPlace'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import NftItem from './pages/NftItem/NftItem'
import CreateShop from './pages/CreateShop/CreateShop'
import CollectionsPage from './pages/UserCollections/UserCollections'
import CreateCollections from './pages/CreateCollections/CreateCollections'
import UsersArea from './pages/UsersArea/UsersArea'
import './App.scss'

function App() {
  const { Header, Content, Footer } = Layout

  return (
    <div className='App'>
      <Router>
        <Layout>
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
          <Content
            className='site-layout'
            style={{ padding: '0 50px', marginTop: 64 }}
          >
            <div
              className='site-layout-background'
              style={{ padding: 24, minHeight: '100vh' }}
            >
              <Switch>
                <Route exact path='/users' component={UsersArea}></Route>
                <Route exact path='/nft/:id' component={NftItem}></Route>
                <Route
                  exact
                  path='/collections'
                  component={CollectionsPage}
                ></Route>
                <Route
                  exact
                  path='/create-collection'
                  component={CreateCollections}
                ></Route>
                <Route exact path='/create-shop' component={CreateShop}></Route>
                <Route exact path='/login' component={LoginPage}></Route>
                <Route exact path='/register' component={RegisterPage}></Route>
                <Route
                  exact
                  path='/gacha/marketplace'
                  component={Marketplace}
                ></Route>
                <Route exact path='/gacha/shops' component={ShopsPage}></Route>
                <Route exact path='/' component={HomePage}></Route>
                <Route component={ErrorPage} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>footer test</Footer>
        </Layout>
      </Router>
    </div>
  )
}

export default App
