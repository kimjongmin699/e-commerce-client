import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Jumbotron } from '../../components/cards/Jumbotron'
import axios from 'axios'
import moment from 'moment'
import ProductCardHorizontal from '../../components/cards/ProductCardHorizontal'
import AdminMenu from '../../components/nav/AdminMenu'
import { Select } from 'antd'


const { Option } = Select

export default function AdminOrders() {
  const [auth, setAuth] = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState([
    'NotProcessed',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ])

  const [changedStatus, setChangedStatus] = useState('')

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/all-orders')
      console.log(data)
      setOrders(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = async (orderId, value) => {
    setChangedStatus(value)
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      })
      getOrders()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Jumbotron title={`Hello ${auth.user.name}`} subtitle="User Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-4 h4 bg-light">Create Orders</div>
            {/* <pre>{JSON.stringify(orders, null, 4)}</pre> */}
            <div className="row">
              {orders?.map((o, i) => {
                return (
                  <div
                    key={o._id}
                    className="border shadow bg-light rounded-4 mb-5"
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">buyer</th>
                          <th scope="col">ordered</th>
                          <th scope="col">payment</th>
                          <th scope="col">quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{o?.buyer.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? 'Success' : 'Failed'}</td>
                          <td>{o?.products?.length}Products</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      <div className="row m-2">
                        {o?.products?.map((p, i) => (
                          <ProductCardHorizontal key={i} p={p} remove={false} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
