import React, { useEffect, useState } from 'react';
import {
    onSnapshot,
    collection,
    doc,
    updateDoc,
    where,
    query
} from 'firebase/firestore';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import BasicModal from './Modal';
import { AiFillEye } from 'react-icons/ai';
import PasswordModal from './PasswordsModal';
import { useNavigate } from 'react-router-dom';
export default function Home({
    database
}) {
    const [open, setOpen] = React.useState(false);
    let userEmail = localStorage.getItem('userEmail');
    let auth = getAuth();
    let navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [passwordOpen, setPasswordOpen] = React.useState(false);
    const [showPassword, setShowPassword] = useState({});
    const handlePasswordClose = () => setPasswordOpen(false);
    const collectionRef = collection(database, 'userPasswords');
    const emailQuery = query(collectionRef, where('email', '==', userEmail))
    const [passwordsArray, setPasswordsArray] = useState([]);
    const [passwordObject, setPasswordObject] = useState({});
    const [oldPasswords, setOldPasswords] = useState([]);
    const getPasswords = () => {
        onSnapshot(emailQuery, (response) => {
            setPasswordsArray(response.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }))

            const data = response.docs.map((item) => {
                return { ...item.data(), id: item.id }
            })

            setOldPasswords(data[0].passwordsArray)
        })
    }

    const getPasswordInputs = (event) => {
        const data = { [event.target.name]: event.target.value }
        setPasswordObject({ ...passwordObject, ...data });
    }

    const addPasswords = () => {
        const docToUpdate = doc(database, 'userPasswords', passwordsArray[0].id)
        updateDoc(docToUpdate, {
            passwordsArray: [...oldPasswords, passwordObject]
        })
    }

    const openPasswordModal = (name, password) => {
        setShowPassword({
            name: name,
            password: password
        })
        setPasswordOpen(true)
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
                localStorage.removeItem('userEmail')
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (response) => {
            if(response){
                getPasswords()
            }
            else{
                navigate('/')
            }
        })
    }, [])
    return (
        <div className='home-main'>
            <h1>Home</h1>
            <div className='logout-btn'>
                <button
                    className='input-btn'
                    onClick={logout}
                >
                    Log Out
                </button>
            </div>
            <div className='card-main'>
                <button
                    onClick={handleOpen}
                    className='input-btn add-password'
                >
                    Add a Password
                </button>

                <div className='password-main'>
                    {passwordsArray?.map((password) => {
                        return (
                            <>
                                {password?.passwordsArray?.map((password) => {
                                    return (
                                        <div className='password-data'>
                                            <p className='password-display'>{password.name}</p>
                                            <AiFillEye
                                                size={30}
                                                className='eye-icon'
                                                onClick={() => openPasswordModal(password.name, password.password)}
                                            />
                                            {/* <p className='password-display'>{password.password}</p> */}
                                        </div>
                                    )
                                })}
                            </>
                        )
                    })}
                </div>
            </div>
            <BasicModal
                open={open}
                handleClose={handleClose}
                getPasswordInputs={getPasswordInputs}
                addPasswords={addPasswords}
            />

            <PasswordModal
                open={passwordOpen}
                handleClose={handlePasswordClose}
                showPassword={showPassword}
                originalPassword={passwordsArray[0]?.password}
                handlePasswordClose={handlePasswordClose}
            />
        </div>
    )
}
