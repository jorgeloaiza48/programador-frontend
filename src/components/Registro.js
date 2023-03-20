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

    const [errorPassword, setErrorPassword] = useState("")
    //const navigate = useNavigate();
    const [userName, setUsername] = useState("")
    const [showPassword, setShowPassword] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUsername({ ...userName, [name]: value })
    }

    //Cuando se hace click en el input del password, esta función desaparece el aviso "La contraseña debe tener almenos 5 caracteres"
    const handleClick = (e) => {
        setErrorPassword("")
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userName.password.length < 5) {
            setErrorPassword("La contraseña debe tener almenos 5 caracteres")
            return
        }
        else {
            //fetch('https://programador-cursos.onrender.com/api/user', {
                fetch('http://localhost:3001/api/user',{                
                //mode:'no-cors',
                method: 'POST',
                headers: { "Content-Type": "application/json", 'Accept': 'applicatio/json' },
                body: JSON.stringify(userName)
            })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        Swal.fire({
                            title: "Usuario Creado con éxito",
                            icon: "success"
                        })
                        window.location.hash = '/login'
                        //navigate('/login') //lleva al formulario de login después de registrarse.  
                    }
                    else {
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
                            <input type="email" className='form-control' name='email' onChange={handleChange} placeholder="Digite una dirección de correo." required /> <br />
                            {/* {errorEmail && <p className='errorEmail' >{errorEmail}</p>} */}
                            <label>Contraseña</label>
                            <input type={showPassword ? "password" : "text"} className='form-control' name='password' onChange={handleChange} onClick={handleClick} placeholder="Digite una contraseña de 5 caracteres o más." required /> <br />
                            <p className='errorPassword'>{errorPassword}</p>
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