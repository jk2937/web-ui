const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);

main_exec_lock = false;
main_loop_sleep = 10;

rect_x = 0;
rect_y = 0;

rect_x_vel = 0;
rect_y_vel = 0;

canvas_width = 500;
canvas_height = 500;

canvas_fullscreen = false;
canvas_fullscreen_dynamic_res = false;

canvas.width = canvas_width;
canvas.height = canvas_height;

if(canvas_fullscreen) {
  canvas.style.width ='100%';
    canvas.style.height='100%';
  canvas.style.position = "absolute";
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  canvas.style.border = "none";
}

function main_exec_loop() {
  if(canvas_fullscreen_dynamic_res){
    canvas_width = window.screen.availWidth;
    
    canvas_height = window.screen.availHeight;
    
    canvas.width = canvas_width;
    
canvas.height = canvas_height;
    
  }
  
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas_width, canvas_height);
  
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(rect_x, rect_y, 25, 25);
  
  rect_x += rect_x_vel;
  rect_y += rect_y_vel;
  rect_y_vel += 1;
  if(rect_y > canvas_height){
    rect_y = -25;
    rect_y_vel = 0;
    rect_x = Math.floor(Math.random() * canvas_width-25);
  }
}

function launch_loop() {
  if(main_exec_lock == true) {
    return false;
  }
  main_exec_lock = true;
  main_exec_loop();
  main_exec_lock = false;
  return true;
}

window.onload = setInterval(launch_loop, main_loop_sleep)
