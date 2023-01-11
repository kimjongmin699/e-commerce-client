import { useContext, useState } from 'react'
import { Jumbotron } from '../components/cards/Jumbotron'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/auth'
import { useLocation, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  // console.log(process.env.REACT_APP_BACKEND)
  console.log(location)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      })
      if (data?.error) {
        toast.error(data.error)
      } else {
        localStorage.setItem('e-auth', JSON.stringify(data))
        setAuth({ ...auth, token: data.token, user: data.user })
        toast.success('Login is success')
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? 'admin' : 'user'}`
        )
      }
      console.log(data.error)
    } catch (err) {
      console.log(err)
      toast.error('Login failed')
    }
  }
  return (
    <div>
      <Jumbotron title="Login" subtitle="This is Register page" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(email, null, 4)}</pre> */}
    </div>
  )
}

export default Login
