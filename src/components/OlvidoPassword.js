import React from 'react'
import KeyIcon from '@mui/icons-material/Key';
import { Link } from "react-router-dom"
import './olvidoPassword.css'
import { useState } from 'react';
import Swal from 'sweetalert2'
//import { useNavigate } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CopyRight from './copyRight/CopyRight';
import CottageIcon from '@mui/icons-material/Cottage';



export default function OlvidoPassword() {
    let URL = ""
    //const navigate = useNavigate();
    const [userName, setUsername] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUsername({ ...userName, [name]: value })
    }
    const handleClick = (e) => {
        setErrorEmail("")
    }
    const cambiarContraseña = (e) => {
        e.preventDefault()
        //Esta expresión regular valida que el email ingresado es válido en su estructura, es decir, que tenga usuario, arroba(@) y un dominio.
        let filter = new RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i');

        if (userName.email === undefined || userName.email.length === 0) {
            setErrorEmail("Debe ingresar un correo electrónico.")
            return
        }
        if (!filter.test(userName.email)) {
            setErrorEmail("Ingrese una dirección de correo electrónico válida como: ejemplo@gmail.com ó MiEmail@outlook.es ")
            return
        }
        setIsLoading(true)
        // fetch('http://localhost:3001/forgot-password', {
        //fetch('https://programador-backend.onrender.com/forgot-password', {            
        URL = process.env.REACT_APP_ENVIRONMENT  //Cuando se ejecuta npm start, se carga el archivo ".development.env" que a su vez carga el valor "http://localhost:3001"  Cuando se ejecuta "npm run build" se carga el archivo ".production.env"  que a su vez carga el valor "https://programador-backend.onrender.com"
        fetch(`${URL}/forgot-password`, {
            method: 'POST',
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(userName)
        })
            .then(response => {
                if (response.status === 200) {
                    setIsLoading(false)
                    Swal.fire({
                        title: "Se ha enviado un correo a " + userName.email + " para reestablecer la contraseña.",
                        icon: "success"
                    })
                    window.location.hash = '/'
                    // navigate('/')

                }
                else {
                    setIsLoading(false)
                    Swal.fire({
                        title: "El correo ingresado no está registrado.",
                        icon: "error"
                    })
                    window.location.hash = '/olvidoPassword'
                    // navigate('/olvidoPassword')
                }
            })
    }

    if (isLoading) {
        Swal.fire({ title: "Enviando correo..." })
        Swal.showLoading()
    }

    return (
        <div className='formOlvidoPassword'>
            <div className='divHomeOlvidoPass'>
                <Link to="/">
                    <div>
                        <CottageIcon sx={{ fontSize: 40 }}></CottageIcon>
                        <p><strong>Inicio</strong></p>
                    </div>
                </Link>
                <div>
                    <KeyIcon className='keyIcon' sx={{ fontSize: 45 }}></KeyIcon>
                    <p>Cambio de contraseña</p>
                </div>
            </div>

            <form>

                <div className='containerPrincipalOlvidoPass'>
                    <div className='emailOvidoPass'>
                        <label>Email</label>
                        <input type="email" className='form-control' name='email' onChange={handleChange} onClick={handleClick} placeholder="Digite una dirección de correo" required /> <br />
                    </div>
                    <p className='errorEmailOlvidoPassword'>{errorEmail}</p>
                    <div><button type="submit" className='btn btn-primary' onClick={cambiarContraseña}>Enviar</button></div>
                    <div><Link to="/login">Iniciar Sesión</Link></div>
                    <MailOutlineIcon className='MailOutlineIconForgotPassword'></MailOutlineIcon>
                </div>
            </form>
            <div className='copyRightOlvidoPass'><CopyRight></CopyRight></div>
        </div>
    )
}
