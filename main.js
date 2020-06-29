const optionsEnum = {
    Draw: 'd',
    Erase: 'e',
    Nothing: 'nothing', 
    Reset: 'r',
    Save: 'v',
    Start: 's',
    Toggle: 't',
}

let mincells_per_side = 16;
let maxcells_per_side = 110;
let showBorder = true;
let mode = 'mouseover';
let cells_per_side = mincells_per_side + 1, cntrl_pressed = optionsEnum.Nothing;

const btn_start = document.getElementById('btn_start');
const btn_reset = document.getElementById('btn_reset');
const btn_save = document.getElementById('btn_save');
const btn_toggle = document.getElementById('btn_toggle');
const cells = document.getElementById('cells');
const maxLength = getComputedStyle(document.documentElement).getPropertyValue('--max-length');
const gradientColor1 = getComputedStyle(document.documentElement).getPropertyValue('--gradient-color1');
const gradientColor2 = getComputedStyle(document.documentElement).getPropertyValue('--gradient-color2');


window.addEventListener('keypress', keyPressHandler);
window.addEventListener('keyup', keyPressHandler);
btn_start.addEventListener('click', start);
btn_save.addEventListener('click', saveSketch);
btn_toggle.addEventListener('click', toggleBorder);
btn_reset.addEventListener('click', reset);

btn_start.addEventListener('mouseover', changeContentBorder);
btn_save.addEventListener('mouseover', changeContentBorder);
btn_toggle.addEventListener('mouseover', changeContentBorder);
btn_reset.addEventListener('mouseover', changeContentBorder);

btn_start.addEventListener('mouseleave', changeContentBorder);
btn_save.addEventListener('mouseleave', changeContentBorder);
btn_toggle.addEventListener('mouseleave', changeContentBorder);
btn_reset.addEventListener('mouseleave', changeContentBorder);

function changeBackground(e){
    console.log(e);
    // alert(cntrl_pressed);
    if (cntrl_pressed == optionsEnum.Draw) {
        e.originalTarget.classList.add('activated');
    }
    else if (cntrl_pressed == optionsEnum.Erase) {
        e.originalTarget.classList.remove('activated');
    }
}

function start(e){
    cells.textContent = "";
    let temp = prompt(`How many cells per side? (${mincells_per_side} - ${maxcells_per_side} inclusive are valid inputs)`);
    if (!temp.match(/[0-9]+/i )|| cells_per_side > maxcells_per_side || cells_per_side < mincells_per_side) {
        alert(`Enter and integer between ${mincells_per_side} and ${maxcells_per_side}.`)
        return null
    }
    else {
        cells_per_side = temp;
    }
    makeGrid(cells_per_side, cells_per_side);
}

function reset(e){
    cells.textContent = "";
    makeGrid(cells_per_side, cells_per_side);   
}

function makeGrid(rows, cols) {  
    makeCells(rows,cols);  
    arrangeCells(rows,cols);
}

function makeCells(rows, cols) {
    cells.style.setProperty('--grid-rows', rows);
    cells.style.setProperty('--grid-cols', cols);
    for (let c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        cell.setAttribute('draggable', true);
        cell.addEventListener(mode, changeBackground);
        //cell.textContent = (c + 1);
        cell.id = `cell ${c+1}`;
        cells.appendChild(cell).className = "cell";
        cells.appendChild(cell).className = "cell-border";
    };
}

function arrangeCells(rows,cols){
    //assign rows and cols to each of the div cells made in makeCells();
        //alert(`cell: ${cell.textContent}`);
    let i = 1;
    for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
            const cell = document.getElementById(`cell ${i}`);
            cell.style.setProperty('grid-row', r);
            cell.style.setProperty('grid-column', c);
            i++;
        }
    }
}

function saveSketch(){
    alert(`need to implement save still :)`);
    var canvas = document.getElementById('canvas');
    var canvas2d = canvas.getContext('2d');
    const container = document.getElementsByClassName('cell');
    var iter = 0;
    const w = canvas.width / cells_per_side;
    const h = canvas.height / cells_per_side;

    for (let i = 0; i < cells_per_side; i++) {
        for (let j = 0; j < cells_per_side; j++) {
            canvas2d.fillStyle = container[iter].style.backgroundColor;
            console.log(container[iter].style.backgroundColor);
            let x = j * maxLength / cells_per_side;
            let y = i * maxLength / cells_per_side;
            canvas2d.fillRect(x, y, w, h);
            iter++;
        }
    }
    window.open(document.getElementById('canvas').toDataURL());
}

function keyPressHandler(e){
    console.log(e);
    if (e.type.toLowerCase() == 'keypress') {
        if (e.key.toLowerCase() == optionsEnum.Start) {
            start();
        } 
        else if (e.key.toLowerCase() == optionsEnum.Reset) {
            reset();
        }
        else if (e.key.toLowerCase() == optionsEnum.Save) {
            saveSketch();
        }
        else if (e.key.toLowerCase() == optionsEnum.Draw) {
            cntrl_pressed = optionsEnum.Draw;
        }
        else if (e.key.toLowerCase() == optionsEnum.Erase) {
            cntrl_pressed = optionsEnum.Erase;
        }
        else if (e.key.toLowerCase() == optionsEnum.Toggle) {
            toggleBorder();
        }
    }
    else if (e.type.toLowerCase() == 'keyup'){
        if (e.key.toLowerCase() == optionsEnum.Draw) {
            cntrl_pressed = optionsEnum.Nothing;
        }
        else if (e.key.toLowerCase() == optionsEnum.Erase) {
            cntrl_pressed = optionsEnum.Nothing;
        }
    }
}

function toggleBorder(e){
    const cells = document.querySelectorAll('div[id^=cell');
    for (let index = 0; index < cells.length; index++) {
        const cell = cells[index];
        //alert(cells.length);
        console.log(cell.classList.contains('cell-borderless'));
        if (cell.classList.contains('cell-borderless')) {
            cell.classList.remove('cell-borderless');
        } 
        else {
            cell.classList.add('cell-borderless');
        }
    }
}

function populateOptions() {
    for(let option in optionsEnum){
        alert(`${option} and ${optionsEnum[option]}`);
        let optionLetter = optionsEnum[option];
        if (option !== 'nothing') {
            //create each div section below and add to div class="left-side">
            createHtmlElement('div class="option-item"', 2, [`p class="p_draw">Hold '${optionLetter}' and Hover over a Square`])
        
             // <div class="option-item">
            //     <p class="p_draw">Draw:</p>
            //     <p class="p_draw">Hold 'd' and Hover Over a Square</p>
            // </div>
        }
        else {
            continue;
        }
    }
   
}

function createHtmlElement (type, numberOfChildren = null, typeOfChildren = null) {
    if (typeOfChildren.length != numberOfChildren) {
        alert('The type of children and the array of children must ')
    }
    if (numberOfChildren && typeOfChildren) {
        console.log(type,numberOfChildren, typeOfChildren)
    }
    else{
        alert("No children");
    }
}

function changeContentBorder(e){
    const cells_border = document.getElementById('cells-border');
    console.log(cells_border);
    if (e.type == 'mouseover') {
        //cells_border.style.setProperty('border-color', 'black');
        //cells.style.setProperty('background-color', gradientColor2)
    } 
    else {
        //cells_border.style.setProperty('border-color', 'white');
        //cells.style.setProperty('background-color', gradientColor1)
    }
}
makeGrid(cells_per_side,cells_per_side);
//populateOptions();

