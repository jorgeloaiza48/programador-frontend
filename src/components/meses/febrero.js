//*******Este bloque imprime las iniciales de los días de la semana acorde al mes (febrero)***//
  //*******Coloca los valores correspondientes a cadía hábil del mes de febrero */

function febrero(Data){
    let dias = ["L", "M", "Mi", "J", "V"]
    let aux = 2 //esta variable empieza en 2 porque en el array "dias" la posición 2 corresponde a "M"(Miércoles)que es el primer día hábil de febrero
    let valor = 1
    for (let i = 1; i < 21; i++) {
      Data[3][i] = dias[aux]
      Data[2][i] = valor
      Data[0][i] = 2
      if (aux === 4) {
        aux = 0
        valor = valor + 3
      }
      else {
        aux++
        valor++
      }
    }
}

export default febrero