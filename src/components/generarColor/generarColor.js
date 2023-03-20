function generarNumero(numero) {
    return (Math.random() * numero).toFixed(0);
  }

 function colorRGB() {
    let color = "(" + generarNumero(250) + "," + generarNumero(250) + "," + generarNumero(250) + ")";
    return "rgb" + color
  }

  export default colorRGB