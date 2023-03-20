import React from 'react'
import {Formik, Form} from 'formik'
import *as Yup from 'yup'
import FormikControl from './FormikControl'
import './formulario.css'

function FormikContainer () {

const checkboxOptions = [
    {key : 'Lunes',    value: 'Lunes'},
    {key: 'Martes',    value: 'martes'},
    {key: 'Miércoles', value: 'miercoles'},
    {key: 'Jueves',    value: 'jueves'},
    {key: 'Viernes',   value: 'viernes'},
]

    const initialValues = {
        duracionCurso: '',
        horasDiarias : '',
        checkboxOptions: []        
    }
    const validationSchema = Yup.object({
        duracionCurso: Yup.string().required('Valor requerido'),
        horasDiarias : Yup.string().required('Valor requerido'),
        checkboxOptions: Yup.array().required('Debe seleccionar una almenos una opción')        
    })
    const onSubmit = values => console.log("Form data ", values)
    return (
        <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        >
        {formik => (
            <Form className='formulario'>
                <FormikControl control='input' type='number' label='Duración del curso' name='duracionCurso'/>
                <FormikControl control='input' type='number' label='Horas diarias' name='horasDiarias'/>
                <FormikControl control='checkbox' label='Días a trabajar' name='checkboxOptions' options={checkboxOptions} />
                <button type='submit'>Crear curso</button>
            </Form>
        )}    
        </Formik>
    )
}

export default FormikContainer


