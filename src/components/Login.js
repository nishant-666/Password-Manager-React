import React from 'react';
import { useState } from 'react';

export default function Login() {
  const [loginData, setLoginData] = useState({});

  const onInput = (event) => {
    let data = { [event.target.name]: event.target.value }
    setLoginData({ ...loginData, ...data })
  }

  return (
    <div className='register-main'>
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
          <button className='input-btn'>
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
