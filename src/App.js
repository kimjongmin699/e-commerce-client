import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Menu } from './components/nav/Menu'
import { Toaster } from 'react-hot-toast'
import { PrivateRoute } from './components/routes/PrivateRoute'
import Secret from './pages/Secret'
import { AdminRoute } from './components/routes/AdminRoute'
import AdminCategory from './pages/admin/Category'
import AdminProduct from './pages/admin/Product'
import AdminProductUpdate from './pages/admin/ProductUpdate'
import UserDashboard from './pages/user/Dashboard'
import AdimDashboard from './pages/admin/Dashboard'
import UserProfile from './pages/user/Profile'
import UserOrders from './pages/user/Orders'
import AdminProducts from './pages/admin/Products'
import Shop from './pages/Shop'
import Search from './pages/Search'
import ProductView from './pages/ProductView'
import CategoriesLiset from './pages/CategoriesList'
import CategoryView from './pages/CategoryView'
import Cart from './pages/Cart'
import AdminOrders from './pages/admin/Orders'
//import 'antd/dist/antd.css'

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page Not found
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        duration="3000"
        toastOptions={{
          style: {
            padding: '16px',
            border: '2px solid red',
            color: 'white',
            backgroundColor: 'gray',
          },
        }}
      />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/category/:categoryId" element={<CategoryView />} />
        <Route path="/categories" element={<CategoriesLiset />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdimDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route
            path="admin/product/update/:slug"
            element={<AdminProductUpdate />}
          />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  )
}

export default App
