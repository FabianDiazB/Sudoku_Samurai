/**
 * Codigo de js para hacer funcional y crear el tablero de sudoku samurai
 * 
 */


var dimen = 9
var sudoku = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]] // esta es la matriz 21x21 para representar los 5 tableros


window.onload=function(){ 
    /**
     * Cuando cargue la ventana, se crea el tablero y los botones
     */
    crearTablero();
    establecerBoton();
}

function establecerBoton(){
    /**
     * Esta funcion lo que hace es obtener los botones ya especificados en el html y ponerles el evento addListener para que cada uno
     * ejecuta su respectiva funcion
     */

    var botonG = document.getElementById("generar");
    botonG.addEventListener("click", gen);

    var botonB = document.getElementById("resuelveB");
    botonB.addEventListener("click", resolverBack);

    var botonA = document.getElementById("resuelveA");
    botonA.addEventListener("click", resolverA);

    var botonBstep = document.getElementById("resuelveB_step");
    botonBstep.addEventListener("click", resolverBack);
    
    var botonAstep = document.getElementById("resuelveA_step");
    botonAstep.addEventListener("click", resolverA);
    
    var botonL = document.getElementById("limpiar");
    botonL.addEventListener("click", limpiar);

}


function gen(){
    /**
     * Esta funcion es para el boton Generar, utiliza limpiar y aleatorios para generar un nuevo tablero de manera aleatoria
     */
    limpiar()
    aleatorios()
}

function limpiar(){
    /**
     * Limpiar recorre las 81 celdas y limpia su contenido, esto para que el tablero quede totalmente limpio
     */
    for (let i = 0; i<21;i++){ //2 ciclos para filas y columnas
        for(let j = 0; j<21;j++){
            if((j<12 && j>8 && (i<6 || i>14)) || i<12 && i>8 &&(j<6 || j>14)){ //casillas desactivadas
                continue;
            }else{
            sudoku[i][j].value=null;}
        }
    }
}

  function valido(num, fil, col) {
    /**
     * Funcion corazón que devuelve true o false, dependiendo si se puede insertar un numero en cierta celda, verificando en fila, columna y cuadrante
     */

    // Verifica el cuadrante de 3x3
    const filaIni = Math.floor(fil / 3) * 3; 
    const columIni = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) { //esto verifica que el numero no se encuentre ya en el subcuadrante
        for (let j = 0; j < 3; j++) {
            if (sudoku[filaIni + i][columIni + j].value == num) { //no seria valido el numero ahi
                return false;
            }
        }
    }
    //cuadrantes compartidos
    if(fil<9 && col<9){//sudoku A
        if((fil>5 && col>5)){//3x3 compartido entre (superior izquierdo) y (central)
            for (let i = 0; i < 9; i++) { //con este for revisamos todas las celdas compartidas con el sudoku de en medio y asi saber si se puede insertar
                if(sudoku[fil][i+6].value == num ||
                    sudoku[i+6][col].value == num ||
                    sudoku[fil][i].value == num || 
                    sudoku[i][col].value == num){
                return false
                }
            }
        }
        else{
            for (let i = 0; i < 9; i++) { 
                if(sudoku[fil][i].value == num || sudoku[i][col].value == num){
                    return false
                }
            }
        }
    }
    ////////////////////////
    if(fil<9 && col>11){//sudoku B
        if((fil>5 && col>5)){
            for (let i = 0; i < 9; i++) {//con este for revisamos todas las celdas compartidas con el sudoku de en medio y asi saber si se puede insertar
                if(sudoku[fil][i+12].value == num || 
                    sudoku[i+6][col].value == num||
                    sudoku[fil][14-i].value == num || 
                    sudoku[i][col].value == num){
                return false
                }
            }
        }
        else{
            for (let i = 0; i < 9; i++) {
                if(sudoku[fil][i+12].value == num || sudoku[i][col].value == num){
                    return false
                }
            }
        }
    }
    if(fil>11 && col<9){//sudoku C
        for (let i = 0; i < 9; i++) {//con este for revisamos todas las celdas compartidas con el sudoku de en medio y asi saber si se puede insertar
            if(sudoku[fil][i].value == num || 
                sudoku[i+12][col].value == num||
                sudoku[fil][i+6].value == num || 
                sudoku[14-i][col].value == num){
            return false
            }
            else{
                for (let i = 0; i < 9; i++) {
                    if(sudoku[fil][i].value == num || sudoku[i+12][col].value == num){
                        return false
                    }
                }
            }
        }
    }
    if(fil>11 && col>11){//sudoku D
        for (let i = 0; i < 9; i++) {//con este for revisamos todas las celdas compartidas con el sudoku de en medio y asi saber si se puede insertar
            if(sudoku[fil][i+12].value == num || 
                sudoku[i+12][col].value == num||
                sudoku[fil][14-i].value == num || 
                sudoku[14-i][col].value == num){
            return false
            }
            else{
                for (let i = 0; i < 9; i++) {
                    if(sudoku[fil][i+12].value == num || sudoku[i+12][col].value == num){
                        return false
                    }
                }
            }
        }
    // Si el número puede colocarse en la posición, es válido
    return true;
    }
}

function resolverA() {
    // Definir los valores válidos para cada celda 
    const validos = '123456789';
    // Definir una función auxiliar para encontrar la próxima celda vacía
    function casillaVacia() {
      for (let fil = 0; fil < 21; fil++) {
        for (let col = 0; col < 21; col++) {
            if((col<12 && col>8 && (fil<6 || fil>14)) || fil<12 && fil>8 &&(col<6 || col>14)){
                continue;
            }else{
                if (sudoku[fil][col].value == 0) {
                    return [fil, col];
                }
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
    for(let i=0;i<21;i++){
        for(let j=0;j<21;j++){
            if((j<12 && j>8 && (i<6 || i>14)) || i<12 && i>8 &&(j<6 || j>14)){
                continue;
            }else{
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
    }
    return true;
}


function crearTablero(){
    for(let i=0;i<21;i++){
        for(let j=0;j<21;j++){
            if((j<12 && j>8 && (i<6 || i>14)) || i<12 && i>8 &&(j<6 || j>14)){
                let espacio = document.createElement("input");
                espacio.id = i.toString()+"-"+j.toString();
                espacio.classList.add("espacio");
                espacio.value=0;
                document.getElementById("tablero").append(espacio);
            }else{
            let celda = document.createElement("input");
            celda.id = i.toString() + "-" +j.toString();
            celda.classList.add("celda");
            celda.value=null;
            document.getElementById("tablero").append(celda);
            }
        }
    }
    agregarSudoku()
}

function aleatorios(){      
    for(let i=0;i<20;i++){ 
        var x = parseInt(Math.random()* (3 - 0));
        //var fR = parseInt(Math.random() * (9 - 0)+(6*x));
        //var cR = parseInt(Math.random() * (9 - 0)+(6*x));

        var nR = parseInt(Math.random() * (9 - 0) + 1);
        if(valido(nR,fR,cR)){
            sudoku[fR][cR].value=nR;
        }else{i--}   
    }
}

function agregarSudoku(){
    //para añadir las celdas al array sudoku
    for(let i=0;i<21;i++){
        for(let j=0;j<21;j++){
            var ide = i.toString() + "-" +j.toString();
            var celdaA = document.getElementById(ide);
            console.log(celdaA.toString())
            sudoku[i].push(celdaA);
        }
    }
   // console.log("anade todo bien")
    aleatorios()    
}







