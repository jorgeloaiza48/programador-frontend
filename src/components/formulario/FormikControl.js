import React from 'react'
import Input from './Input'
import CheckboxGroup from './CheckboxGroup'

function FormikControl(props){
    const {control, ...rest} = props
    switch (control){
        case 'input': return <Input {...rest} />
        case 'checkbox' : return <CheckboxGroup {...rest} />
        default: return null
    }
}

export default FormikControl