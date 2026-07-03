import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import {useNavigate} from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/login')
        })
    }
  return (
    <button
      className='px-4 py-2 text-sm sm:text-base font-semibold text-white bg-red-600/90 hover:bg-red-600 rounded-lg hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98] transition-all duration-200 cursor-pointer'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn