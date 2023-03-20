//*******Este bloque imprime las iniciales de los días de la semana acorde al mes (mayo)***//
  //*******Coloca los valores correspondientes a cadía hábil del mes de mayo */

  function mayo(Data){
  let dias_mayo = ["L", "M", "Mi", "J", "V"]
  let aux_mayo = 0 //esta variable empieza en 0 porque en el array "dias" la posición 0 corresponde a "L"(Lunes)que es el primer día hábil de mayo
  let valor_mayo = 1
  for (let i = 67; i < 90; i++) {
    Data[3][i] = dias_mayo[aux_mayo]
    Data[2][i] = valor_mayo
    Data[0][i] = 5
    if (aux_mayo === 4) {
      aux_mayo = 0
      valor_mayo = valor_mayo + 3
    }
    else {
      aux_mayo++
      valor_mayo++
    }
  }
}

export default mayo