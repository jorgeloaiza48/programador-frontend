//Este componente permite cerrar la sesión por inactividad  https://codesandbox.io/s/confirm-prompt-y8ew9s?file=/src/App.tsx:259-318

import { useIdleTimer } from 'react-idle-timer'
import React from 'react'
//import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
//import Cookie from 'js-cookie'
import Cookies from 'universal-cookie'

const timeout = 600000 //Para cierre de sesión en 10 minutos
const promptBeforeIdle = 1000

function SessionExpired() {
    //const [remaining, setRemaining] = useState(timeout)
    const cookies = new Cookies()

    const onIdle = () => {
        cookies.remove('email', { path: "/" })
        window.location.hash = '/login'
        Swal.fire({
            title: "La sesión expiró por inactividad. Inicie sesión de nuevo.",
            icon: "info"
        })
    }
    const {getRemainingTime} = useIdleTimer({
        onIdle,
        timeout,
        promptBeforeIdle,
        throttle: 500
    })
    console.log(getRemainingTime)
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setRemaining(Math.ceil(getRemainingTime() / 1000))            
    //     }, 500)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // })     
    // const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0)    
    // const seconds = timeTillPrompt > 1 ? 'seconds' : 'second'   
    
    return (
        <div>           
            {/* <p>{timeTillPrompt} {seconds} until prompt</p> */}
        </div>
    )
}
export default SessionExpired