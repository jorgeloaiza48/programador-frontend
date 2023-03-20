//*******Este bloque imprime las iniciales de los días de la semana acorde al mes(noviembre)***//
//*******Coloca los valores correspondientes a cadía hábil del mes de noviembre */

function noviembre(Data){
  let dias_noviembre = ["L", "M", "Mi", "J", "V"]
  let aux_noviembre = 2 //esta variable empieza en 2 porque en el array "dias" la posición 2 corresponde a "M"(Miércoles)que es el primer día hábil de noviembre.
  let valor_noviembre = 1 //este valor es 2 porque el primer día hábil de noviembre es dos.
  for (let i = 205; i < 227; i++) {
    Data[3][i] = dias_noviembre[aux_noviembre]
    Data[2][i] = valor_noviembre
    Data[0][i] = 11
    if (aux_noviembre === 4) {
      aux_noviembre = 0
      valor_noviembre = valor_noviembre + 3
    }
    else {
      aux_noviembre++
      valor_noviembre++
    }
  }
}

export default noviembre