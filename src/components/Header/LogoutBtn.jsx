import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <button
            className="px-6 py-2 text-white bg-gray-700 backdrop-blur-md rounded-full transition duration-300 hover:bg-gray-600 hover:shadow-lg"
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn