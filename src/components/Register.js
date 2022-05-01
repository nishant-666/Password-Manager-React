import React from 'react';
import { useState } from 'react';

export default function Register() {
    const [registerData, setRegisterData] = useState({});

    const onInput = (event) => {
        let data = {[event.target.name]: event.target.value}
        setRegisterData({...registerData, ...data})
    }
    
    return (
        <div className='register-main'>
            <h1>Register</h1>

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
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}
