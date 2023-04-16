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
    var boton = document.getElementById("resuelve");
    boton.addEventListener('click', resolver);

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

function valido(sudoku, n, i, j) {
    let fila = sudoku[i];
    let col = sudoku.map(row => row[j]);
    let bloque = obtenerSubcuadricula(i,j)
    
    return !fila.includes(n) && !col.includes(n) && !bloque.includes(n);
   
  }


function resolver(){

    for(let i=0;i<9;i++){
  
        for(let j=0;j<9;j++){

            if(sudoku[i][j].value==0){
                for(let k=1;k<10;k++){
                    if(valido(sudoku,k,i,j)){
                        sudoku[i][j].value = k;
                        if(resolver(sudoku)){
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

    //recorrer las celdas
   

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
        sudoku[fR][cR].value=nR;
         
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





    //recorrer las celdas
   

