import { useEffect, useState } from 'react'
import { Jumbotron } from '../components/cards/Jumbotron'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/cards/ProductCard'

export default function CategoryView() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.categoryId) loadProductsById()
  }, [params.categoryId])

  const loadProductsById = async () => {
    try {
      const { data } = await axios(`/products-by-id/${params.categoryId}`)
      setProducts(data.products)
      setCategory(data.category)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Jumbotron title={category?.name} subtitle={products.length} />
      <div>{products.length}</div>
      {/* <pre>{JSON.stringify(products, null, 4)}</pre> */}
      <div className="container-fluid">
        <div className="row mt-3">
          {products?.map((p) => (
            <div key={p._id} className='col-md-4'><ProductCard p={p} /></div>
            
          ))}
        </div>
      </div>
    </>
  )
}
