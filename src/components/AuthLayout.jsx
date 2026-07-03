import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
    }, [authStatus, navigate, authentication])

    const shouldShow = authentication ? authStatus === true : authStatus === false;

    return shouldShow ? <>{children}</> : (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="w-8 h-8 border-4 border-t-indigo-500 border-r-transparent border-slate-700 rounded-full animate-spin"></div>
        </div>
    )
}