import { useContext } from 'react'
import { SearchContext } from '../context/search'
import { Jumbotron } from '../components/cards/Jumbotron'
import ProductCard from '../components/cards/ProductCard'

export default function Search() {
  const [values, setValues] = useContext(SearchContext)

  return (
    <>
      <Jumbotron
        title="Search results"
        subtitle={
          values?.results?.length < 1
            ? 'No products found'
            : `${values.results.length} Found`
        }
      />
      <div className="container mt-3">
        <div className="row">
          {values?.results?.map((p) => (
            <div key={p._id} className="col-md-4">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
