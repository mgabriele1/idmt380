var canvas = document.querySelector('canvas');

if (canvas.getContext) {
    var context = canvas.getContext('2d');
    // drawing code here
    
    var pos = {x: 0, y: 0};
    
    document.addEventListener('mouseenter', setPosition);
    document.addEventListener('mousedown', setPosition);
    document.addEventListener('mousemove', draw);
    
    // window.addEventListener('resize', resizeCanvas);
    // resizeCanvas();
    
    // // Resize Canvas
    
    // function resizeCanvas() {
    //     // context.canvas.width = canvas.clientWidth;
    //     // context.canvas.height = canvas.clientHeight;

    //     context.canvas.width = 512;
    //     context.canvas.height = 512;
    // }
    
    function setPosition(e) {
        // Sets mouse position while moving
        pos.x = e.clientX;
        pos.y = e.clientY;
    }
    
    const swatches = document.querySelectorAll('.color');

    
    swatches.forEach(swatch => {
        swatch.style.backgroundColor = swatch.dataset.hex;
        // Sets background color of each .color element to hex dataset of itself

        swatch.addEventListener('click', () => {
            // If clicked do the following

            swatches.forEach(swatch => {
                // For each .color element, check for id="selected" and remove it
                if (swatch.hasAttribute('id')) {
                    swatch.removeAttribute('id', 'selected');
                }
            });
            swatch.setAttribute('id', 'selected');
            // Sets id of clicked .color element to "selected"

            if (swatch.hasAttribute('type', 'color')) {
                console.log('New Brush Color = ' + swatch.value);
            } else {
                console.log('New Brush Color = ' + swatch.dataset.hex);
            };

        });
    });

    // Set default swatch
    const default_swatch = document.querySelectorAll('.color')[0];
    default_swatch.setAttribute('id', 'selected');
    
    function draw(e)  {
        if (e.buttons !== 1) return; 
        // Stop if mouse is not clicked
        context.lineWidth = 5;
        context.lineCap = 'round';

        // Find element with id="selected" then set the brush color to its hex dataset
        var selected_swatch = document.querySelector('#selected');

        // Check if the element selected was color picker or swatch and gets value
        if (selected_swatch.hasAttribute('type', 'color')) {
            context.strokeStyle = selected_swatch.value;
        } else {
            context.strokeStyle = selected_swatch.dataset.hex;
        }
        
        setPosition(e);
        
        context.beginPath();
        // Begin the drawing path
        context.moveTo(pos.x, pos.y);
        // From position
        context.lineTo(pos.x, pos.y);
        // To position
        context.stroke();
        // Draw the stroke
    };

    // Buttons

const btn_trash = document.querySelector('#btn-trash');
btn_trash.addEventListener('click', () => {
    location.reload();
});

const color_wheel = document.querySelector('.color-wheel');
const color_input = document.querySelector('input[type="color"]');

color_wheel.addEventListener('click', () => {
    color_input.click();
});

window.addEventListener('resize', move_wheel);
window.onload = function() {
    setTimeout(() => {
        move_wheel();
    }, 1);
};

function move_wheel() {
    color_wheel.style.top = color_input.offsetTop;
    color_wheel.style.left = color_input.offsetLeft;
};

    } else {
        alert('Canvas is not supported in your browser.')
    }