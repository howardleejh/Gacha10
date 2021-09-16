import SideBar from '../../components/SideBar/SideBar'
import UserDashboard from '../UserDashboard/UserDashboard'
import UserStores from '../UserStores/UserStores'
import UserCollections from '../UserCollections/UserCollections'
import UserAssets from '../UserAssets/UserAssets'
import CreateStore from '../CreateStore/CreateStore'
import CreateCollection from '../CreateCollection/CreateCollection'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import '../UsersArea/UsersArea.scss'

function UsersArea() {
  const { Content } = Layout

  return (
    <>
      <Router>
        <Layout>
          <SideBar />
          <Layout className='site-layout' style={{ marginLeft: 200 }}>
            <Content style={{ overflow: 'initial' }}>
              <div
                className='site-layout-background'
                style={{ textAlign: 'center' }}
              >
                <Switch>
                  <Route exact path='/assets' component={UserAssets}></Route>
                  <Route
                    exact
                    path='/collections/create-new-collection'
                    component={CreateCollection}
                  ></Route>
                  <Route
                    exact
                    path='/collections'
                    component={UserCollections}
                  ></Route>
                  <Route
                    exact
                    path='/dashboard'
                    component={UserDashboard}
                  ></Route>
                  <Route
                    exact
                    path='/stores/create-new-store'
                    component={CreateStore}
                  ></Route>
                  <Route exact path='/stores' component={UserStores}></Route>
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </>
  )
}
export default UsersArea
