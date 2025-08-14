const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tools = document.querySelectorAll(".shapeBtn");
const clearCanvas = document.getElementById("clearCanvas");
const colorPicker = document.querySelector("#colorPicker");
const  sizeSlider = document.querySelector("#sizeSlider");
const saveImg = document.getElementById("saveImg");

let prevMouseX,
prevMouseY,
snapshot,
strokeColor="#fff",
isDrawing=false,
brushWidth=5,
selectedTool = "pencil";

window.addEventListener("load",()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})


// for Rectangle
const drawRectangle = (e)=>{
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

// Circle
const drawCircle = (e) => {
  ctx.beginPath(); 
  let radius = Math.sqrt(
  Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  ctx.stroke();
};

// for triangle
const drawTriangle = (e) => {
  ctx.beginPath(); 
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(2 * prevMouseX - e.offsetX, e.offsetY);
  ctx.closePath();
   ctx.stroke();
};

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
snapshot = ctx.getImageData(0,0, canvas.width, canvas.height);
};

// Selection
tools.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        selectedTool = btn.id; 
    });
});

const drawing = (e)=>{
    if(!isDrawing) return;
ctx.putImageData(snapshot,0 , 0);
ctx.strokeStyle = strokeColor;

   
    if(selectedTool == "rectangle")
    {
        drawRectangle(e);
    }
    else if(selectedTool =="circle") 
    {
        drawCircle(e);
    }
    else if(selectedTool =="triangle") 
    {
        drawTriangle(e);
    }
      else if(selectedTool =="pencil") 
    {
	ctx.strokeStyle =colorPicker.value;
	ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    }
      else if(selectedTool =="eraser") 
    {
	ctx.strokeStyle = "#171717";
	ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    }
    else if (selectedTool === "fonts") {
    const text = prompt("Enter the text:");
    if (text) {
        ctx.fillStyle = strokeColor;
        ctx.font = (brushWidth * 5)+"px serif";
        ctx.fillText(text, e.offsetX, e.offsetY);
    }
    isDrawing = false; 
}

};

sizeSlider.addEventListener("change", () => {
  brushWidth = sizeSlider.value;
});
colorPicker.addEventListener("change", () => {
  strokeColor = colorPicker.value;
});

// clear Screen
clearCanvas.addEventListener("click",()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// save Img
saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `Drawing.jpg`;
    link.href = canvas.toDataURL();
    link.click();
});

canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",()=>{
    isDrawing = false;
})