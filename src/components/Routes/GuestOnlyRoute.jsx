import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthProvider/AuthProvider'

const GuestOnlyRoute = ({ component: Component, ...otherProps }) => {
  const { user } = useContext(AuthContext)

  return (
    <Route
      {...otherProps}
      render={(props) =>
        user && user.email ? (
          <Redirect to='/dashboard' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default GuestOnlyRoute
