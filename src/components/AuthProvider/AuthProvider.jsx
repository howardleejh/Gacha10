import { useState, createContext, useEffect } from 'react'
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
      return console.error(err)
    }
    if (isUser) {
      setUser(isUser.attributes)
      return true
    }
    setUser(null)
    return false
  }

  const metaCheck = async () => {
    let isMetaUser = null
    try {
      isMetaUser = await Moralis.authenticate({
        signingMessage: 'Welcome to Gacha10',
      })
    } catch (err) {
      return console.error(err)
    }
    if (isMetaUser) {
      setMetaUser(isMetaUser.attributes)
      return true
    }
    setMetaUser(null)
    return false
  }

  const login = async (email, password) => {
    setIsLoading(true)

    let metaAuth = null

    try {
      metaAuth = await Moralis.authenticate()
    } catch (err) {
      return console.log(err)
    }

    if (!metaAuth) {
      notify('Please check your Metamask credentials')
      return
    }

    let userAuth = null
    try {
      userAuth = await Moralis.User.logIn(email, password)
    } catch (err) {
      return console.log(err)
    }
    if (!userAuth) {
      notify('Please check your login credentials')
      return
    }
    setUser(userAuth.attributes)

    setMetaUser(metaAuth.attributes)
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
        metaCheck,
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
