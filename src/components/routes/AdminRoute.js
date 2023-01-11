import { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import Loading from './Loading'
import axios from 'axios'

export const AdminRoute = () => {
  const [auth, setAuth] = useContext(AuthContext)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get(`/admin-check`)
      console.log(data)
      if (data.ok) {
        setOk(true)
      } else {
        setOk(false)
      }
    }
    if (auth.token) adminCheck()
  }, [auth.token])

  //   useEffect(() => {
  //     if (auth.token) {
  //       setOk(true)
  //     } else {
  //       setOk(false)
  //     }
  //   }, [auth.token])

  return ok ? <Outlet /> : <Loading path="" />
}
