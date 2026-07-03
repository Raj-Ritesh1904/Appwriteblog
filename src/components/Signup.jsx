import {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login({userData}));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center w-full px-4 py-8 animate-fade-in">
        <div className='mx-auto w-full max-w-md bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-indigo-950/20'>
            <div className="mb-6 flex justify-center">
                <Logo />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-white font-heading">
                Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-semibold text-indigo-400 hover:text-indigo-300 transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-500 mt-6 text-sm text-center bg-red-500/10 border border-red-500/20 py-2 rounded-lg">{error}</p>}

            <form onSubmit={handleSubmit(create)} className="mt-6">
                <div className='space-y-5'>
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: "Full Name is required",
                        })}
                    />
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
                        placeholder="Create a password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <Button type="submit" className="w-full mt-2">
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup