 //*******Este bloque imprime las iniciales de los días de la semana acorde al mes (abril)***//
  //*******Coloca los valores correspondientes a cadía hábil del mes de abril */

  function abril(Data){
  let dias_abril = ["L", "M", "Mi", "J", "V"]
  let aux_abril = 0 //esta variable empieza en 0 porque en el array "dias" la posición 0 corresponde a "L"(Lunes)que es el primer día hábil de abril
  let valor_abril = 3
  for (let i = 46; i < 66; i++) {
    Data[3][i] = dias_abril[aux_abril]
    Data[2][i] = valor_abril
    Data[0][i] = 4
    if (aux_abril === 4) {
      aux_abril = 0
      valor_abril = valor_abril + 3
    }
    else {
      aux_abril++
      valor_abril++
    }
  }
}

export default abril