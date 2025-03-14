import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
// import Register from './Component/pages/Register'
// import Login from './Component/pages/Login'
import LoginForm from './Component/Auth/LoginForm'
import RegisterForm from './Component/Auth/RegisterForm'
import BookContainer from './Component/BookContainer/BookContainer'
import Header from './Component/Common/Header'
import BookDetail from './Component/BookDetail/BookDetail'
import ForgotPassword from './Component/Common/ForgotPassword'
import CartItem from './Component/Order/CartItem'
import MyOrders from './Component/Order/MyOrders'
import MyWatchlist from './Component/Order/MyWatchList'
import UserProfile from './Component/Order/UserProfile'
import PleaseLogin from './Component/Auth/PleaseLogin'
// import Books from './Component/BookContainer/Books'

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} /> */}
        <Route path='/' element={<LoginForm/>} />
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/home' element={<BookContainer/>} />
        <Route path='/header' element={<Header/>} />
        <Route path="/bookDetail/:id" element={<BookDetail />} />
        <Route path='/forgot' element={<ForgotPassword/>} />
        <Route path='/cart' element={<CartItem/>} />
        <Route path='/order' element={<MyOrders/>} />
        <Route path='/watchlist' element={<MyWatchlist/>} />
        {/* <Route path='/book' element={<Books/>} /> */}
        <Route path='/profile' element={<UserProfile/>} />
        <Route path='/plz' element={<PleaseLogin/>} />
        {/* <Route path="/book/:id" element={<BookDetail />} /> */}
      </Routes>
    </div>
  )
}

export default App
