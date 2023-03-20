//*******Este bloque imprime las iniciales de los días de la semana acorde al mes (agosto)***//
  //*******Coloca los valores correspondientes a cadía hábil del mes de agosto */

  function agosto(Data){
  let dias_agosto = ["L", "M", "Mi", "J", "V"]
  let aux_agosto = 1 //esta variable empieza en 1 porque en el array "dias" la posición 1 corresponde a "M"(martes)que es el primer día hábil de agosto.
  let valor_agosto = 1 //este valor es 1 porque el primer día hábil de agosto es uno.
  for (let i = 136; i < 159; i++) {
    Data[3][i] = dias_agosto[aux_agosto]
    Data[2][i] = valor_agosto
    Data[0][i] = 8
    if (aux_agosto === 4) {
      aux_agosto = 0
      valor_agosto = valor_agosto + 3
    }
    else {
      aux_agosto++
      valor_agosto++
    }
  }
}

export default agosto