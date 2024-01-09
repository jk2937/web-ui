// Canvas properties

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);

canvas_width = 500;
canvas_height = 500;

canvas_fullscreen = false;
canvas_fullscreen_dynamic_res = false;

canvas.width = canvas_width;
canvas.height = canvas_height;

if (canvas_fullscreen) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.border = "none";
}


// Touch events

let cursor_activated = false;
let cursor_x = 0;
let cursor_y = 0;
let cursor_old_x = 0;
let cursor_old_y = 0;
let touch_events_buffer = [];

canvas.addEventListener("touchstart", function(e) {
    console.log(e)
    touch_events_buffer.push(e)
    // cursor_activated = true;
    // update_mouse_pos(e.touches[0]);
}, false);

canvas.addEventListener("touchend", function(e) {
    console.log(e)
    touch_events_buffer.push(e)
    // cursor_activated = false;
}, false);

canvas.addEventListener("touchmove", function(e) {
    console.log(e)
    touch_events_buffer.push(e)
    // update_mouse_pos(e.touches[0])
}, false);

/* function update_mouse_pos(e) {
    let rect = canvas.getBoundingClientRect();
    cursor_x = e.clientX - rect.left;
    cursor_y = e.clientY - rect.top;
    touch_events_buffer.push([cursor_x, cursor_y])
} */


// Main variables

display_debug_info = false

main_exec_lock = false;
main_loop_sleep = 15;

rect_x = 0;
rect_y = 0;

rect_x_vel = 0;
rect_y_vel = 0;

cursor_activated_timer = 0;

touch_events_history = []


// Main loop

function main_exec_loop() {
    if (canvas_fullscreen_dynamic_res) {
        canvas_width = window.screen.availWidth;

        canvas_height = window.screen.availHeight;

        canvas.width = canvas_width;

        canvas.height = canvas_height;

    }

    ctx.fillStyle = "LightGray";
    ctx.fillRect(0, 0, canvas_width, canvas_height);


    touch_events_history = touch_events_history.concat(touch_events_buffer)


    // Process touch_events_buffer

	ctx.font = "16px Arial";
    ctx.fillStyle = "Gray";
    ctx.fillText("Welcome to web-ui!", 10, 50)

	for(let i = 0; i < touch_events_history.length; i++) {
		let event_ = touch_events_history[i]
		for(let j = 0; j < event_.touches.length; j++) {
			let touch = event_.touches[j]
			let canvas_position = canvas.getBoundingClientRect();
    		let touch_x = touch.clientX - canvas_position.left;
    		let touch_y = touch.clientY - canvas_position.top;
			ctx.fillText(event_.type + "\n" + touch.identifier, touch_x, touch_y)
		}
	}


    rect_x += rect_x_vel;
    rect_y += rect_y_vel;
    rect_y_vel = rect_y_vel / 2;
    rect_x_vel = rect_x_vel / 2;

    if (rect_x < -25) {
        rect_x = canvas_width;
    }
    if (rect_y < -25) {
        rect_y = canvas_height;
    }
    if (rect_x > canvas_width) {
        rect_x = -25;
    }
    if (rect_y > canvas_height) {
        rect_y = -25;
    }

    ctx.fillStyle = "Gray";
    ctx.fillRect(rect_x, rect_y, 25, 25);


    if (display_debug_info == true) {
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
    }

    touch_events_buffer = []
}


// Loop launcher

function launch_loop() {
    if (main_exec_lock == true) {
        console.log("Main execution loop locked!")
        main_loop_sleep++;
        return false;
    }
    main_exec_lock = true;
    main_exec_loop();
    main_exec_lock = false;
    return true;
}

window.onload = setInterval(launch_loop, main_loop_sleep)
