import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function PasswordModal({
    open,
    handleClose,
    showPassword,
    originalPassword,
    handlePasswordClose
}) {
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const validatePassword = () => {
        if (newPassword === originalPassword) {
            toast.success("Password Validated..")
            setShowNewPassword(true)
        }
        else{
            toast.error("Please Enter the Right Password")
        }
    }

    const closeModal = () => {
        handlePasswordClose();
        setShowNewPassword(false)
    }
    return (
        <div>
            <ToastContainer />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='modal-main'>
                    <div className='close-icon'>
                        <AiOutlineCloseCircle onClick={closeModal}/>
                    </div>
                    {showNewPassword ? (
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            The Password for {showPassword.name} is {showPassword.password}
                        </Typography>
                    ) : (
                        <>
                            <input
                                placeholder='Enter your Login Password'
                                className='input-fields'
                                onChange={(event) => setNewPassword(event.target.value)}
                                name='password'
                                type={'password'}
                            />
                            <button
                                className='input-btn'
                                onClick={validatePassword}
                            >
                                Validate
                            </button>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
