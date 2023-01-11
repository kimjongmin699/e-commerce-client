import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Jumbotron } from '../../components/cards/Jumbotron'
import AdminMenu from '../../components/nav/AdminMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function AdminProducts() {
  const [auth, setAuth] = useContext(AuthContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const { data } = await axios.get('/products')
      setProducts(data)
    } catch (err) {
      console.log(err)
      toast.error('can not load products')
    }
  }

  return (
    <>
      <Jumbotron title={`Hello ${auth.user.name}`} subtitle="Admin Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-4 h4 bg-light">Products</div>
            {products.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/update/${p._id}`}>
                <div className="card mb-3">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_BACKEND}/product/photo/${p._id}`}
                        alt={p.name}
                        className="img img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 160)}...
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            {moment(p.createdAt).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
