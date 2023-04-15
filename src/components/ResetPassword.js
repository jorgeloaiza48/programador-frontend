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
import { useParams } from 'react-router-dom';



export default function ResetPassword() {
    let URL = ""
    //const navigate = useNavigate();
    const { id } = useParams() //useParams returns an object with value/key pairs of the dinamic params from the current URL
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
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowPasswordConfirm = () => {
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
        // fetch(`http://localhost:3001/reset-password/${id}`, {
        //fetch(`https://programador-backend.onrender.com/reset-password/${id}`, {        
        URL = process.env.REACT_APP_ENVIRONMENT //Cuando se ejecuta npm start, se carga el archivo ".development.env" que a su vez carga el valor "http://localhost:3001"  Cuando se ejecuta "npm run build" se carga el archivo ".production.env"  que a su vez carga el valor "https://programador-backend.onrender.com"
        fetch(`${URL}/reset-password/${id}`, {
            method: 'POST',
            headers: { "Content-Type": "Application/json" },
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
                else {
                    Swal.fire({
                        title: "El enlace ya no es válido",
                        icon: "error"
                    })
                }

            })
    }

    return (
        <div className='formRegistro'>

            <div className='divHomeResetPass'>
                <Link to="/">
                    <CottageIcon sx={{ fontSize: 40 }}></CottageIcon>
                    <p><strong>Inicio</strong></p>
                </Link>
                <LockResetIcon className='LockResetIcon' sx={{ fontSize: 45 }}></LockResetIcon>
                <Link to="/login"><div className='logInResetPassword'><LoginIcon sx={{ fontSize: 35 }}></LoginIcon><p>Log in</p></div></Link>
            </div>

            <form >
                <h4 className='textoReseteoContraseña'>Recuperación de Contraseña</h4>
                <div className='containerResetPass'>
                    <div>
                        <label>Contraseña</label>
                        <input type={showPassword ? "password" : "text"} className='form-control' name='password' onChange={handleChange} onClick={handleClick} placeholder="Digite una contraseña" /> <br />
                    </div>
                    <p className='errorEmailOlvidoPassword1'>{errorPassword}</p>
                    <div>
                        <label>Confirme Contraseña</label>
                        <input type={showPasswordConfirm ? "password" : "text"} className='form-control' name='confirmpassword' onChange={handleChange} onClick={handleClick} placeholder="Confirme la contraseña" /> <br />
                    </div>
                    <p className='errorEmailOlvidoPassword2'>{errorConfirmPassword}</p>
                    <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Enviar</button>
                    <SyncLockIcon className='SyncLockIconResetPassword' onClick={handleShowPassword}></SyncLockIcon>
                    <SyncLockIcon className='SyncLockIconResetPassword2' onClick={handleShowPasswordConfirm}></SyncLockIcon>

                </div>
            </form>
            <div className='copyRightResetPass'><CopyRight></CopyRight></div>
        </div>
    )
}
