import axios from 'axios'
import { useState, createContext, useEffect } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  })

  //axios config
  axios.defaults.baseURL = 'https://commerce.herokuapp.com/api'
  axios.defaults.headers.common['Authorization'] = auth.token

  useEffect(() => {
    const data = localStorage.getItem('e-auth')
    if (data) {
      const parsed = JSON.parse(data)
      setAuth({ ...auth, user: parsed.user, token: parsed.token })
    }
  }, [])

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
