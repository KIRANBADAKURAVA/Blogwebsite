import React from "react"
import { useDispatch } from 'react-redux'
import auth from "../../appwrite/auth_service"
import { logout } from "../../store/authSlice"

export default function Logout(){
    const dispatch= useDispatch()


    function logouthandler(){
        auth.logout().then(()=>dispatch(logout()))
    }

    return(
        <button
         className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logouthandler}
        >Logout</button>
    )
}