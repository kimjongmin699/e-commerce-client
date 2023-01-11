import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Jumbotron } from '../../components/cards/Jumbotron'
import AdminMenu from '../../components/nav/AdminMenu'
import axios from 'axios'
import { Select } from 'antd'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const { Option } = Select

export default function AdminProductUpdate() {
  const [auth, setAuth] = useContext(AuthContext)
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [id, setId] = useState('')

  const navigate = useNavigate()

  const params = useParams()

  useEffect(() => {
    loadProduct()
  }, [])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const { data } = await axios.get('/categories')
      setCategories(data)
    } catch (err) {
      console.log(err)
    }
  }

  const loadProduct = async (e) => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`)
      setName(data.name)
      setDescription(data.description)
      setPrice(data.price)
      setQuantity(data.quantity)
      setCategory(data.category._id)
      setShipping(data.shipping)
      setId(data._id)
    } catch (err) {
      console.log(err)
      toast.error('Could not load product')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      photo && productData.append('photo', photo)
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('category', category)
      productData.append('shipping', shipping)
      productData.append('quantity', quantity)

      const { data } = await axios.put(`/product/${id}`, productData)
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success(`${data.name} is Updated`)
        navigate('/dashboard/admin/products')
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
      toast.error('Product create failed')
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      let answer = window.confirm('Are you sure want to delete?')
      if (!answer) return
      const { data } = await axios.delete(`/product/${id}`)
      toast.success(`${data.name} is Deleted`)
      navigate('/dashboard/admin/products')
    } catch (err) {
      console.log(err)
      toast.error('Could not delete')
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
            <div className="p-3 mt-2 mb-4 h4 bg-light">Update Product</div>
            {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt=""
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  src={`${process.env.REACT_APP_BACKEND}/product/photo/${id}`}
                  alt=""
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}
            <div className="p-3">
              <label className="btn btn-outline-secondary p-2 col-12 mb-3">
                {photo ? photo.name : 'Upload Photo'}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              className="form-control p-2 mb-3"
              placeholder="Write a price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Select
              size="large"
              bordered={false}
              className="form-select mb-3"
              placeholder="Choose category"
              onChange={(value) => setCategory(value)}
              showSearch
              value={category}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <Select
              size="large"
              bordered={false}
              className="form-select mb-3"
              placeholder="Choose shipping"
              onChange={(value) => setShipping(value)}
              value={shipping ? 'Yes' : 'No'}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>

            <input
              type="number"
              className="form-control p-2 mb-3 width"
              placeholder="Write a Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className="d-flex p-3">
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                style={{ width: '100%', text: 'center' }}
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger ml-4"
                style={{ width: '100%', text: 'center' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
