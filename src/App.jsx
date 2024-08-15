import './App.css'

import { Outlet } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import auth from './appwrite/auth_service'
import { login, logout } from './store/authSlice'
function App() {

  const [Isloading, setIsloading]= useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    auth.getUser().
                then((data)=>{
                    if(data){
                      dispatch(login({data}))
                    }
                    else dispatch(logout())
                }).
                finally(()=>setIsloading(false))
  },[])
  return !Isloading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

  
}

export default App
