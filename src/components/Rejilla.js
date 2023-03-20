
import './rejilla.css'
import { HotTable } from '@handsontable/react'
import 'handsontable/dist/handsontable.full.css';
import { registerAllModules } from 'handsontable/registry'
import 'handsontable/dist/handsontable.full.min.css';
import backGroundColorFestivos from './rellenoFestivos';
import { Cookies } from 'react-cookie'
import { useRef, useState, useEffect } from 'react';
import todosLosMeses from './meses/todosLosMeses';
import nombreMeses from './nombreMeses/nombreMeses';
import palabraHora from './palabraHora/palabraHora';
import horasEnNumeros from './horasEnNumeros/horasEnNumeros';
import sumarHorasParciales from './sumarHorasParciales/sumarHorasParciales';
import colorRGB from './generarColor/generarColor';
import Swal from 'sweetalert2'
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HelpIcon from '@mui/icons-material/Help';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import QuizIcon from '@mui/icons-material/Quiz';
import CopyRight from './copyRight/CopyRight';




function Rejilla() {

  const avatarStyle = {
    backgroundColor: "rgba(210,180,140)",
    boxShadow: 5
  };
  // const override = {
  //   display: "block",
  //   margin: 30,    
  // };

  const hot = useRef(null)
  const cookies = new Cookies()
  //const [horasDiariasTrabajo, sethorasDiariasTrabajo] = useState(0)
  const [userResult, setUserResult] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //const [userCambio, setUserCambio] = useState(0)

  //Permite obtener todas las funciones de "handsontable"
  registerAllModules()

  //****Crea un arreglo de 24 filas por 250 columnas(24x250)
  let Data = new Array(24) //crea un array de 25 posiciones(filas)
  for (let i = 0; i < 24; i++) {  //este ciclo coloca en cada posición un array de 250 posiciones(columnas)
    Data[i] = new Array(250)
  }

  Data[21][16] = "Total Horas"
  Data[21][40] = "Total Horas"
  Data[21][61] = "Total Horas"
  Data[21][85] = "Total Horas"
  Data[21][108] = "Total Horas"
  Data[21][130] = "Total Horas"
  Data[21][154] = "Total Horas"
  Data[21][176] = "Total Horas"
  Data[21][199] = "Total Horas"
  Data[21][222] = "Total Horas"
  Data[21][244] = "Total Horas"

  //Este código llena de ceros las celdas donde van las horas parciales de cada curso en cada mes
  // let coordenadasCeros = [[1, 8], [22, 29], [46, 53], [67, 74], [91, 98], [114, 121], [136, 143], [160, 167], [182, 189], [205, 212], [228, 235]]
  // for (let i = 0; i <= coordenadasCeros.length - 1; i++) {
  //   for (let j = coordenadasCeros[i][0]; j <= coordenadasCeros[i][1]; j++) {
  //     hot.current.hotInstance.getCell(22, j).innerHTML = 0
  //     //Data[22][j] = 0
  //   }
  // }


  //Esta función imprime el nombre de los meses sobre las celdas combinadas
  nombreMeses(Data)

  //Esta función imprime la palabra "hora" en cada columna donde inicia cada mes
  palabraHora(Data)

  //Esta función imprime las iniciales de los días de la semana acorde al mes(L,M,m,J,V)
  // También coloca los valores correspondientes a cada hábil de cada mes 
  todosLosMeses(Data)

  //*******Este bloque imprime las horas desde las 6 am hasta las 22 horas.******/
  horasEnNumeros(Data)

  //Esta función borra toda la programación del año
  function deleteWholeProgramming() {
    Swal.fire({
      title: "¿Está seguro que desea borrar toda la programación del año?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      buttons: true,
      showCancelButton: true,
      dangerMode: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          fetch("http://localhost:3001/borrar-toda-programacion", {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ email: cookies.get('email') })
          })
            .then(() => console.log("Se envió la información al servidor para borrar la programación de todo el año"))
            .then(() => Swal.fire({
              title: "Se borró toda la programación del año en el servidor.",
              icon: "success"
            }))
            .then((reinicio) => {
              if (reinicio) {
                window.location.reload()
              }
            })
        }
      });
  }

  let coloresDeRellenoGenerados = [] //Este array irá guardando los colores que se generen.
  //let columnaDondeSeGeneraElColor = new Array(coloresDeRellenoGenerados.length) //Este array guarda la columna donde se hace click para saber si el color generado es de cierto mes.


  //////////////////////////Trying to implement Redux///////////////////////////////////////////////
  //const initialReduxStoreState = Data
  //const hotSettings = useSelector(state => state);
  //const dispatch = useDispatch()

  // const onBeforeHotChange = changes => {
  //   reduxStore.dispatch({
  //     type: 'updateData',
  //     dataChanges: changes
  //   });
  //   return false
  // }
  // Action reducers for callbacks triggered by Handsontable
  // const updates = (state = initialReduxStoreState, action) => {
  //   switch (action.type) {
  //     case 'updateData':
  //const newData = state.data.slice(0);       
  // for (let [row, column, , newValue] of action.dataChanges) {
  //   newData[row][column] = newValue;
  // }
  // console.log("newData ", newData)
  // return { Data: newData };
  //       const newData = [...state.Data]
  //       action.dataChanges.forEach(([row, column, , newValue]) => {
  //         newData[row][column] = newValue;
  //       })
  //       return {
  //         ...state,
  //         Data: newData
  //       }
  //     default:
  //       return state;
  //   }
  // };

  // const reduxStore = createStore(updates);
  // console.log("Estado inicial ", reduxStore.getState())
  // const settings = reduxStore.getState().updates;
  // console.log("Este es Settings ", settings)
  // reduxStore.subscribe(() => {
  //   console.log("Cambio de estado :", reduxStore.getState())
  // })
  //////////////////End of Trying to implement Redux////////////////////////////////////////////

  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Está seguro que desea cerrar la sesión?",
      icon: "question",
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          cookies.remove('email', { path: "/" })
          window.location.hash = '/login'
          //window.location.href = './login'
        }
      })
  }
  //Si no se está logueado y en la barra de direcciones /rejilla entonces redirige al login.
  useEffect(() => {
    if (!cookies.get('email')) {
      window.location.hash = "/login"
      //window.location.href = "./login"
    }
  })

  const obtenerDatos = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("https://api.myjson.online/v1/records/8eee4469-38fd-495a-a73e-34c01fb914a8", requestOptions)
      .then((data) => data.json())      
      .then((user) => user.data.filter(element => element.email === cookies.get('email')))      
      .then(user => setUserResult(user))
      .then(() => setIsLoading(false))
  }


  // const obtenerDatos = async () => {
  //   const data = await fetch('https://programador-cursos.onrender.com/api/usuarios-registrados')
  //   const user = await data.json()
  //   const userResultFilter = user.filter(element => element.email === cookies.get('email'))
  //   setUserResult(userResultFilter)
  //   setIsLoading(false)
  //   console.log("Esto es userResult fuera de cells ", userResult)
  //   console.log("Esto es userResult[0] fuera de Cells ", userResult[0])
  //   console.log("Esto es la longitud de UserResult ", userResult.length)
  // }

  // const obtenerDatos = () => {
  //   fetch('http://localhost:3001/usuarios-registrados')
  //     .then((data) => data.json())
  //     .then((user) => user.filter(element => element.email === cookies.get('email')))
  //     .then((user) => setUserResult(user))
  //   setIsLoading(false)
  //   console.log("Esto es userResult fuera de cells ", userResult)
  //   console.log("Esto es userresult[0] fuera de Cells ", userResult[0])
  // }


  useEffect(() => {
    obtenerDatos()
  }, [])

  if (isLoading) {
    return (
      <><div className='cargando'>
        <div className='spinner'>
          <ClimbingBoxLoader              //https://www.npmjs.com/package/react-spinners
            color={"#36d7b7"}
            loading={true}
            // cssOverride={override}
            size={50}
          />
        </div>
        <h1>Cargando Datos y actualizando...</h1>
      </div>

      </>
    )
  }

  return (

    <div className="rejilla" >

      <h4>Bienvenido {cookies.get('email')}</h4>

      <HotTable
        ref={hot}
        data={Data}
        viewportRowRenderingOffset={70} //Esta línea es para que las celdas pintadas se conserven asi cuando se avanza con la barra de desplazamiento horizontal.
        viewportColumnRenderingOffset={250} //Esta línea es para que las celdas pintadas se conserven asi cuando se avanza con la barra de desplazamiento horizontal.
        // rowHeaders={true}
        // colHeaders={true}        
        mergeCells={[{ row: 1, col: 1, rowspan: 1, colspan: 20 }, { row: 1, col: 22, rowspan: 1, colspan: 23 }, { row: 1, col: 46, rowspan: 1, colspan: 20 }, { row: 1, col: 67, rowspan: 1, colspan: 23 }, { row: 1, col: 91, rowspan: 1, colspan: 22 }, { row: 1, col: 114, rowspan: 1, colspan: 21 }, { row: 1, col: 136, rowspan: 1, colspan: 23 }, { row: 1, col: 160, rowspan: 1, colspan: 21 }, { row: 1, col: 182, rowspan: 1, colspan: 22 }, { row: 1, col: 205, rowspan: 1, colspan: 22 }, { row: 1, col: 228, rowspan: 1, colspan: 21 }, { row: 21, col: 16, rowspan: 1, colspan: 5 }, { row: 22, col: 16, rowspan: 1, colspan: 5 }, { row: 21, col: 40, rowspan: 1, colspan: 5 }, { row: 22, col: 40, rowspan: 1, colspan: 5 }, { row: 22, col: 61, rowspan: 1, colspan: 5 }, { row: 21, col: 61, rowspan: 1, colspan: 5 }, { row: 21, col: 85, rowspan: 1, colspan: 5 }, { row: 22, col: 85, rowspan: 1, colspan: 5 }, { row: 22, col: 108, rowspan: 1, colspan: 5 }, { row: 21, col: 108, rowspan: 1, colspan: 5 }, { row: 21, col: 130, rowspan: 1, colspan: 5 }, { row: 22, col: 130, rowspan: 1, colspan: 5 }, { row: 21, col: 154, rowspan: 1, colspan: 5 }, { row: 22, col: 154, rowspan: 1, colspan: 5 }, { row: 22, col: 176, rowspan: 1, colspan: 5 }, { row: 21, col: 176, rowspan: 1, colspan: 5 }, { row: 21, col: 199, rowspan: 1, colspan: 5 }, { row: 22, col: 199, rowspan: 1, colspan: 5 }, { row: 22, col: 222, rowspan: 1, colspan: 5 }, { row: 21, col: 222, rowspan: 1, colspan: 5 }, { row: 21, col: 244, rowspan: 1, colspan: 5 }, { row: 22, col: 244, rowspan: 1, colspan: 5 }]}
        //contextMenu={true}           
        //readOnly={true}
        className='htCenter'
        //Colorea los días festivos  
        cells={function (row, col, prop) {
          let cellProperties = []
          let columnasFestivos = [35, 49, 50, 67, 82, 98, 103, 114, 127, 140, 150, 192, 208, 213, 233, 244,] //este arreglo contiene las posiciones de las columnas de los festivos del año 2023
          for (let i = 0; i < columnasFestivos.length; i++) {
            for (let j = 4; j <= 19; j++) {
              if (row === j && col === columnasFestivos[i]) {
                cellProperties.renderer = backGroundColorFestivos
              }
            }
            //Coloca bordes a la programación
            let columns = [0, 21, 45, 66, 90, 113, 135, 159, 181, 204, 227, 249]
            for (let i = 0; i < columns.length; i++)
              if (row > 3 && row < 20 && col > columns[i] && col < columns[i + 1]) {
                cellProperties.className = 'borders'
              }
          }
          //Bordes de las celdas donde van las horas
          let columnasBordes = [1, 8, 22, 29, 46, 53, 67, 74, 91, 98, 114, 121, 136, 143, 160, 167, 182, 189, 205, 212, 228, 235]
          for (let i = 0; i < columnasBordes.length; i = i + 2) {
            if (row > 20 && row < 23 && col >= columnasBordes[i] && col <= columnasBordes[i + 1]) {
              cellProperties.className = 'borders'
            }
          }
          //Bordes donde va la suma de las horas
          let columnasBordesHoras = [16, 20, 40, 44, 61, 65, 85, 89, 108, 112, 130, 134, 154, 158, 176, 180, 199, 203, 222, 226, 244, 248]
          for (let i = 0; i < columnasBordesHoras.length; i = i + 2) {
            if (row === 21 && col >= columnasBordesHoras[i] && col <= columnasBordesHoras[i + 1]) {
              cellProperties.className = 'borders'
              cellProperties.className = 'centrarTexto'
            }
            if (row === 22 && col >= columnasBordesHoras[i] && col <= columnasBordesHoras[i + 1]) {
              cellProperties.className = 'borders'
              cellProperties.className = 'centrarTexto'
            }
          }
          // if (row === 22 && col <= 20 && col >= 16) {
          //   cellProperties.className = 'centrarTexto'
          // }

          //este ciclo pinta de blanco las fechas de la fila 0.
          for (let i = 0; i < 249; i++) {
            if (row === 0 && col === i) { cellProperties.className = 'colorMeses' }
          }

          // if (userResult.length === 0) {
          //   fetch('http://localhost:3001/usuarios-registrados')
          //     .then((data) => data.json())
          //     .then((user) => user.filter(element => element.email === cookies.get('email')))
          //     .then(function (userResponse) {
          //       //console.log("Esto es userResult dentro de Cells --->> ", userResponse)
          //       setIsLoading(false)
          //       for (let i = 0; i < userResponse[0].coordenadasCurso.length; i++) {
          //         for (let j = 0; j < userResponse[0].coordenadasCurso[i].length - 1; j = j + 2) {
          //           let colorDeRelleno = userResponse[0].colorDeRelleno[i]

          //           function customRenderer(instance, td, row, col, prop, value, cellProperties) {
          //             //hot.current.hotInstance.renderers.TextRenderer.apply(this, arguments);     
          //             td.style.backgroundColor = colorDeRelleno
          //           }
          //           if (row === userResponse[0].coordenadasCurso[i][j] && col === userResponse[0].coordenadasCurso[i][j + 1]) {
          //             cellProperties.renderer = customRenderer
          //           }
          //         }
          //       }
          //       //Este ciclo pinta los cursos en la parte de abajo en cada mes con sus respectivas horas
          //       for (let i = 0; i < userResponse[0].coordColorHoras.length; i++) {
          //         for (let j = 0; j < userResponse[0].coordColorHoras[i].length - 2; j = j + 3) {
          //           function colorAbajo(instance, td, row, col, prop, value, cellProperties) {
          //             td.style.backgroundColor = userResponse[0].coordColorHoras[i][j + 1]
          //           }
          //           if (row === 21 && col === userResponse[0].coordColorHoras[i][j]) {
          //             cellProperties.renderer = colorAbajo
          //           }
          //           function horaParcial(instance, td, row, col, prop, value, cellProperties) {
          //             td.innerHTML = userResponse[0].coordColorHoras[i][j + 2]
          //           }
          //           if (row === 22 && col === userResponse[0].coordColorHoras[i][j]) {
          //             cellProperties.renderer = horaParcial
          //           }
          //         }
          //       }
          //       //ubica los totales en cada mes 
          //       let coordenadasTotalesPorMes = [16, 40, 61, 85, 108, 130, 154, 176, 199, 222, 244]
          //       for (let i = 0; i < coordenadasTotalesPorMes.length; i++) {
          //         function totales(instance, td, row, col, prop, value, cellProperties) {
          //           //hot.current.hotInstance.renderers.TextRenderer.apply(this, arguments);     
          //           td.innerHTML = userResponse[0].totalHorasPorMes[i]
          //         }
          //         if (row === 22 && col === coordenadasTotalesPorMes[i]) {
          //           cellProperties.renderer = totales
          //         }
          //       }
          //       console.log("Esto es userResult dentro de Cells --->> ", userResult)
          //     })

          // }
          //else {            
          for (let i = 0; i < userResult[0].coordenadasCurso.length; i++) {
            for (let j = 0; j < userResult[0].coordenadasCurso[i].length - 1; j = j + 2) {
              let colorDeRelleno = userResult[0].colorDeRelleno[i]

              function customRenderer(instance, td, row, col, prop, value, cellProperties) {
                //hot.current.hotInstance.renderers.TextRenderer.apply(this, arguments);     
                td.style.backgroundColor = colorDeRelleno
              }
              if (row === userResult[0].coordenadasCurso[i][j] && col === userResult[0].coordenadasCurso[i][j + 1]) {
                cellProperties.renderer = customRenderer
              }
            }
          }
          for (let i = 0; i < userResult[0].coordColorHoras.length; i++) {
            function prueba(instance, td, row, col, prop, value, cellProperties) {
              td.style.backgroundColor = userResult[0].coordColorHoras[i][2]
            }
            if (row === userResult[0].coordColorHoras[i][0] && col === userResult[0].coordColorHoras[i][1]) {
              cellProperties.renderer = prueba
            }
          }
          //Este ciclo pinta los cursos en la parte de abajo en cada mes con sus respectivas horas
          for (let i = 0; i < userResult[0].coordColorHoras.length; i++) {
            for (let j = 0; j < userResult[0].coordColorHoras[i].length - 2; j = j + 3) {
              function colorAbajo(instance, td, row, col, prop, value, cellProperties) {
                td.style.backgroundColor = userResult[0].coordColorHoras[i][j + 1]
              }
              if (row === 21 && col === userResult[0].coordColorHoras[i][j]) {
                cellProperties.renderer = colorAbajo
              }
              function horaParcial(instance, td, row, col, prop, value, cellProperties) {
                td.innerHTML = userResult[0].coordColorHoras[i][j + 2]
              }
              if (row === 22 && col === userResult[0].coordColorHoras[i][j]) {
                cellProperties.renderer = horaParcial
              }
            }
          }
          //ubica los totales en cada mes 
          if (userResult[0].totalHorasPorMes.length !== 0) {
            let coordenadasTotalesPorMes = [16, 40, 61, 85, 108, 130, 154, 176, 199, 222, 244]
            for (let i = 0; i < coordenadasTotalesPorMes.length; i++) {
              function totales(instance, td, row, col, prop, value, cellProperties) {
                td.innerHTML = userResult[0].totalHorasPorMes[0][i]
              }
              if (row === 22 && col === coordenadasTotalesPorMes[i]) {
                cellProperties.renderer = totales
                cellProperties.className = 'centrarTexto'
              }
            }
          }
          //}


          return cellProperties
        }}
        //Esta función desabilita las celdas en las cuales no se puede iniciar una programación tales como los nombres de los días entre otras.
        beforeOnCellMouseDown={function (event, coords, _TD, controller) {
          console.log("Coord.row ", coords.row)
          console.log("Coord.col ", coords.col)
          if (coords.row < 4 || coords.row === 20 || coords.row >= 22 || coords.col === 0 || coords.col === 21 || coords.col === 45 || coords.col === 66 || coords.col === 90 || coords.col === 113 || coords.col === 135 || coords.col === 159 || coords.col === 181 || coords.col === 204 || coords.col === 227 || coords.col === 249 || (coords.row === 21 && ((coords.col >= 9 && coords.col <= 20))) || (coords.row === 21 && ((coords.col >= 30 && coords.col <= 44))) || (coords.row === 21 && ((coords.col >= 54 && coords.col <= 65))) || (coords.row === 21 && ((coords.col >= 75 && coords.col <= 89))) || (coords.row === 21 && ((coords.col >= 99 && coords.col <= 112))) || (coords.row === 21 && ((coords.col >= 122 && coords.col <= 134))) || (coords.row === 21 && ((coords.col >= 144 && coords.col <= 158))) || (coords.row === 21 && ((coords.col >= 168 && coords.col <= 180))) || (coords.row === 21 && ((coords.col >= 190 && coords.col <= 203))) || (coords.row === 21 && ((coords.col >= 213 && coords.col <= 226))) || (coords.row === 21 && ((coords.col >= 236 && coords.col <= 248)))) {
            event.stopImmediatePropagation()
            console.log("Click en una celda donde no se puede programar")
          }
        }}
        afterOnCellMouseDown={async function (event, coords, TD) {

          const color = TD.style.backgroundColor

          if (color === "red") { //Detecta si se hizo click en una celda roja(festivo)y arroja un aviso.
            Swal.fire({
              title: "No se puede programar sobre la fecha seleccionada porque es un día festivo.",
              icon: "info"
            })

          }
          else if (coords.row === 21 && ((coords.col >= 1 && coords.col <= 8) || (coords.col >= 22 && coords.col <= 29) || (coords.col >= 46 && coords.col <= 53) || (coords.col >= 67 && coords.col <= 74) || (coords.col >= 91 && coords.col <= 98) || (coords.col >= 114 && coords.col <= 121) || (coords.col >= 136 && coords.col <= 143) || (coords.col >= 160 && coords.col <= 167) || (coords.col >= 182 && coords.col <= 189) || (coords.col >= 205 && coords.col <= 212) || (coords.col >= 228 && coords.col <= 235))) {
            if (TD.style.backgroundColor === "") {
              return
            }
            else {
              Swal.fire({
                title: "¿Está seguro que desea borrar el curso seleccionado?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                showCancelButton: true,
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    fetch("http://localhost:3001/borrar-curso", {
                      method: 'POST',
                      headers: { "Content-Type": "application/json", "Accept": "application/json" },
                      body: JSON.stringify({ email: cookies.get('email'), color: color })
                    })
                      .then(() => console.log("Se envió la información al servidor para borrar el curso deseado"))
                      .then(() => Swal.fire({
                        title: "Se borró del servidor el curso deseado.",
                        icon: "success"
                      }))
                      .then((reinicio) => {
                        if (reinicio) {
                          window.location.reload()
                        }
                      })
                  }
                });
            }
          }
          else if (color !== "") {
            Swal.fire({
              title: "No se puede programar en la fecha seleccionada porque ya hay un curso programado allí.",
              icon: "info"
            })
          }

          else {
            //Para capturar los datos del curso por medio de "Sweetalert" es necesario emplear "then" para que no avance hasta tanto no se ingrese un dato deseado como la duración del curso o la cantidad de horas diarias a trabajar.
            Swal.fire({
              title: 'Duración en horas del curso.',
              input: 'number',
              inputLabel: 'Debe ser un número entero entre 10 y 60',
              inputPlaceholder: 'Entre la duración del curso',
              showCancelButton: true,
              inputValidator: (value) => {
                if (!value) {
                  return 'Debe ingresar un valor'
                }
                if (value < 10 || value > 60) {
                  return "El valor ingresado no está en el rango permitido"
                }
                if (value % 1 !== 0) {
                  return "El número ingresado debe ser entero"
                }
              }
            })
              .then((result) => {
                let duracionCursoIngresadoPorUsuario = parseInt(result.value)
                console.log("Duración del curso --->> ", duracionCursoIngresadoPorUsuario)
                if (isNaN(duracionCursoIngresadoPorUsuario)) { return } //Termina la ejecución si presionan el botón "cancelar" en la ventana donde se pide la duración del curso

                Swal.fire({
                  title: 'Horas diarias de trabajo.',
                  input: 'number',
                  inputLabel: 'Debe ser un número entero entre 1 y 4',
                  inputPlaceholder: 'Entre horas diarias',
                  showCancelButton: true,
                  inputValidator: (value) => {
                    if (!value) {
                      return 'Debe ingresar un valor'
                    }
                    if (value < 1 || value > 4) {
                      return "El valor ingresado no está en el rango permitido"
                    }
                    if (value % 1 !== 0) {
                      return "El número ingresado debe ser entero"
                    }
                  }
                })
                  .then((result) => {
                    let horasDiariasTrabajo = parseInt(result.value)
                    console.log("Horas diarias de trabajo--->> ", horasDiariasTrabajo)
                    if (isNaN(horasDiariasTrabajo)) { return } //termina la ejecución si presionan el botón "cancelar" en la ventana donde se pide las horas diarias de trabajo.

                    // let horasDiariasTrabajoIngresadoUsuario = prompt("Entre el número de horas diarias")
                    // let horasDiariasTrabajo = parseInt(horasDiariasTrabajoIngresadoUsuario)

                    if (((coords.row === 19 && horasDiariasTrabajo > 1) || (coords.row === 18 && horasDiariasTrabajo > 2) || (coords.row === 17 && horasDiariasTrabajo > 3) || (coords.row === 16 && horasDiariasTrabajo > 4))) {
                      Swal.fire({
                        title: "No se puede programar porque las horas diarias de trabajo exceden las 22 horas.",
                        icon: "info"
                      })
                      return
                    }

                    let nombreDiaInicioCurso = hot.current.hotInstance.getCell(3, coords.col).innerHTML //capturo el nombre del día de inicio(L,M,Mi,J,V).                   
                    let lunes, martes, miercoles, jueves, viernes = false

                    switch (nombreDiaInicioCurso) { //El correspondiente día de incio es llevado a true para que aparezca chuliado y deshabilitado en la ventana donde se requieren los días de trabajo en la semana. 
                      case "L":
                        lunes = true
                        break
                      case "M":
                        martes = true
                        break
                      case "Mi":
                        miercoles = true
                        break
                      case "J":
                        jueves = true
                        break
                      default:
                        viernes = true
                    }

                    Swal.fire({
                      title: 'Días de la semana a laborar',
                      text: "El día de inicio se selecciona automáticamente",
                      html: '<h3>Lunes <input type="checkbox" id="lunes"  ' + (lunes ? 'checked' : '') + ' ' + (lunes ? 'disabled' : '') + '/></h3><p/>' +
                        '<h3>Martes <input type="checkbox" id="martes"  ' + (martes ? 'checked' : '') + ' ' + (martes ? 'disabled' : '') + ' /></h3>' +
                        '<h3>Miércoles <input type="checkbox" id="miercoles" ' + (miercoles ? 'checked' : '') + ' ' + (miercoles ? 'disabled' : '') + ' /></h3>' +
                        '<h3>Jueves <input type="checkbox" id="jueves" ' + (jueves ? 'checked' : '') + ' ' + (jueves ? 'disabled' : '') + ' /></h3>' +
                        '<h3>Viernes <input type="checkbox" id="viernes" ' + (viernes ? 'checked' : '') + ' ' + (viernes ? 'disabled' : '') + ' /></h3>',
                      confirmButtonText: 'Continue ',
                      showCancelButton: true,
                      preConfirm: () => {
                        return [
                          Swal.getPopup().querySelector('#lunes').checked,
                          Swal.getPopup().querySelector('#martes').checked,
                          Swal.getPopup().querySelector('#miercoles').checked,
                          Swal.getPopup().querySelector('#jueves').checked,
                          Swal.getPopup().querySelector('#viernes').checked
                        ]

                      }
                    })
                      .then((result) => {
                        console.log("Esto es result al principio ", result.value)
                        if (result.value === undefined) { return } //termina la ejecución si presionan el botón "cancelar" en la ventana donde se piden los días a laborar.
                        let diasTrabajo = ["", "", "", "", ""]
                        if (result.value[0] === true) {
                          diasTrabajo[0] = "L"
                        }
                        if (result.value[1] === true) {
                          diasTrabajo[1] = "M"
                        }
                        if (result.value[2] === true) {
                          diasTrabajo[2] = "Mi"
                        }
                        if (result.value[3] === true) {
                          diasTrabajo[3] = "J"
                        }
                        if (result.value[4] === true) {
                          diasTrabajo[4] = "V"
                        }
                        console.log("Días de la semana a trabajar-->> ", diasTrabajo)


                        //else {


                        let totalHorasPorMes = []
                        let coordenadasCurso = []
                        let auxCoordsCol = coords.col
                        let horaInicio = coords.row + 2
                        let mesInicio = hot.current.hotInstance.getCell(0, coords.col).innerHTML
                        let diaInicio = hot.current.hotInstance.getCell(2, coords.col).innerHTML
                        //let duracionCursoIngresadoPorUsuario = 30
                        let duracionCursoExacto = Math.floor(duracionCursoIngresadoPorUsuario / horasDiariasTrabajo) * horasDiariasTrabajo //cociente de la división
                        let diaHorasDiariasIncompletas = duracionCursoIngresadoPorUsuario % horasDiariasTrabajo //residuo de la división
                        //let diasTrabajo = ["L", "", "", "", "V"]
                        let colorDeRelleno = colorRGB()
                        coloresDeRellenoGenerados.push(colorDeRelleno)
                        let cantidadHorasSegunColor = new Array(coloresDeRellenoGenerados.length)//Este array se crea con la longitud del array "coloresDeRellenoGenerados" para guardar la cantidad de horas de cada color
                        let horasCursoPorMes = new Array(11)//en este array se irá guardando las horas del curso que se está pintando en cada mes

                        horasCursoPorMes.fill(0, 0) //llena de ceros el array
                        cantidadHorasSegunColor.fill(0, 0)//llena de ceros el array

                        console.log("TD ", color)
                        console.log("coords.row ", coords.row)
                        console.log("coords.col ", coords.col)
                        console.log("diasHorasDiariasExactas ", duracionCursoExacto)
                        console.log("diaHorasDiariasIncompletas ", diaHorasDiariasIncompletas)
                        console.log("Hora de inicio ---> ", horaInicio)
                        console.log("Fecha de inicio ---> ", diaInicio + "/" + mesInicio)
                        console.log("coloresDeRellenoGenerados: ", coloresDeRellenoGenerados)


                        while (duracionCursoExacto !== 0) {
                          let nombreDiaInicioCurso = hot.current.hotInstance.getCell(3, coords.col).innerHTML
                          if (nombreDiaInicioCurso === diasTrabajo[0] || nombreDiaInicioCurso === diasTrabajo[1] || nombreDiaInicioCurso === diasTrabajo[2] || nombreDiaInicioCurso === diasTrabajo[3] || nombreDiaInicioCurso === diasTrabajo[4]) {
                            for (let i = coords.row; i < horasDiariasTrabajo + coords.row; i++) { //A las horas diaras de trabajo le sumo la fila donde inicia el curso y el "for" va hasta una unidad antes de esta suma lo que permite rellenar las celdas según la cantidad de horas diarias de trabajo. Ejemplo: si el curso inicia en la fila 2 y la cantidad de horas diaria de trabajo son 3 entonces 2+3 = 5 lo que significa que el for va hasta 4 empezando desde el 2                                                       
                              if (hot.current.hotInstance.getCell(i, coords.col).style.backgroundColor === "") {
                                hot.current.hotInstance.getCell(i, coords.col).style.backgroundColor = colorDeRelleno

                                //Esta función detecta en qué mes se pintó determinada hora y va sumando las horas pintadas en cada mes. Por ejmplo, 8 horas en febrero y 4 en marzo para el mismo curso.
                                sumarHorasParciales(coords.col, horasCursoPorMes)

                                coordenadasCurso.push(i)//cada vez que se pinta una celda se guarda la fila de esa celda
                                coordenadasCurso.push(coords.col)//cada vez que se pinta una celda se guarda la columna de esa celda                   
                              }

                              else {
                                if (hot.current.hotInstance.getCell(i, coords.col).style.backgroundColor === 'red') {
                                  console.log("Encontré un festivo")
                                  //console.log(i, coords.col)
                                  //coords.col = coords.col + 1
                                  i = horasDiariasTrabajo + coords.row //evita que rellene una celda después de un festivo de manera errónea.
                                  duracionCursoExacto = duracionCursoExacto + horasDiariasTrabajo
                                  console.log("Siguiente día después del festivo encontrado ", hot.current.hotInstance.getCell(3, coords.col).innerHTML)


                                }
                                else {
                                  console.log("Valor de coords.col ", coords.col)
                                  let nombreDiaCruce = hot.current.hotInstance.getCell(3, coords.col).innerHTML
                                  switch (nombreDiaCruce) {
                                    case 'L': nombreDiaCruce = "Lunes"; break
                                    case 'M': nombreDiaCruce = "Martes"; break
                                    case 'Mi': nombreDiaCruce = "Miércoles"; break
                                    case 'J': nombreDiaCruce = "Jueves"; break
                                    default: nombreDiaCruce = "Viernes"
                                  }
                                  let numeroDiaCruce = hot.current.hotInstance.getCell(2, coords.col).innerHTML
                                  let mesCruce = hot.current.hotInstance.getCell(0, coords.col).innerHTML
                                  let horaCruce = i + 2
                                  coloresDeRellenoGenerados.pop()//Esta línea elimina el último color generado pues no es necesario ya que si llega a este punto es porque hay un cruce de horas.                      
                                  console.log("coloresDeRellenoGenerados después de pop ", coloresDeRellenoGenerados)
                                  Swal.fire({
                                    title: "No se puede programar en la fecha seleccionada porque hay un cruce de horario en la fecha: " + nombreDiaCruce + " " + numeroDiaCruce + "/" + mesCruce + " a las " + horaCruce + " horas.",
                                    icon: "info"
                                  })
                                  console.log("No se puede programar porque hay un cruce de horario en la fecha: ", nombreDiaCruce + " " + numeroDiaCruce + "/" + mesCruce, "a las ", horaCruce, "horas.")

                                  for (let j = coords.col - 1; j >= auxCoordsCol; j--) { //Este ciclo rellena de blanco hacia la izquierda cuando hay un cruce(deshace lo que pinto)
                                    nombreDiaInicioCurso = hot.current.hotInstance.getCell(3, j).innerHTML
                                    if (nombreDiaInicioCurso === diasTrabajo[0] || nombreDiaInicioCurso === diasTrabajo[1] || nombreDiaInicioCurso === diasTrabajo[2] || nombreDiaInicioCurso === diasTrabajo[3] || nombreDiaInicioCurso === diasTrabajo[4]) {
                                      for (let a = 0; a < horasDiariasTrabajo; a++) {
                                        hot.current.hotInstance.getCell(coords.row + a, j).style.backgroundColor = ""
                                      }
                                    }
                                  }
                                  //este ciclo rellena de blanco las celdas hacia arriba, es decir, cuando hay un cruce hacia abajo                       
                                  for (let h = coords.row; h <= i - 1; h++) {
                                    hot.current.hotInstance.getCell(h, coords.col).style.backgroundColor = ""
                                  }
                                  return //finaliza el for y no sigue tratando de rellenar las celdas.
                                }
                              }
                            }
                            duracionCursoExacto = duracionCursoExacto - horasDiariasTrabajo
                            coords.col = coords.col + 1
                            if (coords.col > 248) {
                              Swal.fire({
                                title: "No se puede programar el curso porque excede el mes de diciembre.",
                                icon: "info"
                              })
                                .then((reinicio) => {
                                  if (reinicio) {
                                    window.location.reload()
                                  }
                                })
                              return
                            }
                          }
                          else {
                            coords.col = coords.col + 1
                            if (coords.col > 248) {
                              Swal.fire({
                                title: "No se puede programar el curso porque excede el mes de diciembre.",
                                icon: "info"
                              })
                                .then((reinicio) => {
                                  if (reinicio) {
                                    window.location.reload()
                                  }
                                })
                              return
                            }
                          }
                        }
                        //Este ciclo pinta el día restante con las horas que sobran, es decir, las incompletas.
                        console.log("Esto es coords.col antes del while de las horas diarias incompletas -->> ", coords.col)
                        let diaHorasDiariasIncompletasAux = diaHorasDiariasIncompletas
                        while (diaHorasDiariasIncompletas !== 0) {
                          let nombreDiaInicioCurso = hot.current.hotInstance.getCell(3, coords.col).innerHTML
                          console.log("Nombre dia después del While ", nombreDiaInicioCurso)
                          console.log("Esto es coords.col -->> ", coords.col)
                          if (nombreDiaInicioCurso === diasTrabajo[0] || nombreDiaInicioCurso === diasTrabajo[1] || nombreDiaInicioCurso === diasTrabajo[2] || nombreDiaInicioCurso === diasTrabajo[3] || nombreDiaInicioCurso === diasTrabajo[4]) {
                            for (let i = 0; i < diaHorasDiariasIncompletasAux; i++) {
                              if (hot.current.hotInstance.getCell(coords.row + i, coords.col).style.backgroundColor === "") {
                                hot.current.hotInstance.getCell(coords.row + i, coords.col).style.backgroundColor = colorDeRelleno
                                diaHorasDiariasIncompletas = diaHorasDiariasIncompletas - 1

                                //Esta función detecta en qué mes se pintó determinada hora y va sumando las horas pintadas en cada mes. Por ejmplo, 8 horas en febrero y 4 en marzo para el mismo curso.
                                sumarHorasParciales(coords.col, horasCursoPorMes)

                                coordenadasCurso.push(coords.row + i)//cada vez que se pinta una celda se guarda la fila de esa celda
                                coordenadasCurso.push(coords.col)//cada vez que se pinta una celda se guarda la columna de esa celda
                              }
                              else {
                                if (hot.current.hotInstance.getCell(coords.row + i, coords.col).style.backgroundColor === 'red') {
                                  coords.col = coords.col + 1
                                  i = diaHorasDiariasIncompletas
                                  console.log("Siguiente día después del festivo encontrado ", hot.current.hotInstance.getCell(3, coords.col).innerHTML)
                                }
                                else {
                                  let diaCruce = hot.current.hotInstance.getCell(2, coords.col).innerHTML
                                  switch (diaCruce) {
                                    case 'L': diaCruce = "Lunes"; break
                                    case 'M': diaCruce = "Martes"; break
                                    case 'Mi': diaCruce = "Miércoles"; break
                                    case 'J': diaCruce = "Jueves"; break
                                    default: diaCruce = "Viernes"
                                  }
                                  let mesCruce = hot.current.hotInstance.getCell(0, coords.col).innerHTML
                                  let horaCruce = (coords.row + i) + 2 //En coords.row es donde ocurre el cruce entonces le sumo 2 para obtener la hora del cruce.
                                  let numeroDiaCruce = hot.current.hotInstance.getCell(2, coords.col).innerHTML
                                  coloresDeRellenoGenerados.pop()//Esta línea elimina el último color generado pues no es necesario ya que si llega a este punto es porque hay un cruce de horas.
                                  //columnaDondeSeGeneraElColor.pop()//Esta línea elimina la posición de la columna donde se hizo click pues al haber un cruce no es necesario dicha posición
                                  console.log("coloresDeRellenoGenerados después de pop ", coloresDeRellenoGenerados)
                                  Swal.fire({
                                    title: "No se puede programar el curso solicitado porque hay un cruce de horas el: " + diaCruce + " " + numeroDiaCruce + "/" + mesCruce + " a las " + horaCruce + " horas.",
                                    icon: "warning"
                                  })
                                  console.log("No se puede programar porque hay un cruce en ", diaCruce + "/" + mesCruce, "a las", horaCruce, "horas")
                                  for (let p = i - 1; p >= 0; p--) {
                                    hot.current.hotInstance.getCell(coords.row + p, coords.col).style.backgroundColor = ""
                                  }
                                  for (let j = coords.col - 1; j >= auxCoordsCol; j--) { //Este ciclo rellena de blanco hacia la izquierda cuando hay un cruce(deshace lo que pinto)
                                    nombreDiaInicioCurso = hot.current.hotInstance.getCell(3, j).innerHTML
                                    if (nombreDiaInicioCurso === diasTrabajo[0] || nombreDiaInicioCurso === diasTrabajo[1] || nombreDiaInicioCurso === diasTrabajo[2] || nombreDiaInicioCurso === diasTrabajo[3] || nombreDiaInicioCurso === diasTrabajo[4]) {
                                      for (let a = 0; a < horasDiariasTrabajo; a++) {
                                        hot.current.hotInstance.getCell(coords.row + a, j).style.backgroundColor = ""
                                      }
                                    }
                                  }
                                  return
                                }
                              }
                            }
                            //diaHorasDiariasIncompletas = 0
                          }
                          else {
                            coords.col = coords.col + 1
                            if (coords.col > 248) {
                              Swal.fire({
                                title: "No se puede programar el curso porque excede el mes de diciembre.",
                                icon: "info"
                              })
                                .then((reinicio) => {
                                  if (reinicio) {
                                    window.location.reload()
                                  }
                                })
                              return
                            }
                          }

                        }

                        //window.location.reload(true);
                        //conteoHorasFebrero()
                        // const iterable = [feb(cantidadHorasSegunColor), mar(cantidadHorasSegunColor)]
                        // Promise.all(iterable)
                        //   .then(function (results) { console.log("Se leyeron los colores de febrero y marzo:", results) })
                        //   .catch(function (err) { console.log(err) })

                        //Este array guarda las coordenadas donde se pinta un curso(en la parte de abajo), el color y las horas de ese curso en cada mes.
                        let coordColorHoras = []

                        //Este código pinta los cursos en cada mes(en la parte de abajo)con su respectiva hora  
                        let arrayAux = [1, 8, 22, 29, 46, 53, 67, 74, 91, 98, 114, 121, 136, 143, 160, 167, 182, 189, 205, 212, 228, 235]
                        let k = 0
                        for (let i = 0; i <= horasCursoPorMes.length; i++) {
                          if (horasCursoPorMes[i] !== 0) {
                            for (let j = arrayAux[k]; j <= arrayAux[k + 1]; j++) {
                              if (hot.current.hotInstance.getCell(21, j).style.backgroundColor === "") {
                                hot.current.hotInstance.getCell(21, j).style.backgroundColor = colorDeRelleno
                                hot.current.hotInstance.getCell(22, j).innerHTML = horasCursoPorMes[i]
                                // coordColorHoras.push(21) //No es necesario enviar el 21 pues siempre va a ser la fila 21.
                                coordColorHoras.push(j)
                                coordColorHoras.push(colorDeRelleno)
                                coordColorHoras.push(horasCursoPorMes[i])
                                k = k + 2
                                break
                              }
                            }
                          }
                          else {
                            k = k + 2
                          }
                        }

                        // setTimeout(() => {
                        //Este código va sumando las horas parciales de cada curso en cada mes e imprime ese total.
                        let coordenadasHoras = [[1, 8, 16], [22, 29, 40], [46, 53, 61], [67, 74, 85], [91, 98, 108], [114, 121, 130], [136, 143, 154], [160, 167, 176], [182, 189, 199], [205, 212, 222], [228, 235, 244]]
                        let horasTotalesPorMes = 0
                        for (let i = 0; i <= coordenadasHoras.length - 1; i++) {
                          for (let j = coordenadasHoras[i][0]; j <= coordenadasHoras[i][1]; j++) {
                            // if (hot.current.hotInstance.getCell(22, j).innerHTML === "" || hot.current.hotInstance.getCell(22, j).innerHTML === 0) { //si la celda está vacía entonces no hay más valores para sumar y por lo tanto se rompe el ciclo.
                            //   break
                            // }
                            //else { 
                            horasTotalesPorMes = horasTotalesPorMes + Number(hot.current.hotInstance.getCell(22, j).innerHTML)
                            //}
                          }
                          hot.current.hotInstance.getCell(22, coordenadasHoras[i][2]).innerHTML = horasTotalesPorMes
                          totalHorasPorMes.push(horasTotalesPorMes)
                          horasTotalesPorMes = 0
                        }
                        // }, 1000)

                        //Cuando hay un cruce de horas entonces no ingresa a este if porque "duracionCursoExacto no queda en cero" y por lo tanto no se envía nada al backend
                        if (duracionCursoExacto === 0 && diaHorasDiariasIncompletas === 0) {
                          fetch("http://localhost:3001/update-user", {
                            method: 'POST',
                            headers: { "Content-Type": "application/json", "Accept": "application/json" },
                            body: JSON.stringify({ email: cookies.get('email'), colorRelleno: colorDeRelleno, coordenadasCurso: coordenadasCurso, coordColorHoras: coordColorHoras, totalHorasPorMes: totalHorasPorMes })
                          })
                            .then(function () {
                              console.log("Se guardó en el servidor (Backend) las preferencias del usuario")
                            })
                        }
                        //}
                      })
                  })
                //})
              })
          }
        }} //afterOncellMouseDown

        hiddenRows={true}
        //hiddenRows = {rows = {2}}
        //cell={[{row:0, col:5, className:'celdas'},{row:6, col:1, className:'celdas'},{row:5, col:8, className:'celdas'}]}             
        //cell={[{row:0, col:4,renderer:myRenderer}]}
        colWidths={[60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 29, 60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 60, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 60]} //ancho de las columnas en orden de izquierda a derecha                        
        licenseKey='non-commercial-and-evaluation' // for non-commercial use only
      >
      </HotTable>

      <div>
        {/* <button onClick={deleteWholeProgramming}>Borrar toda la programación del año</button> */}
        {/* <button  type="submit" className='btn  btn-outline-primary' onClick={cerrarSesion} >Cerrar Sesión</button> */}
        <div className="logout"><LogoutIcon onClick={cerrarSesion} sx={{ fontSize: 30 }}></LogoutIcon><span className='CerrarSesion'>Cerrar Sesión</span></div>
        <div className='borrarProgramacion' onClick={deleteWholeProgramming}><DeleteForeverIcon sx={{ fontSize: 35 }}></DeleteForeverIcon><span className='borrarProgramacionTexto'><WarningAmberIcon></WarningAmberIcon><br></br>Borrar toda la programación del año.</span></div>
        <div className='HelpIcon'><HelpIcon sx={{ fontSize: 35 }}></HelpIcon><span className='HelpIconText'><QuizIcon></QuizIcon>Para crear o programar un curso haga click en la celda correspondiente a la fecha y hora de inicio.<br></br><br></br><QuizIcon></QuizIcon>Para borrar un curso específico haga click sobre el <strong>color</strong> del curso a borrar ubicado en la parte inferior, sobre las horas (ver imagen). Se le pedirá confirmación antes de borrar el curso.<br></br><img src="/colores-cursos.png" alt='logo' /></span></div>
        <div className='avatar'><Avatar sx={avatarStyle}><PersonIcon></PersonIcon></Avatar><span className='emailAvatar'>{cookies.get('email')}</span></div>
      </div>
      <CopyRight></CopyRight>
    </div>

  )

}//rejilla

//}
export default Rejilla;

