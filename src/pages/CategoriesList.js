import { Link } from 'react-router-dom'
import { Jumbotron } from '../components/cards/Jumbotron'
import useCategory from '../hooks/useCategory'

export default function CategoriesList() {
  const { categories } = useCategory()
  

  return (
    <>
      <Jumbotron title="Categories" subtitle="List of All Categories" />

      <div className="container ">
        <div className="row gx-5 gy-5 mt-3 mb-5">
          {categories.map((c) => (
            <div key={c._id} className="col-md-6">
              <Link to={`/category/${c._id}`}>
                <button className="btn btn-light col-12 p-3">{c.name}</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
