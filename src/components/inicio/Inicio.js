import React from 'react'
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from "react-router-dom"
import CopyRight from '../copyRight/CopyRight';
import './inicio.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Inicio() {

    // const styles = {
    //     copyright: {
    //         color: "#2874A6",
    //         position: "fixed"
    //     },
    //     DivBotonesInicio:{
    //         display: "flex",
    //         flexdirection: "column",    
    //         padding: "50px",
    //         textalign: "center",
    //     }
    // }
    return (
        <div className='DivBotonesInicio'>
            <div><CalendarMonthIcon sx={{ fontSize: 150 }}></CalendarMonthIcon></div>
            <h1>Programador de cursos</h1>
            <div className='botonesInicio'>
                <Link to="/login"><button class="btn btn-primary">{<LoginIcon />} Iniciar sesión</button></Link>
                <Link to="/registro"><button class="btn btn-success" >{<PersonAddIcon />}Registrarse</button></Link>
            </div>

            <CopyRight ></CopyRight>

        </div>
    )
}

export default Inicio