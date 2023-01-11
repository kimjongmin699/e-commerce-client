import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { Jumbotron } from '../../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom'
import AdminMenu from '../../components/nav/AdminMenu'
import UserMenu from '../../components/nav/UserMenu'

export default function UserDashboard() {
  const [auth, setAuth] = useContext(AuthContext)

  return (
    <>
      <Jumbotron title={`Hello ${auth.user.name}`} subtitle="User Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
           <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-4 h4 bg-light">User Information</div>
            <ul className="list-group">
              <li className="list-group-item">{auth.user.name}</li>
              <li className="list-group-item">{auth.user.email}</li>
              <li className="list-group-item">User</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
