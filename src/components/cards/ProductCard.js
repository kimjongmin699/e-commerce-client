import { Badge } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/cart'
import { toast } from 'react-hot-toast'

export default function ProductCard({ p }) {
  const [cart, setCart] = useContext(CartContext)
  const navigate = useNavigate()

  return (
    <div
      key={p._id}
      className="card mb-3 hoverable"
      style={{ objectFit: 'cover', overflow: 'hidden' }}
    >
      <Badge.Ribbon text={`${p.sold} Sold`} color="orange">
        <Badge.Ribbon
          placement="start"
          color="pink"
          text={`${
            p?.quantity >= 1
              ? `${p?.quantity - p?.sold}_In Stock`
              : 'Out of Stock'
          }`}
        >
          <img
            src={`${process.env.REACT_APP_BACKEND}/product/photo/${p._id}`}
            alt={p.name}
            style={{ height: '200px' }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5>{p.name}</h5>
        <h4 className="fw-bold">
          {p?.price?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          원
        </h4>
        <p className="card-text">{p.description.substring(0, 60)}...</p>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary col card-button"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            View Product
          </button>
          <button
            className="btn btn-primary col card-button"
            style={{ color: 'orange' }}
            onClick={() => {
              toast.success('Added Cart')
              localStorage.setItem('cart', JSON.stringify(cart))
              setCart([...cart, p])
            }}
          >
            Add to Cart
          </button>
        </div>
        {/* <p>{moment(p.createdAt).fromNow()}</p>
        <p>{p.sold} Sold</p> */}
      </div>
    </div>
  )
}
