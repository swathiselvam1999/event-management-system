import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/authSlice'

const Navbar = () => {

  const {userInfo} = useSelector((state)=>state.userAuth)
  const dispatch = useDispatch();
  return (
    <nav className='flex justify-between p-4 bg-blue-400 text-white'>
        <Link to="/">
          <h1 className='text-xl font-bold cursor-pointer'>
            Event Booking
          </h1>
        </Link>
        <div className='flex gap-4'>
          {userInfo ? (
            <>
            <span>{userInfo.name}</span>
            <button 
              onClick={()=> dispatch(logout())}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
            </>
          ):(
<>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
          )}
        </div>
        <div className='space-x-4 font-bold'>
            <Link to="/">Home</Link>
            <Link to="/mybookings">My Bookings</Link>
        </div>
    </nav>
  )
}

export default Navbar