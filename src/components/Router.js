import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Login from './Login'
import Registro from './Registro'
import NotFound from './NotFound'
import Menu from './Menu'
import Rejilla from './Rejilla'
//import Formulario from './formulario/Formulario';
import FormikContainer from './formulario/FormikContainer'
import OlvidoPassword from './OlvidoPassword'
import TokenExpired from './TokenExpired'
import Inicio from './inicio/Inicio'


export default function Router() {
    return (

        // El HasRouter es para que cargue correctamente las vista según la ruta https://www.youtube.com/watch?v=bv2pdxqVqBc
         <HashRouter> 
             {/* <BrowserRouter>  */}
                <Routes>
                    <Route exact path='/' element={<Inicio />} />
                    <Route exact path='/registro' element={<Registro />} />
                    <Route exact path='/olvidoPassword' element={<OlvidoPassword />} />
                    <Route exact path='/reset-password/:id/:token' element={<TokenExpired />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/menu' element={<Menu />} />
                    <Route exact path='/rejilla' element={<Rejilla />} />
                    {/* <Route exact path='/formulario' element={<Formulario/>} /> */}
                    <Route exact path='/formulario' element={<FormikContainer />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
             {/* </BrowserRouter>  */}
         </HashRouter>
    )
}
