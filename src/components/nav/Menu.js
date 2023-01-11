import { useContext } from 'react'
import { NavLink, useActionData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import Search from '../forms/Search'
import useCategory from '../../hooks/useCategory'
import { CartContext } from '../../context/cart'
import { Badge } from 'antd'

export const Menu = () => {
  const [auth, setAuth] = useContext(AuthContext)
  const [cart, setCart] = useContext(CartContext)
  const { categories } = useCategory()
  const navigate = useNavigate()

  const logout = () => {
    setAuth({ ...auth, user: null, token: '' })
    localStorage.removeItem('e-auth')
    navigate('/login')
  }
  return (
    <>
      <ul className="nav nav-fill sticky-top bg-light p-3" >
        <li className="nav-item shadow mr-10">
          <NavLink className="nav-link" aria-current="page" to="/">
            Home
          </NavLink>
        </li>

        <li className="nav-item shadow mr-10">
          <NavLink className="nav-link" to="/shop">
            Shop
          </NavLink>
        </li>

        <Search />

        <li className="nav-item shadow mr-10">
          <Badge
            count={cart?.length >= 1 ? cart.length : 0}
            offset={[-5, 10]}
            showZero={true}
          >
            <NavLink className="nav-link mt-1" to="/cart">
              Cart
            </NavLink>
          </Badge>
        </li>
        {/* <li className="nav-item shadow mr-10">
          <NavLink
            className="nav-link"
            aria-current="page"
            to="/dashboard/secret"
          >
            Secret
          </NavLink> 
        </li>*/}

        <div className="dropdown">
          <li>
            <a
              className="nav-link pointer dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Categories
            </a>
            <ul
              className="dropdown-menu"
              style={{ height: '30vh', overflow: 'scroll' }}
            >
              <li>
                <NavLink className="nav-link" to="/categories">
                  All Categories
                </NavLink>
              </li>
              {categories?.map((c) => (
                <NavLink
                  className="nav-link"
                  key={c._id}
                  to={`/category/${c._id}`}
                >
                  {c.name}
                </NavLink>
              ))}
            </ul>
          </li>
        </div>

        {!auth.user ? (
          <>
            <li className="nav-item shadow">
              <NavLink className="nav-link " to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item shadow">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown pointer">
            <li>
              <div
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth.user.name}
              </div>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`}
                  >
                    DashBoard
                  </NavLink>
                </li>
                <li className="nav-item shadow pointer">
                  <div onClick={logout} className="nav-link">
                    Logout
                  </div>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  )
}
