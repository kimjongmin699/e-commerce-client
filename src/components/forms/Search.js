import axios from 'axios'
import { useContext } from 'react'
import { SearchContext } from '../../context/search.js'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const [values, setValues] = useContext(SearchContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(`/products/search/${values.keyword}`)
      setValues({ ...values, results: data })
      navigate('/search')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control"
        style={{ borderRadius: '25px' }}
        placeholder="Search"
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values.keyword}
      />
      <button
        className="btn btn-outline-primary"
        style={{ borderRadius: '25px' }}
        type="submit"
      >
        Search{values.length}
      </button>
    </form>
  )
}
