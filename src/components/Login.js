import React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const [loginData, setLoginData] = useState({});
  const auth = getAuth();
  const onInput = (event) => {
    let data = { [event.target.name]: event.target.value }
    setLoginData({ ...loginData, ...data })
  }
  let navigate = useNavigate();
  const login = () => {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((response) => {
        localStorage.setItem('userEmail', response.user.email)
        toast.success("You are now Successfully Logged In..");
        setTimeout(() => {
          navigate('/home')
        }, 500)
      })
      .catch(err => {
        alert(err.message)
      })
  }

  return (
    <div className='register-main'>
      <ToastContainer />
      <h1>Login</h1>

      <div className='card-main'>
        <div className='inputs-container'>
          <input
            placeholder='Enter your Email'
            className='input-fields'
            onChange={onInput}
            type='email'
            name='email'
          />
          <input
            placeholder='Enter your Password'
            className='input-fields'
            onChange={onInput}
            name='password'
            type={'password'}
          />
          <button
            className='input-btn'
            onClick={login}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
