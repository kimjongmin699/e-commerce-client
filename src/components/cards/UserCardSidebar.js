import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { CartContext } from '../../context/cart'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropIn from 'braintree-web-drop-in-react'
import { toast } from 'react-hot-toast'

export default function UserCardSidebar() {
  const [auth, setAuth] = useContext(AuthContext)
  const [cart, setCart] = useContext(CartContext)
  const [loading, setLoading] = useState(false)

  const [clientToken, setClientToken] = useState('')
  const [instance, setInstance] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (auth?.token) {
      getClientToken()
    }
  }, [auth?.token])

  const getClientToken = async () => {
    try {
      const { data } = await axios.get('/braintree/token')
      //console.log(data)
      setClientToken(data.clientToken)
    } catch (err) {
      console.log(err)
    }
  }

  const cartTotal = () => {
    let total = 0
    cart.map((item) => {
      total += item.price
    })
    return total.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  const handleBuy = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod()
      const { data } = await axios.post('/braintree/payment', {
        nonce,
        cart,
      })
      //console.log('buy', data)
      setLoading(false)
      localStorage.removeItem('cart')
      setCart([])
      navigate('/dashboard/user/orders')
      toast.success('Payment Success')
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <div
      className="col-md-4 sticky-top border p-5 shadow-lg"
      style={{
        backgroundColor: 'aquamarine',
        height: '1200px',
        width: '30%',
        color: 'gray',
        borderRadius: '25px',
      }}
    >
      <h4>Your Cart summary</h4>
      Total/Address/Payment
      <hr />
      <h4>Total: {cartTotal()}</h4>
      <hr />
      {auth?.user?.address ? (
        <>
          <div className="mb-3 ">
            <hr />
            <h4>Delivery Address:</h4>
            <h6>{auth?.user?.address}</h6>
          </div>
          <button
            className="btn btn-outline-danger"
            onClick={() => navigate('/dashboard/user/profile')}
          >
            Update Address
          </button>
        </>
      ) : (
        <div className="mb-3">
          {auth?.token ? (
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/dashboard/user/profile')}
            >
              Add Address
            </button>
          ) : (
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/login', { state: '/cart' })}
            >
              Login to Checkout
            </button>
          )}
        </div>
      )}
      <div className="mt-5">
        {!clientToken || !cart?.length ? (
          ''
        ) : (
          <>
            {' '}
            <div>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: 'vault',
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
            </div>
            <button
              onClick={handleBuy}
              className="btn btn-primary col-12"
              style={{ marginTop: '20px' }}
              disabled={!auth?.user?.address || !instance || loading}
            >
              {loading ? 'Processing..' : 'Buy'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
