
function sumarHorasParciales(coordsCol, horasCursoPorMes){
let columnas = [1, 20, 22, 44, 46, 65,67,89,91,112,114,134,136,158,160,180,182,203,205,226,228,248]
let k = 0
for (let p = 0; p <= columnas.length - 2; p = p + 2) {
  if (coordsCol >= columnas[p] && coordsCol <= columnas[p + 1]) {
    horasCursoPorMes[k] = horasCursoPorMes[k] + 1
    k = k + 1                
  }
  else { k = k + 1 }                      
}
}

export default sumarHorasParciales