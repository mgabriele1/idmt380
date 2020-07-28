const color_picker = document.querySelector('input[type="color"]');

// Color Wheel -> Picker
const color_wheel = document.querySelector('.stack');

color_wheel.addEventListener('click', () => {
    color_picker.click();
});

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