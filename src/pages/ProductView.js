import { useContext, useEffect, useState } from 'react'
import { Jumbotron } from '../components/cards/Jumbotron'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Badge } from 'antd'
import {
  FaCheck,
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaRocket,
  FaTimes,
  FaWarehouse,
  IconName,
} from 'react-icons/fa'
import moment from 'moment'
import ProductCard from '../components/cards/ProductCard'
import Cart from './Cart'
import { toast } from 'react-hot-toast'
import { CartContext } from '../context/cart'

export default function ProductView() {
  const [product, setProduct] = useState({})
  const [related, setRelated] = useState([])
  const params = useParams()
  const [cart, setCart] = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) loadProduct()
  }, [params.id])

  const loadProduct = async (req, res) => {
    try {
      const { data } = await axios.get(`/product/${params.id}`)
      setProduct(data)
      loadRelated(data._id, data.category._id)
    } catch (err) {
      console.log(err)
    }
  }

  const loadRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-products/${productId}/${categoryId}`
      )

      setRelated(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="card mb-3 hoverable">
            <div
              key={product._id}
              className="card mb-3 hoverable"
              style={{ objectFit: 'cover', overflow: 'hidden' }}
            >
              <Badge.Ribbon text={`${product.sold} Sold`} color="orange">
                <Badge.Ribbon
                  placement="start"
                  color="pink"
                  text={`${
                    product?.quantity >= 1
                      ? `${product?.quantity - product?.sold}_In Stock`
                      : 'Out of Stock'
                  }`}
                >
                  <img
                    src={`${process.env.REACT_APP_BACKEND}/product/photo/${product._id}`}
                    alt={product.name}
                    style={{ width: '700px', objectFit: 'contain' }}
                  />
                </Badge.Ribbon>
              </Badge.Ribbon>

              <div className="card-body">
                <h1 className="fw-bold">{product.name}</h1>
                <p className="card-text lead">{product.description}</p>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="fw-bold  p-3 bg-light fw-bold">
                      <FaDollarSign />
                      Price{' '}
                      {product?.price?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </p>
                    <p className="fw-bold  p-3 bg-light fw-bold">
                      <FaProjectDiagram /> Category: {product?.category?.name}
                    </p>
                    <p className="fw-bold  p-3 bg-light fw-bold">
                      <FaRegClock /> Added:{' '}
                      {moment(product.createdAt).fromNow()}
                    </p>
                    <p className="fw-bold  p-3 bg-light fw-bold">
                      {product?.quantoty > 0 ? <FaCheck /> : <FaTimes />}{' '}
                      {product?.quantoty > 0 ? 'In Stock' : 'Out Of Stock'}
                    </p>
                    <p className="fw-bold p-3 bg-light fw-bold">
                      <FaWarehouse /> Avaiable{' '}
                      {product?.quantity - product?.sold}
                    </p>
                    <p className="fw-bold  p-3 bg-light fw-bold">
                      <FaRocket />
                      {'     '}Sold {product?.sold}
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary col card-button"
                    style={{ color: 'orange' }}
                    onClick={() => {
                      setCart([...cart, product])
                      toast.success('Added to Cart')
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                {/* <p>{moment(p.createdAt).fromNow()}</p>
          <p>{p.sold} Sold</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <h2>Related Products</h2>
          <hr />
          {related?.length < 1 && <p> Nothing Found</p>}
          {related?.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
