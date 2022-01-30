const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 그림판 배경이 투명하게 되지 않도록 설정
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling =false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function hanleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

function saveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    // href: link , download: name
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

// 우클릭 방지
function handleCM(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", hanleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", saveClick);
}