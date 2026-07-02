import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/authSlice'

const Navbar = () => {

  const {userInfo} = useSelector((state)=>state.userAuth)
  const dispatch = useDispatch();
  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-ink text-paper sticky top-0 z-50'>
        <Link to="/" className="flex items-center gap-2">
          <span className='w-2 h-2 rounded-full bg-coral'></span>
          <h1 className='font-display text-xl font-semibold tracking-tight cursor-pointer'>
            Eventify
          </h1>
        </Link>

        <div className='flex items-center gap-4 sm:gap-6 font-medium text-sm'>
            <Link to="/" className="hover:text-coral transition-colors">Events</Link>
            <Link to="/mybookings" className="hover:text-coral transition-colors">My Bookings</Link>
        </div>

        <div className='flex items-center gap-4 text-sm'>
          {userInfo ? (
            <>
            <span className="hidden sm:inline text-paper/60">Hi, {userInfo.name}</span>
            <button
              onClick={()=> dispatch(logout())}
              className="bg-coral/90 hover:bg-coral text-white px-4 py-1.5 rounded-full font-medium transition-colors"
            >
              Logout
            </button>
            </>
          ):(
            <>
            <Link to="/login" className="hover:text-coral transition-colors">Login</Link>
            <Link
              to="/register"
              className="bg-coral hover:bg-coral/90 text-white px-4 py-1.5 rounded-full font-medium transition-colors"
            >
              Register
            </Link>
          </>
          )}
        </div>
    </nav>
  )
}

export default Navbar
