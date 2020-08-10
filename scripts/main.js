const color_picker = document.querySelector('input[type="color"]');
const color_wheel = document.querySelector('.stack');

color_wheel.addEventListener('click', () => {
    color_picker.click(); // The color input is hidden, so if you click the picker, redirect the click to the input
});

function reset_active_swatch() {
    var active_swatch = document.querySelector('.swatch.active'); // Reset the active swatch
    if (active_swatch) {
        active_swatch.classList.remove('active'); // Remove the active class from the active swatch
    }
}

// SWATCHES
const swatches = document.querySelectorAll('.swatch'); // Create Swatches Array

swatches.forEach(swatch => {
    swatch.style.backgroundColor = swatch.dataset.swatch; // Set bck color to data HTML data-swatch
    swatch.setAttribute('title', swatch.dataset.swatch); // Add a hover title box
    swatch.addEventListener('click', () => {
        reset_active_swatch();
        swatch.classList.add('active'); // Set the clicked swatch to the active swatch
        color_mode = 'swatch'; // Set the color mode to Swatch
        new_swatch = swatch; // Set the new swatch
    })
});

color_picker.addEventListener('click', () => {
    color_mode = 'picker'; // Set the color mode to Picker
    reset_active_swatch();
});

// Init color mode, set picker value to value of first swatch
var color_mode = 'picker';
color_picker.setAttribute('value', swatches[0].dataset.swatch)
choose_color(); // Init the color_mode

// Determine the brush color
function choose_color() {
    if (color_mode == 'picker') {
        color = color_picker.value;
    } else if (color_mode == 'swatch') {
        color = new_swatch.dataset.swatch;
    }
}

// FILL TOOL
$('svg').click(function(event) {
    choose_color();
    event.target.style.fill = color;
    push_version();
});

// DOWNLOAD THE PAINTING
const download_btn = document.querySelector('[data-command="download"]');

download_btn.addEventListener('click', () => {
    // const dl_svg = document.querySelector(".main-area").innerHTML;
    const dl_svg = versions[4];
    const blob = new Blob([dl_svg.toString()]);
    const element = document.createElement("a");
    element.download = "My-Coloring-Book.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
});

// UNDO FUNCTION

// ----- Logic -----
// Clicking Edit >>> If Versions Array length is 5, delete last in Versions Array, then push the new edit to beginning
// Clicking Undo >>> Delete current svg on page, inject Versions[1] to canvas, delete Versions[0]

const main_area = document.querySelector(".main-area");
const svg = main_area.childNodes[1];

let versions = [svg.cloneNode(true)]; // Init the Versions Array, put default as first element in Versions

// Edit Push to Versions

function push_version() {
    if (versions.length == 5) { // 5 = Max undo
        versions.pop(); // Removes last element in Versions
    }
    var v_svg = svg.cloneNode(true);
    versions.unshift(v_svg); // Adds current SVG to beginning of Versions
    console.log(versions.length);
}

const undo_btn = document.querySelector('[data-command="undo"]')
undo_btn.addEventListener('click', undo);

function undo() {
    if (versions.length == 0) {
        alert('You cannot undo any further!');
    } else {
        svg.remove(); // Removes the SVG on page
        versions.shift(); // Deletes first element in Versions
        main_area.appendChild(versions[0]); // Insert last version into canvas area
    }
}