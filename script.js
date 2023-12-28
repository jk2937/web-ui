const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);

main_exec_lock = false;
main_loop_sleep = 15;

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

cursor_activated_timer = 0;

function main_exec_loop() {
  if(canvas_fullscreen_dynamic_res){
    canvas_width = window.screen.availWidth;
    
    canvas_height = window.screen.availHeight;
    
    canvas.width = canvas_width;
    
canvas.height = canvas_height;
    
  }
  if(cursor_activated) {
	  if(cursor_activated_timer > 2){
	  rect_x_vel = (cursor_x - cursor_old_x) / 2;
	  rect_y_vel = (cursor_y - cursor_old_y) / 2;
	  /* rect_x = cursor_x;
	  rect_y = cursor_y; */
	}	  cursor_old_x = cursor_x;
	  cursor_old_y = cursor_y;

	 cursor_activated_timer++;
  }
else {
	cursor_activated_timer = 0;
}
  rect_x += rect_x_vel;
  rect_y += rect_y_vel;
  /* rect_y_vel = rect_y_vel / 2;
  rect_x_vel = rect_x_vel / 2; */
  
  if(rect_x < -25){
	  rect_x = canvas_width;
  }
  if(rect_y < -25){
	  rect_y = canvas_height;
  }
  if(rect_x > canvas_width){
	  rect_x = -25;
  }
  if(rect_y > canvas_height){
	  rect_y = -25;
  }
	 
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas_width, canvas_height);
  
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(rect_x, rect_y, 25, 25);
  

  ctx.font = "14px Arial";
  ctx.fillText("cursor_activated", 10, 50)
  ctx.fillText(cursor_activated, 175, 50)
  ctx.fillText("cursor_x", 10, 65)
  ctx.fillText(cursor_x, 175, 65)
  ctx.fillText("cursor_y", 10, 80)
  ctx.fillText(cursor_y, 175, 80) 
  ctx.fillText("cursor_old_x", 10, 95)
  ctx.fillText(cursor_old_x, 175, 95)
  ctx.fillText("cursor_old_y", 10, 110)
  ctx.fillText(cursor_old_y, 175, 110)

  cursor_events = []
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

var cursor_activated = false;
var cursor_x = 0;
var cursor_y = 0;
var cursor_old_x = 0;
var cursor_old_y = 0;
var cursor_events = [];

canvas.addEventListener("mousedown", function (e) {
  cursor_activated = true;
  update_mouse_pos(e);
}, false);
canvas.addEventListener("touchstart", function (e) {
  cursor_activated = true;
  update_mouse_pos(e.touches[0]);
}, false);

canvas.addEventListener("mouseup", function (e) {
  cursor_activated = false;
}, false);
canvas.addEventListener("touchend", function (e) {
  cursor_activated = false;
}, false);

canvas.addEventListener("mousemove", function (e) {
  update_mouse_pos(e)
}, false);
canvas.addEventListener("touchmove", function (e) {
  update_mouse_pos(e.touches[0])
}, false);

function update_mouse_pos(e) {
  var rect = canvas.getBoundingClientRect();
  cursor_x = e.clientX - rect.left;
  cursor_y = e.clientY - rect.top;
  cursor_events.push([cursor_x, cursor_y])
} 
