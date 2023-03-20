
//*******Este bloque imprime las iniciales de los días de la semana acorde al mes (junio)***//
  //*******Coloca los valores correspondientes a cadía hábil del mes de junio */

  function junio(Data){
  let dias_junio = ["L", "M", "Mi", "J", "V"]
  let aux_junio = 3 //esta variable empieza en 0 porque en el array "dias" la posición 0 corresponde a "L"(Lunes)que es el primer día hábil de mayo
  let valor_junio = 1
  for (let i = 91; i < 113; i++) {
    Data[3][i] = dias_junio[aux_junio]
    Data[2][i] = valor_junio
    Data[0][i] = 6
    if (aux_junio === 4) {
      aux_junio = 0
      valor_junio = valor_junio + 3
    }
    else {
      aux_junio++
      valor_junio++
    }
  }
}

export default junio