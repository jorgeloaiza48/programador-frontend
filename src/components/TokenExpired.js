import React from 'react'
import ResetPassword from './ResetPassword'
import { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SyncIcon from '@mui/icons-material/Sync';
import { Link } from "react-router-dom"
import './tokenExpired.css'
import CopyRight from './copyRight/CopyRight';
import LinkOffIcon from '@mui/icons-material/LinkOff';


export default function TokenExpired() {

  const [resetPassword, setResetpassword] = useState(false)

  fetch('http://localhost:3001/reset-password/:id/:token', {
    method: 'GET',
    headers: {"mode": 'no-cors',"Content-Type": "Application/json"}
  })
    .then(response => {
      if (response.status === 200) {
        setResetpassword(true)
      }
    })

  if (resetPassword) {
    return <ResetPassword />
  }
  else {
    return (
      <div className='DivbotonesEnlaceNoValido'>
        <LinkOffIcon className='LinkOffIcon' sx={{ fontSize: 120 }}></LinkOffIcon>
        <h1>¡El enlace ya no es válido!</h1>
        <div className='botonesEnlaceNoValido'>
          <Link to="/login"><button class="btn btn-primary">{<LoginIcon />} Iniciar sesión</button></Link>
          <Link to="/registro"><button class="btn btn-success" >{<PersonAddIcon />}Registrarse</button></Link>
          <Link to="/olvidoPassword"><button class="btn btn-warning" >{<SyncIcon />}Recuperar contraseña</button></Link>
        </div>
        <CopyRight></CopyRight>
      </div>
    )
  }


}
