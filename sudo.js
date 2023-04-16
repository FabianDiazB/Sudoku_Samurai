var dimen = 9
var sudoku = 
[
[],
[],
[],
[],
[],
[],
[],
[],
[]
]



window.onload=function(){
    crearTablero()
    establecerBoton()
}




function establecerBoton(){
    var botonB = document.getElementById("resuelveB");
    botonB.addEventListener('click', resolverBack);

    var botonA = document.getElementById("resuelveA");
    botonA.addEventListener('click', resolverA);

}




  function valido(num, fil, col) {
    // Verifica la fila
    //console.log("Vamos a verificar que el #",num, " no este en la fila ",fil);
    for (let i = 0; i < 9; i++) {
        if (sudoku[fil][i].value == num) {
            //console.log("no se puede, ya hay un ",sudoku[fil][i].value );
            return false;
        }
    }
    // Verifica la columna
    for (let i = 0; i < 9; i++) {
        if (sudoku[i][col].value == num) {
            return false;
        }
    }
    // Verifica el cuadrante de 3x3
    const filaIni = Math.floor(fil / 3) * 3;
    const columIni = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (sudoku[filaIni + i][columIni + j].value == num) {
                return false;
            }
        }
    }
    // Si el número puede colocarse en la posición, es válido
    return true;
}



function resolverA() {
    // Definir los valores válidos para cada celda 
    const validos = '123456789';
  
    // Definir una función auxiliar para encontrar la próxima celda vacía
    function casillaVacia() {
      for (let fil = 0; fil < 9; fil++) {
        for (let col = 0; col < 9; col++) {
          if (sudoku[fil][col].value == 0) {
            return [fil, col];
          }
        }
      }
      return null;
    }
  
    
  
    // Definir una función para realizar la búsqueda
    function busqueda() {
      // Encontrar la próxima celda vacía
      const siguiente = casillaVacia();
      // Si no hay más celdas vacías, se resolvió el sudoku
      if (!siguiente) {
        return true;
      }
      const [fil, col] = siguiente;
      // Probar cada valor válido para la celda
      for (let i = 0; i < validos.length; i++) {
        const value = validos[i];
        if (valido( value,fil, col)) {
          // Asignar el valor a la celda
          sudoku[fil][col].value = value;
          // Realizar la búsqueda recursiva
          if (busqueda()) {
            return true;
          }
          // Si no se encontró solución, revertir la asignación
          sudoku[fil][col].value = null;
        }
      }
      // Si no se encontró solución con ningún valor, retroceder
      return false;
    }
  
    // Llamar a la función de búsqueda y devolver el resultado
    return busqueda();
  }
  
 




function resolverBack(){

    for(let i=0;i<9;i++){
  
        for(let j=0;j<9;j++){

            if(sudoku[i][j].value==0){
                for(let k=1;k<10;k++){
                    if(valido(k,i,j)){
                        sudoku[i][j].value = k;
                        if(resolverBack(sudoku)){
                            return true;
                        }else{
                            sudoku[i][j].value = null;
                        }
                    }
                }
                return false;
            }


        }

    }
    
    return true;



}


function crearTablero(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let celda = document.createElement("input");
            celda.id = i.toString() + "-" +j.toString();
            celda.classList.add("celda");
            celda.value=null;
            document.getElementById("tablero").append(celda);
        }
    }

    agregarSudoku()
    
}

function aleatorios(){
    
    for(let i=0;i<7;i++){ 
        var fR = parseInt(Math.random() * (9 - 0) + 0);
        var cR = parseInt(Math.random() * (9 - 0) + 0);
        var nR = parseInt(Math.random() * (9 - 0) + 1);
        if(valido(nR,fR,cR)){
            sudoku[fR][cR].value=nR;
        }else{
            i-=1;
        }
        
         
    }
}

function agregarSudoku(){
    //para añadir las celdas al array sudoku
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            var ide = i.toString() + "-" +j.toString();
            var celdaA = document.getElementById(ide);
            sudoku[i].push(celdaA);
         
        }
    }
    aleatorios()
    
}







