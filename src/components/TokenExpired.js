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
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function TokenExpired() {
  let URL = ""
  const [resetPassword, setResetpassword] = useState(false)
  const { id, token } = useParams() //useParams returns an object with value/key pairs of the dinamic params from the current URL

  URL = process.env.REACT_APP_ENVIRONMENT //Cuando se ejecuta npm start, se carga el archivo ".development.env" que a su vez carga el valor "http://localhost:3001"  Cuando se ejecuta "npm run build" se carga el archivo ".production.env"  que a su vez carga el valor "https://programador-backend.onrender.com"
  let options = {
    method: 'GET',
    headers: { "Content-Type": "Application/json" },
    // url:`http://localhost:3001/reset-password/${id}/${token}`
    //url:`https://programador-backend.onrender.com/reset-password/${id}/${token}`
    url: `${URL}/reset-password/${id}/${token}`
  }
  //fetch(`http://localhost:3001/reset-password/${id}/${token}`,options)
  axios(options)
    .then(response => {
      console.log("Response --->>> ", response)
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
        <div className='LinkOffIcon'><LinkOffIcon sx={{ fontSize: 120 }}></LinkOffIcon></div>
        <div><h1>¡El enlace ya no es válido!</h1></div>
        <div className='botonesEnlaceNoValido'>
          <Link to="/login"><button class="btn btn-primary">{<LoginIcon />} Iniciar sesión</button></Link>
          <Link to="/registro"><button class="btn btn-success" >{<PersonAddIcon />}Registrarse</button></Link>
          <div><Link to="/olvidoPassword"><button class="btn btn-warning" >{<SyncIcon />}Recuperar contraseña</button></Link></div>
        </div>
        <div className='copyRightTokenExpired'><CopyRight></CopyRight></div>
      </div>
    )
  }


}
