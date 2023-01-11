import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoadingGIF from '../../image/Loading_2.gif'

export default function Loading({ path = 'login' }) {
  const [count, setCount] = useState(5)

  const navigate = useNavigate()
  const location = useLocation()
  //console.log(location)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)

    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      })
    return () => clearInterval(interval)
  }, [count])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={LoadingGIF} alt="" style={{ width: '40px' }} />
      Redirecting you in {count} second.
    </div>
  )
}
