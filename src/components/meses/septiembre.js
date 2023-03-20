//*******Este bloque imprime las iniciales de los días de la semana acorde al mes (septiembre)***//
//*******Coloca los valores correspondientes a cadía hábil del mes de septiembre */

  function septiembre(Data){
  let dias_septiembre = ["L", "M", "Mi", "J", "V"]
  let aux_septiembre = 4 //esta variable empieza en 4 porque en el array "dias" la posición 4 corresponde a "V"(viernes)que es el primer día hábil de septiembre.
  let valor_septiembre = 1 //este valor es 1 porque el primer día hábil de septiembre es uno.
  for (let i = 160; i < 181; i++) {
    Data[3][i] = dias_septiembre[aux_septiembre]
    Data[2][i] = valor_septiembre
    Data[0][i] = 9
    if (aux_septiembre === 4) {
      aux_septiembre = 0
      valor_septiembre = valor_septiembre + 3
    }
    else {
      aux_septiembre++
      valor_septiembre++
    }
  }
}

export default septiembre