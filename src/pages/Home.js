import { useContext, useEffect, useState } from 'react'
import { Jumbotron } from '../components/cards/Jumbotron'
import { AuthContext } from '../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import ProductCard from '../components/cards/ProductCard'

function Home() {
  const [auth, setAuth] = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
    getTotal()
  }, [])

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/products-count')
      setTotal(data)
    } catch (err) {
      console.log(err)
    }
  }

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`)
      setProducts(data)
    } catch (err) {
      console.log(err)
      toast.error('Could not load products')
    }
  }

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/list-products/${page}`)
      setProducts([...products, ...data])
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error('Could not load products')
      setLoading(false)
    }
  }

  const arr = [...products]
  const sortedBySold = arr.sort((a, b) => (a.sold < b.sold ? 1 : -1))

  return (
    <div>
      <Jumbotron title="Hello World" subtitle="adasdasdasd" />
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <div className="row" style={{ marginLeft: '10px' }}>
        <div className="col-md-6 ">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">New Arrived</h2>
          <div className="row">
            {products.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
            Best Sellers
          </h2>
          <div className="row" style={{ marginRight: '10px' }}>
            {sortedBySold.map((p) => (
              <div className="col-md-6 " key={p._id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container text-center p-5">
        {products && products.length < total && (
          <button
            className="btn btn-warning btn-lg"
            style={{width:"70%"}}
            disabled={loading}
            onClick={(e) => {
              e.preventDefault()
              setPage(page + 1)
            }}
          >
            {loading ? 'Loading...' : 'Load More'}{' '}
          </button>
        )}
      </div>
    </div>
  )
}

export default Home
