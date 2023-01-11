import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useCategory() {
  const [categories, setCategories] = useState([])

  
  const loadCategories = async () => {
      try {
          const { data } = await axios.get('/categories')
          await setCategories(data)
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
      loadCategories()
    }, [])

  return { categories }
}
