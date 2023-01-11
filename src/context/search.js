import { useState, createContext } from 'react'

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: '',
    results: [],
  })

  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  )
}

export { SearchContext, SearchProvider }
