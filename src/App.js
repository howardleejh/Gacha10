import { Layout } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import AuthProvider from './components/AuthProvider/AuthProvider'
import PrivateRoute from './components/Routes/PrivateRoute'
import GuestOnlyRoute from './components/Routes/GuestOnlyRoute'
import ShopsPage from './pages/ShopsPage/ShopsPage'
import Marketplace from './pages/MarketPlace/MarketPlace'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import NftItem from './pages/NftItem/NftItem'
import CollectionsPage from './pages/UserCollections/UserCollections'
import UserDashboard from './pages/UserDashboard/UserDashboard'
import UserCollections from './pages/UserCollections/UserCollections'
import UserStores from './pages/UserStores/UserStores'
import UserAssets from './pages/UserAssets/UserAssets'
import CreatePage from './pages/CreatePage/CreatePage'
import CreateCollection from './pages/CreateCollection/CreateCollection'
import CreateStore from './pages/CreateStore/CreateStore'
import './App.scss'

function App() {
  const { Content, Footer } = Layout

  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Layout>
            <NavBar />
            <Content
              className='site-layout'
              style={{ padding: '0 50px', marginTop: 64 }}
            >
              <div
                className='site-layout-background'
                style={{ padding: 24, minHeight: '87vh' }}
              >
                <Switch>
                  <PrivateRoute
                    exact
                    path='/create/store'
                    component={CreateStore}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path='/create/collection'
                    component={CreateCollection}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path='/create'
                    component={CreatePage}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path='/assets'
                    component={UserAssets}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path='/stores'
                    component={UserStores}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path='/collections'
                    component={UserCollections}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path='/dashboard'
                    component={UserDashboard}
                  ></PrivateRoute>
                  <Route exact path='/nft/:id' component={NftItem}></Route>
                  <Route
                    exact
                    path='/collections'
                    component={CollectionsPage}
                  ></Route>
                  <GuestOnlyRoute
                    exact
                    path='/login'
                    component={LoginPage}
                  ></GuestOnlyRoute>
                  <GuestOnlyRoute
                    exact
                    path='/register'
                    component={RegisterPage}
                  ></GuestOnlyRoute>
                  <Route
                    exact
                    path='/gacha/marketplace'
                    component={Marketplace}
                  ></Route>
                  <Route
                    exact
                    path='/gacha/shops'
                    component={ShopsPage}
                  ></Route>
                  <Route exact path='/' component={HomePage}></Route>
                  <Route component={ErrorPage} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>footer test</Footer>
          </Layout>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
