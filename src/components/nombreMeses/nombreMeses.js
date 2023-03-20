//Esta función imprime el nombre de los meses sobre las celdas combinadas

function nombreMeses(Data){
let labelPositions = [1, 22, 46, 67, 91, 114, 136, 160, 182, 205, 228]
  let mesesLabel = ["FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
  for (let i = 0; i < labelPositions.length; i++) {
    Data[1][labelPositions[i]] = mesesLabel[i]
  }
}

export default nombreMeses