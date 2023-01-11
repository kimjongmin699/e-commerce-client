import { useEffect, useState } from 'react'
import { Jumbotron } from '../components/cards/Jumbotron'
import axios from 'axios'
import ProductCard from '../components/cards/ProductCard'
import { Checkbox, Radio } from 'antd'
import { prices } from '../prices'

export default function Shop() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])

  useEffect(() => {
    loadCategories()
    if (!checked.length || !radio.length) loadProducts()
  }, [])

  useEffect(() => {
    if (checked.length || radio.length) loadFilteredProducts()
  }, [checked, radio])

  const loadFilteredProducts = async () => {
    try {
      const { data } = await axios.post('/filtered-products', {
        checked,
        radio,
      })
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

  const loadProducts = async () => {
    try {
      const { data } = await axios.get('/products')
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

  const loadCategories = async () => {
    try {
      const { data } = await axios.get('/categories')
      setCategories(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCheck = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }

  return (
    <>
      <Jumbotron title="Hello E-Commerce" />
      <pre>{JSON.stringify(radio, null, 4)}</pre>
      <div className="container-fliud">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mt-2 mb-2 bg-light text-center ">
              Filter By Categories
            </h2>
            <div className="row">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h2 className="p-3 mt-2 mb-2 bg-light text-center ">
              Filter By Prices
            </h2>
            <div className="row">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices?.map((p) => (
                  <div key={p._id} style={{ marginLeft: '8px' }}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="p-5 pt-0">
              <button
                className="btn btn-outline-primary col-12 mt-5"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="p-3 mt-2 mb-2 bg-light text-center ">
              {products?.length} Products
            </h2>
            <div className="row" style={{ height: '100vh', overflow: 'scroll' }}>
              {products?.map((p) => (
                <div className="col-md-4" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
