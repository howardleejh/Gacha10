import { useState, createContext } from 'react'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  const { Moralis } = useMoralis()

  const [user, setUser] = useState(null)
  const [metaUser, setMetaUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const notify = (message) => toast.dark(message)

  const userCheck = async () => {
    let isUser = null

    try {
      isUser = await Moralis.User.current()
    } catch (err) {
      console.log(err)
      return false
    }
    if (isUser) {
      setUser(isUser.attributes)
      console.log('is user')
      return true
    }
    setUser(null)
    console.log('is not user')
    return false
  }

  const metamaskAuth = async () => {
    setIsLoading(true)
    let metaUserAuth = null

    try {
      metaUserAuth = await Moralis.authenticate()
    } catch (err) {
      console.log(err)
    }
    if (!metaUserAuth) {
      setMetaUser(null)
      setUser(null)
      notify('Please try again')
      return
    }
    setMetaUser(metaUserAuth.attributes)
    setIsLoading(false)
    return metaUserAuth.attributes
  }

  const login = async (email, password) => {
    setIsLoading(true)

    let userAuth = null
    try {
      userAuth = await Moralis.User.logIn(email, password)
    } catch (err) {
      notify('Please check your login credentials')
      return false
    }
    let metaUser = await metamaskAuth()

    if (userAuth.attributes.ethAddress !== metaUser.ethAddress) {
      logout()
      setUser(null)
      setMetaUser(null)
      return notify('Your account and Metamask does not match')
    }
    setUser(userAuth.attributes)
    setMetaUser(metaUser)
    setIsLoading(false)
    return
  }

  const logout = async () => {
    try {
      await Moralis.User.logOut()
    } catch (err) {
      return console.log(err)
    }
    setUser(null)
    setMetaUser(null)
    return
  }

  return (
    <AuthContext.Provider
      value={{
        userCheck,
        metamaskAuth,
        login,
        logout,
        user,
        metaUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
