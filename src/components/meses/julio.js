//*******Este bloque imprime las iniciales de los días de la semana acorde al mes (julio)***//
  //*******Coloca los valores correspondientes a cadía hábil del mes de julio */

function julio(Data){
    let dias_julio = ["L", "M", "Mi", "J", "V"]
    let aux_julio = 0 //esta variable empieza en 0 porque en el array "dias" la posición 0 corresponde a "L"(Lunes)que es el primer día hábil de julio
    let valor_julio = 3 //este valor es 3 porque el primer día hábil de julio es un tres.
    for (let i = 114; i < 135; i++) {
      Data[3][i] = dias_julio[aux_julio]
      Data[2][i] = valor_julio
      Data[0][i] = 7
      if (aux_julio === 4) {
        aux_julio = 0
        valor_julio = valor_julio + 3
      }
      else {
        aux_julio++
        valor_julio++
      }
    }
}

export default julio