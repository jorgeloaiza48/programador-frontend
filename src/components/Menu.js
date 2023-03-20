import React from 'react'
import { Cookies } from 'react-cookie'
import { useEffect } from 'react'

const cookies = new Cookies()

export default function Menu() {
    
    console.log('email :' + cookies.get('email'))
   

    const cerrarSesion = () => {       
        cookies.remove('email', { path: "/" })
        window.location.href = './login'
    }

    //Si no se ha iniciado sesión y se escribe en la barra de direcciones '/menu' entonces lo redirige al login
    useEffect(() => {
        if (!cookies.get('email')) {
            window.location.href = "./login"
        }
    })
    return (
        <div>
            <h1>Menú</h1> <br />
            <h1>Bienvenido(a) al menú principal {cookies.get('email')}</h1>
            <button type="submit" className='btn btn-primary' onClick={cerrarSesion} >Cerrar Sesión</button>
        </div>
    )
}
