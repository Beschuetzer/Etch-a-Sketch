
const btn_start = document.getElementById('btn_start');
const btn_reset = document.getElementById('btn_reset');
const cells = document.getElementById('cells');
btn_reset.addEventListener('click', reset);
btn_start.addEventListener('click', start);
function start(e){
    let cells_per_side = prompt('How many cells per side?');
    const cells = document.getElementById('cells');
    const cell_length = cells.offsetWidth / cells_per_side;
    alert (cell_length)
    makeGrid(cells_per_side, cells_per_side);
    

    
}
function reset(e){1
    alert('Need to figure out what reset does...');
}

function makeGrid(rows, cols) {  
    makeCells(rows,cols);  
    arrangeCells(rows,cols);
    
  };
function makeCells(rows, cols) {
cells.style.setProperty('--grid-rows', rows);
cells.style.setProperty('--grid-cols', cols);
for (let c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.textContent = (c + 1);
    cell.id = (c+1);
    cells.appendChild(cell).className = "cell";
};
}

function arrangeCells(rows,cols){
    //assign rows and cols to each of the div cells made in makeCells();
    r = rows
    for (let currentRow = 1; currentRow <= rows*cols; currentRow++) {
        const cell = document.getElementById(currentRow);
        alert(cell.textContent);
        for (let currentCol = 0; currentCol < array.length; currentCol++) {
           
            
        }
    }
}
