import { useState, createContext } from 'react'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  const { Moralis } = useMoralis()

  const [user, setUser] = useState(null)

  const notify = (message) => toast.dark(message)

  const userCheck = async () => {
    let isUser = null

    try {
      isUser = await Moralis.User.currentAsync()
    } catch (e) {
      console.log(e)
    }
    if (!isUser) {
      setUser(null)
      return
    }
    setUser(isUser.attributes)
    return
  }

  const metamaskAuth = async () => {
    let userAuth = null

    try {
      userAuth = await Moralis.authenticate()
    } catch (err) {
      setUser(null)
      notify('Please try to authenticate again')
      return
    }
    setUser(userAuth.attributes)
    return
  }

  const login = async (email, password) => {
    let userAuth = null
    try {
      userAuth = await Moralis.User.logIn(email, password)
    } catch (err) {
      notify('Please check your login credentials')
      return false
    }
    setUser(userAuth.attributes)
    return true
  }

  const logout = async () => {
    try {
      await Moralis.User.logOut()
    } catch (err) {
      return console.log(err)
    }
    setUser(null)
    return
  }

  return (
    <AuthContext.Provider
      value={{ userCheck, metamaskAuth, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
