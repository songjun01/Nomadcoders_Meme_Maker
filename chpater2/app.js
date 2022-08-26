const modeBtn=document.getElementById("mode-btn");
const destroyBtn=document.getElementById("destroy-btn");
const eraserBtn=document.getElementById("eraser-btn");
const colorOptions=Array.from(document.getElementsByClassName("color-option"));
const color=document.getElementById("color");
const lineWidth=document.getElementById("line-width");
const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");  //canvas에 그릴 때 사용
const CANVAS_WIDTH=800;
const CANVAS_HEIGHT=800;
canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;
ctx.lineWidth=lineWidth.value;
let isPainting=false;
let isFilling=false;

/*
const colors=[
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#32ff7e",
    "#7efff5",
    "#18dcff",
    "#7d5fff"
]

function onClick(event){
    ctx.beginPath();
    ctx.moveTo(0,0);
    const color=colors[Math.floor(Math.random()*colors.length)];
    ctx.strokeStyle=color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

canvas.addEventListener("mousemove",onClick);*/


function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX,event.offsetY);
}
function startPainting(){
    isPainting=true;
}
function cancelPainting(){
    isPainting=false;
}
function onLineWidthChange(event){
    ctx.lineWidth=event.target.value;
}
function onColorChange(event){
    //ctx.strokeStyle=event.target.value;
    //ctx.fillStyle=event.target.value;
    changeColor(event.target.value);
}
function onColorClick(event){
    ctx.strokeStyle=event.target.dataset.color;
    ctx.fillStyle=event.target.dataset.color;
    //changeColor(event.target.dataset.color);
    color.value=event.target.dataset.color;
}
function changeColor(colorValue){
    ctx.strokeStyle=colorValue;
    ctx.fillStyle=colorValue;
}
function onModeClick(){
    if(isFilling){
        isFilling=false;
        modeBtn.innerText="Fill";
    }
    else{
        isFilling=true;
        modeBtn.innerText="Draw";
    }
}
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}
function onDestroyClick(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}
function onEraserClick(){
    ctx.strokeStyle="white";
    isFilling=false;
    modeBtn.innerText="Fill";
}

canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting);
canvas.addEventListener("click",onCanvasClick);

lineWidth.addEventListener("change",onLineWidthChange);
color.addEventListener("change",onColorChange);

colorOptions.forEach((color)=>color.addEventListener("click",onColorClick));

modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click",onEraserClick);
