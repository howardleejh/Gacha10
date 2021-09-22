import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthProvider/AuthProvider'

const GuestOnlyRoute = ({ component: Component, ...otherProps }) => {
  const { user, metaUser } = useContext(AuthContext)

  return (
    <Route
      {...otherProps}
      render={(props) =>
        user && metaUser ? (
          <Redirect to='/dashboard' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default GuestOnlyRoute
