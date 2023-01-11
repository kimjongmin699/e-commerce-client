import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Jumbotron } from '../../components/cards/Jumbotron'
import AdminMenu from '../../components/nav/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/forms/CategoryForm'
import { Modal } from 'antd'

export default function AdminCategory() {
  const [auth, setAuth] = useContext(AuthContext)
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatingName, setUpdatingName] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/category', { name: name })
      console.log(data)
      if (data.error) {
        toast.error(data.error)
      } else {
        loadCategories()
        toast.success(`${data.name} is created`)
        setName('')
      }
    } catch (err) {
      console.log(err)
      toast.error('Create category failed, Try again')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updatingName,
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success(`${data.name} is Updated`)
        setSelected(null)
        setUpdatingName('')
        loadCategories()
        setVisible(false)
      }
    } catch (err) {
      console.log(err)
      toast.error('Category may already exist')
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.delete(`/category/${selected._id}`)
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success(`${data.name} is Deleted`)
        setSelected(null)
        loadCategories()
        setVisible(false)
      }
    } catch (err) {
      console.log(err)
      toast.error('Category may already exist')
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
            <div className="p-3 mt-2 mb-4 h4 bg-light">Create Categories</div>
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />
            <hr />
            <div className="col">
              {categories?.map((c) => (
                <button
                  key={c._id}
                  className="btn btn-outline-primary m-3"
                  onClick={() => {
                    setVisible(true)
                    setSelected(c)
                    setUpdatingName(c.name)
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <Modal
              open={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                value={updatingName}
                setValue={setUpdatingName}
                handleSubmit={handleUpdate}
                buttonText="Update"
                handleDelete={handleDelete}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}
