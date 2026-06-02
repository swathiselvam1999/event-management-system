import { useState } from 'react'
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { loginSuccess } from '../redux/authSlice'
import axios from "axios"
import { Link } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post(`${API_URL}auth/login`,{
                email,
                password
            })
            dispatch(loginSuccess(data));
            navigate("/")
        }catch(err){
            setError(err.response?.data?.message || "Login Failed")
        }
    }

    

  return (
    <div className='max-w-md mx-auto mt-10 p-6 shadow-xl rounded bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        {error && <p className='text-red-600'>{error}</p>}
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input 
                type="email"
                placeholder='Enter email'
                className='border p-2 rounded'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type='submit' className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Login
            </button>
        </form>
        <p className='mt-4'>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
                Register
            </Link>
        </p>
    </div>
  )
}

export default LoginPage