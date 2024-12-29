import { Input} from 'antd';
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth ,firestore } from "config/firebase"
import { doc, setDoc } from 'firebase/firestore/lite';
import { AuthContext } from 'context/AuthContext';

const initialState = { email: "", password: "" }
export default function Register() {

const {dispatch} = useContext(AuthContext)
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))

  }
  const handleRegister = (e) => {
    e.preventDefault();
    let { email, password } = state;
    setIsProcessing(true)
    // const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        addDocment(user)
        console.log("user created");
        setIsProcessing(false)
      })
      .catch((error) => {
       console.error(error);
       setIsProcessing(false)
      });
  }

  const addDocment = async (user) => {
    await setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      email: user.email
    })
    console.log("user document created at fireStore ");
    dispatch({ type: 'LOGIN' })
    setIsProcessing(false)
  }


  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-4 offset-lg-4">
            <div className="card p-2 p-md-3 p-lg-4 rounded-2">
              <div className="row">
                <div className="col">
                  <h3 className='mb-4'>Register</h3>
                </div>
              </div>
              <form onSubmit={handleRegister}>
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
                      {!isProcessing ? "Register"
                        : <div className='spinner-grow spinner-grow-sm'></div>}
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-2">Allready have an Account
                <Link to='/auth/login' className='fs-6 text-info text-center'> Login Here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
