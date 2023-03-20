import React from 'react'
import './formulario.css'
import {useFormik } from 'formik'

export default function Formulario() {
    const formik = useFormik({
        initialValues:{
            duracionCurso:0,
            horasDiariasTrabajo:0
        },
        onSubmit: values => {
            console.log("Form data ", values)
        }
    })
   
    return (
        <div className='formulario'>
            
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='duracionCurso'>Duración del curso</label>
                <input type='number' id='duracionCurso' name='duracionCurso' onChange={formik.handleChange} value={formik.values.duracionCurso}/>

                <label htmlFor='horasDiariasTrabajo'>Horas diarias de trabajo</label>
                <input type='number' id='horasDiariasTrabajo' name='horasDiariasTrabajo' onChange={formik.handleChange} value={formik.values.horasDiariasTrabajo} />                
               

                <button type='submit'>Crear curso</button>
                <button>Cancelar</button>

            </form>
        </div>
    )
}
