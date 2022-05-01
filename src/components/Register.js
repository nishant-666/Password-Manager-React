import React from 'react';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    getAuth
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Register({
    database
}) {
    let navigate = useNavigate();
    const [registerData, setRegisterData] = useState({});
    const collectionRef = collection(database, 'userPasswords')
    const auth = getAuth();
    const onInput = (event) => {
        let data = { [event.target.name]: event.target.value }
        setRegisterData({ ...registerData, ...data })
    }

    const register = () => {
        createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
            .then(response => {
                sessionStorage.setItem('userEmail', response.user.email);
                addDoc(collectionRef, {
                    email: registerData.email,
                    password: registerData.password,
                    passwordsArray: []
                })
                    .then(() => {
                        toast.success("You are now Successfully Registered..");
                        setTimeout(() => {
                            navigate('/')
                        }, 500)
                        // alert('You are now Successfully Registered..')
                    })
                    .catch(err => {
                        toast.error(err.message)
                    })
            })
            .catch(error => {
                alert(error.message)
            })
    }

    return (
        <div className='register-main'>
            <ToastContainer />
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

                    <button
                        className='input-btn'
                        onClick={register}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}
