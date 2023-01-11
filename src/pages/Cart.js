import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { Jumbotron } from '../components/cards/Jumbotron'
import moment from 'moment'
import UserCardSidebar from '../components/cards/UserCardSidebar'
import ProductCardHorizontal from '../components/cards/ProductCardHorizontal'

export default function Cart() {
  const [cart, setCart] = useContext(CartContext)
  const [auth, setAuth] = useContext(AuthContext)

  const navigate = useNavigate()

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user.name}`}
        subtitle={
          cart?.length
            ? `You have ${cart.length} Product in Cart.    ${
                auth?.token ? 'Check out' : 'Please Log in'
              }`
            : 'Your Cart is empty'
        }
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 text-center h4 bg-light">
              {cart?.length > 1 ? (
                'My Cart'
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/')}
                  >
                    {' '}
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {cart?.length && (
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-8 mr-5 ">
              <div className="row ">
                {cart?.map((p, index) => (
                  <ProductCardHorizontal p={p} key={index} />
                ))}
              </div>
            </div>
            <UserCardSidebar />
          </div>
        </div>
      )}
    </>
  )
}
