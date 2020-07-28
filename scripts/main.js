<<<<<<< Updated upstream
var canvas = document.querySelector('#canvas');

if (canvas.getContext) {
    var context = canvas.getContext('2d');
    // drawing code here
    
    var pos = {x: 0, y: 0};
    
    document.addEventListener('mouseenter', setPosition);
    document.addEventListener('mousedown', setPosition);
    document.addEventListener('mousemove', draw);
    
    function setPosition(e) {
        // Sets mouse position while moving
        pos.x = e.clientX;
        pos.y = e.clientY;
    }
    
    const swatches = document.querySelectorAll('.colors');

    // Swatches translated

    const color_data = [
        colors = {
            pink: 'rgb(255, 93, 93)',
            orange1: 'rgb(255, 102, 67)',
            orange2: 'rgb(255, 142, 49)',
            yellow: 'rgb(255, 218, 68)',
            green: 'rgb(145, 255, 89)',
            teal: 'rgb(0, 255, 208)',
            blue: 'rgb(66, 81, 254)',
            purple: 'rgb(124, 0, 249)',
            purple2: 'rgb(186, 47, 255)'
        }
    ];
    
    swatches.forEach(swatch => {

        swatch.style.backgroundColor = colors[swatch.dataset.hex];
        // Sets background color of each .colors element to hex dataset of itself

        swatch.addEventListener('click', () => {
            // If clicked do the following

            swatches.forEach(swatch => {
                // For each .colors element, check for id="selected" and remove it
                if (swatch.hasAttribute('id')) {
                    swatch.removeAttribute('id', 'selected');
                }
            });
            swatch.setAttribute('id', 'selected');
            // Sets id of clicked .colors element to "selected"

            if (swatch.hasAttribute('type', 'color')) {
                console.log('New Brush Color = ' + swatch.value);
            } else {
                console.log('New Brush Color = ' + swatch.dataset.hex);
            };

        });
    });

    // Set default swatch
    const default_swatch = document.querySelectorAll('.colors')[0];
    default_swatch.setAttribute('id', 'selected');
=======
const color_picker = document.querySelector('input[type="color"]');

// Color Wheel -> Picker
const color_wheel = document.querySelector('.stack');
>>>>>>> Stashed changes

canvas_wrap = document.querySelector('#canvas-wrap');

<<<<<<< Updated upstream
resizeWindow();

// Default position

    var DefaultPos = {x:0, y:0};

window.addEventListener('resize', resizeWindow);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

function setCanvasBG(){
	context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
}

// Initialize canvas items
setCanvasBG();  //bg color

// Window resize
function resizeWindow(){

	canvas.style.width  = canvas.clientWidth;
	canvas.style.height = canvas.clientHeight;
    setCanvasBG();
    $('p').show();
}

// New mouse event position
function setPosition(e){
	DefaultPos.x = e.clientX;
	DefaultPos.y = e.clientY;
}

// Drawing canvas object
function draw(e){
    // Define left click
    if (e.buttons !== 1) return;

	context.beginPath(); // Begin path
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
    
    context.moveTo(DefaultPos.x, DefaultPos.y);
    setPosition(e);
    context.lineTo(DefaultPos.x, DefaultPos.y);
    
    context.stroke();
}

// Save canvas
$("#save").click(function() {
    var html = " ";
    html += "<img src='" + canvas.toDataURL() + "' alt='from canvas'/>";
    var pageStyle = "<style>body{margin:0; padding: 0;}</style>";
    var tab = window.open();
    tab.document.write(html + pageStyle);
});

$('canvas, p').click(function(){
    $('p').hide();
});

// Clear canvas
$("#btn-trash").click(function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
	setCanvasBG();
    $('p').show();
});

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
        alert('Canvas is not supported in your browser.');
    };
=======
// Swatches
const swatches = document.querySelectorAll('.swatch');

swatches.forEach(swatch => {
    swatch.style.backgroundColor = swatch.dataset.swatch;
    swatch.setAttribute('title', swatch.dataset.swatch);
    
    // Color Mode = Picker
    swatch.addEventListener('click', () => {
        color_mode = 'swatch';
        // Set the new swatch
        new_swatch = swatch;
        choose_color();
    })
});

// Color Mode = Picker
color_picker.addEventListener('click', () => {
    color_mode = 'picker';
    choose_color();
});

// Init color mode, set picker value to value of first swatch
var color_mode = 'picker';
color_picker.setAttribute('value', swatches[0].dataset.swatch)
choose_color();

// Determine Color
function choose_color() {
    console.log('Color Mode = ' + color_mode);

    if (color_mode == 'picker') {
        color = color_picker.value;
    } else if (color_mode == 'swatch') {
        color = new_swatch.dataset.swatch;
    }

    console.log('Paint Color = ' + color);
}

// Fill Tool
$('svg').click(function(event) {
    event.target.style.fill = color;
});

// Download Artwork
const download_btn = document.querySelector('[data-command="download"]');

download_btn.addEventListener('click', () => {
    const svg = document.querySelector(".main-area").innerHTML;
    const blob = new Blob([svg.toString()]);
    const element = document.createElement("a");
    element.download = "My-Coloring-Book.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
});
>>>>>>> Stashed changes
