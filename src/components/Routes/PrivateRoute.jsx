import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthProvider/AuthProvider'

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { user } = useContext(AuthContext)

  return (
    <Route
      {...otherProps}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  )
}

export default PrivateRoute
