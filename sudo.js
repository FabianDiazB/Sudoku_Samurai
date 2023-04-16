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

function obtenerSubcuadricula(i, j) {
    const subcuadricula = [];
  
    // Obtener los índices de la esquina superior izquierda de la subcuadrícula
    const inicioFila = Math.floor(i / 3) * 3;
    const inicioCol = Math.floor(j / 3) * 3;
  
    // Recorrer la subcuadrícula de 3x3 y agregar los elementos al arreglo
    for (let fila = inicioFila; fila < inicioFila + 3; fila++) {
      for (let col = inicioCol; col < inicioCol + 3; col++) {
        subcuadricula.push(sudoku[fila][col]);
      }
    }
  
    return subcuadricula;
  }



  function valido(num, row, col) {
    // Verifica la fila
    console.log("Vamos a verificar que el #",num, " no este en la fila ",row);
    for (let i = 0; i < 9; i++) {
        if (sudoku[row][i].value == num) {
            console.log("no se puede, ya hay un ",sudoku[row][i].value );
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
    const filaIni = Math.floor(row / 3) * 3;
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







