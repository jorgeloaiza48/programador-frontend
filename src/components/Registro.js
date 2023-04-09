import React from 'react'
import './registro.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Swal from 'sweetalert2'
import CopyRight from './copyRight/CopyRight'
import CottageIcon from '@mui/icons-material/Cottage';
//import axios from "axios"

function Registro() {
    let URL = ""
    const [errorPassword, setErrorPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    //const navigate = useNavigate();
    const [userName, setUsername] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target
        setUsername({ ...userName, [name]: value })
    }

    //Cuando se hace click en el input del password, esta función desaparece el aviso "La contraseña debe tener almenos 5 caracteres"    
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleClickPassword = (e) => {
        setErrorPassword("")
    }
    const handleClickEmail = (e) => {
        setErrorEmail("")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if ((userName.password === undefined || userName.password.length === 0) && (userName.email === undefined || userName.email.length === 0)) {
            setErrorPassword("Debe ingresar una contraseña.")
            setErrorEmail("Debe ingresar un correo electrónico.")
            return
        }
        if (userName.email === undefined || userName.email.length === 0) {
            setErrorEmail("Debe ingresar un correo electrónico.")
            return
        }
        if (userName.password === undefined || userName.password.length === 0) {
            setErrorPassword("Debe ingresar una contraseña.")
            return
        }
        if (userName.password.length < 5) {
            setErrorPassword("La contraseña debe tener almenos 5 caracteres")
            return
        }
        else {
            setIsLoading(true)
            //fetch('https://programador-backend.onrender.com/api/user', {
            //fetch("http://localhost:3001/api/user", {            
            if (process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT') {                
                URL = "http://localhost:3001"
            }
            else {
                URL = 'https://programador-backend.onrender.com'
            }            
            fetch(`${URL}/api/user`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json", 'Accept': 'applicatio/json' },
                body: JSON.stringify(userName)
            })
                .then(response => {
                    if (response.status === 200) {
                        setIsLoading(false)
                        Swal.fire({
                            title: "Usuario Creado con éxito",
                            icon: "success"
                        })
                        window.location.hash = '/login'
                        //navigate('/login') //lleva al formulario de login después de registrarse.  
                    }
                    else {
                        setIsLoading(false)
                        Swal.fire({
                            title: "No se puede crear el usuario porque ya hay uno registrado con el email: " + userName.email,
                            icon: "error"
                        })
                        window.location.hash = '/registro'
                        //navigate('/registro');
                    }
                })
        }
    };

    if (isLoading) {
        Swal.fire({ title: "Enviando datos..." })
        Swal.showLoading()
    }


    return (
        <div className='formRegistro'>
            <Link to="/">
                <div className='divHome'>
                    <CottageIcon sx={{ fontSize: 40 }}></CottageIcon>
                    <p><strong>Inicio</strong></p>
                </div>
            </Link>
            <form onSubmit={handleSubmit}>
                <PersonAddIcon className='personAddIcon' sx={{ fontSize: 45 }}></PersonAddIcon>
                <h4 className='registro'>Registro</h4>
                <div className='containerPrincipal border rounded'>
                    <div classname='containerSecundario'>
                        <div className='form-group d-grid gap-2'>
                            <label>Email:</label>
                            <input type="email" className='form-control' name='email' onChange={handleChange} onClick={handleClickEmail} placeholder="Digite una dirección de correo." /> <br />
                            <p className='errorEmailRegister'>{errorEmail}</p>
                            <label>Contraseña</label>
                            <input type={showPassword ? "password" : "text"} className='form-control' name='password' onChange={handleChange} onClick={handleClickPassword} placeholder="Digite una contraseña de 5 caracteres o más." /> <br />
                            <p className='errorPasswordRegister'>{errorPassword}</p>
                            <button type="submit" className='btn btn-primary'>Registrarse</button>
                            <Link to="/login">Iniciar Sesión</Link>
                            <MailOutlineIcon className='MailOutlineIconRegister'></MailOutlineIcon>
                            <VpnKeyIcon className='VpnKeyIconRegister' onClick={handleShowPassword}></VpnKeyIcon>
                        </div>
                    </div>
                </div>
            </form>
            <CopyRight></CopyRight>
        </div>
    )
}

export default Registro