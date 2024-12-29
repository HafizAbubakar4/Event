import React, { useContext } from 'react'
import { BrowserRouter , Routes , Route , Navigate } from "react-router-dom";

import Auth from './Auth'
import Dashboard from './Dashboard'
import Frontend from './Frontend'
import { AuthContext } from 'context/AuthContext';

export default function Index() {
  const { isAuth , user } = useContext(AuthContext);
  console.log("user =>>>>>>  " , user);
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path = "/*" element={<Frontend/>} />
        <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/dashboard" />} />
        <Route path='/dashboard/*' element={<Dashboard/>} />


      </Routes>
    
    </BrowserRouter>
  )
}
