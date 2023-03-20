 //Esta función imprime la palabra "hora" en cada columna donde inicia cada mes

function palabraHora(Data){
 let horas = [0, 21, 45, 66, 90, 113, 135, 159, 181, 204, 227, 249]
 for (let i = 0; i < horas.length; i++) {
   Data[3][horas[i]] = "Hora"
 }
}

export default palabraHora

