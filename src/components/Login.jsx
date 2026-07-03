import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin({userData}));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full px-4 py-8 animate-fade-in'>
        <div className='mx-auto w-full max-w-md bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-indigo-950/20'>
            <div className="mb-6 flex justify-center">
                <Logo />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-white font-heading">
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
                Don&apos;t have an account?&nbsp;
                <Link
                    to="/signup"
                    className="font-semibold text-indigo-400 hover:text-indigo-300 transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-500 mt-6 text-sm text-center bg-red-500/10 border border-red-500/20 py-2 rounded-lg">{error}</p>}
            
            <form onSubmit={handleSubmit(login)} className='mt-6'>
                <div className='space-y-5'>
                    <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                matchPattern: (value) => 
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <Button
                        type="submit"
                        className="w-full mt-2"
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login