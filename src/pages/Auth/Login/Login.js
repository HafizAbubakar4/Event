import { Input } from 'antd';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "config/firebase"


const initialState = { email: "", password: "" }
export default function Login() {
  const navigate = useNavigate()
  const [state, setState] = useState(initialState);
  const [isProcessing , setIsProcessing] = useState(false)

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))

  }
  const handleLogin = (e) => {
    e.preventDefault();
    setIsProcessing(true)
    let {email,password} = state;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      navigate('/dashboard')
    })
    .catch((error) => {
     console.error(error);
    });
  }


  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-4 offset-lg-4">
            <div className="card p-2 p-md-3 p-lg-4 rounded-2">
              <div className="row">
                <div className="col">
                  <h3 className='mb-4'>LOGIN</h3>
                </div>
              </div>
           <form onSubmit={handleLogin}>
           <div className="row mb-3">
                <div className="col">
                  <label htmlFor='email' className='mb-1'>Email</label>
                  <input type='email' className='form-control' placeholder='Email' name='email' onChange={handleChange} />
                </div>
              </div>
              <div className="row mb-3">
                  <div className="col">
                    <label htmlFor='password' className='mb-1'>password</label>
                      <Input.Password
                        placeholder="input password"
                        name='password'
                        onChange={handleChange}
                        className='w-100'
                      />
                  </div>
                </div>
              <div className="row mb-3">
                <div className="col">
                  <button className='w-100 py-2 rounded-3' disabled={isProcessing}>
                    {!isProcessing ? "Login" 
                    : <div className='spinner-grow spinner-grow-sm'></div>}
                  </button>
                </div>
              </div>
           </form>
                  <div className="mt-2">Did Not have an Account
                    <Link to='/auth/register' className='fs-6 text-info text-center'> Register Here</Link>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
