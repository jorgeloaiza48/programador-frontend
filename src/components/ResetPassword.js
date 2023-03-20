import React from 'react'
import { useState } from 'react';
import './resetPassword.css'
import LockResetIcon from '@mui/icons-material/LockReset';
import LoginIcon from '@mui/icons-material/Login';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom"
//import { useNavigate } from 'react-router-dom'
import SyncLockIcon from '@mui/icons-material/SyncLock';
import CopyRight from './copyRight/CopyRight';
import CottageIcon from '@mui/icons-material/Cottage';



export default function ResetPassword() {

    //const navigate = useNavigate();
    const [userName, setUsername] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUsername({ ...userName, [name]: value })
    }
    const handleClick = (e) => {
        e.preventDefault()
        setErrorPassword("")
        setErrorConfirmPassword("")
    }
    const handleShowPassword = () =>{
        setShowPassword(!showPassword)
    }
    const handleShowPasswordConfirm = () =>{
        setShowPasswordConfirm(!showPasswordConfirm)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if ((userName.password === undefined || userName.password.length === 0) && (userName.confirmpassword === undefined || userName.confirmpassword.length === 0)) {
            setErrorPassword("Debe ingresar una contraseña.")
            setErrorConfirmPassword("Debe ingresar una contraseña.")
            return
        }
        if (userName.password === undefined || userName.password.length === 0) {
            setErrorPassword("Debe ingresar una contraseña.")
            return
        }
        if (userName.confirmpassword === undefined || userName.confirmpassword.length === 0) {
            setErrorConfirmPassword("Debe confirmar la contraseña.")
            return
        }
        if (userName.password.length < 5) {
            setErrorPassword("La contraseña debe tener almenos 5 caracteres")
            return
        }
        if (userName.password !== userName.confirmpassword) {
            Swal.fire({
                title: "Las contraseñas ingresadas no coinciden",
                icon: "warning"
            })
            return
        }
        fetch('http://localhost:3001/reset-password/:id/:token', {
            method: 'POST',
            headers: {"mode": 'no-cors',"Content-Type": "Application/json" },
            body: JSON.stringify(userName)
        })
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "La contraseña se cambió con éxito",
                        icon: "success"
                    })
                    window.location.hash = '/login'
                    // navigate('/login') //lleva al formulario de login después de cambiar la contraseña.  
                }
                else{
                    Swal.fire({
                        title: "El enlace ya no es válido",
                        icon: "error"
                    })
                }
                
            })
    }

    return (
        <div className='formRegistro'>
              <Link to="/">
                <div className='divHome'>
                    <CottageIcon sx={{ fontSize: 40 }}></CottageIcon>
                    <p><strong>Inicio</strong></p>
                </div>
            </Link>
            <form >          
                <LockResetIcon className='LockResetIcon' sx={{ fontSize: 45 }}></LockResetIcon>
                <Link to="/login"><div className='logInResetPassword'><LoginIcon sx={{ fontSize: 35 }}></LoginIcon><p>Log in</p></div></Link>
                <h4 className='textoReseteoContraseña'>Recuperación de Contraseña</h4>
                <div className='containerPrincipalResetPassword border rounded'>
                    <div classname='containerSecundario'>
                        <div className='form-group d-grid gap-2'>
                            <label>Contraseña</label>
                            <input type={showPassword ? "password": "text"} className='form-control' name='password' onChange={handleChange} onClick={handleClick} placeholder="Digite una contraseña" /> <br />
                            <p className='errorEmailOlvidoPassword'>{errorPassword}</p>
                            <label>Confirme Contraseña</label>
                            <input type={showPasswordConfirm ? "password": "text"} className='form-control' name='confirmpassword' onChange={handleChange} onClick={handleClick} placeholder="Confirme la contraseña" /> <br />
                            <p className='errorEmailOlvidoPassword'>{errorConfirmPassword}</p>
                            <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Enviar</button>
                            <SyncLockIcon className='SyncLockIconResetPassword' onClick={handleShowPassword}></SyncLockIcon>
                            <SyncLockIcon className='SyncLockIconResetPassword2' onClick={handleShowPasswordConfirm}></SyncLockIcon>
                        </div>
                    </div>
                </div>
            </form>
            <CopyRight></CopyRight>
        </div>
    )
}
