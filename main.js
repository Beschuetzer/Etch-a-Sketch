
const btn_start = document.getElementById('btn_start');
const btn_reset = document.getElementById('btn_reset');
const cells = document.getElementById('cells');

btn_reset.addEventListener('click', reset);
btn_start.addEventListener('click', start);
function start(e){
    reset();
    let cells_per_side = prompt('How many cells per side?');
    const cell_length = cells.offsetWidth / cells_per_side;
    alert (cell_length)
    makeGrid(cells_per_side, cells_per_side);
}
function reset(e){1
    cells.textContent = "";
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
        //alert(`cell: ${cell.textContent}`);
    let i = 1;
    for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
            const cell = document.getElementById(i);
            cell.style.setProperty('grid-row', r);
            cell.style.setProperty('grid-column', c);
            i++;
        }
    }
}
