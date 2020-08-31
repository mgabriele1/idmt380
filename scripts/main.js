// -------------------------------
// COLOR WHEEL
// -------------------------------

const color_picker = document.querySelector('.colorPicker');
const color_wheel = document.querySelector('.stack');
color_wheel.classList.add('swatch');

color_wheel.addEventListener('click', () => {
    color_picker.hidden; // The color input is hidden, so if you click the picker, redirect the click to the input
    color_mode = 'picker';
});

function reset_active_swatch() {
    var active_swatch = document.querySelector('.swatch.active'); // Reset the active swatch
    if (active_swatch) {
        active_swatch.classList.remove('active'); // Remove the active class from the active swatch
    }
}

var colorPicker = new iro.ColorPicker(".colorPicker", {
    // https://iro.js.org/guide.html#getting-started
    // Color option guide: https://iro.js.org/guide.html#color-picker-options
    width: 280,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "#fff",
});

colorPicker.on(["color:init", "color:change"], function(color){
    // https://iro.js.org/guide.html#color-picker-events
    var hex = colorPicker.color.hexString;
    color_wheel.style.borderColor = hex;
});

// -------------------------------
// SWATCHES
// -------------------------------

const swatch_container = document.querySelector('.swatches');
const top_aside = document.querySelector('#top-aside');
const show_all = document.querySelector('#show-all');

window.onresize = responsivenessCheck;
responsivenessCheck();

function responsivenessCheck() {
    if (swatch_container.offsetHeight > 50) {
        swatch_container.style.justifyContent = 'center';
    } else {
        swatch_container.style.justifyContent = 'space-between';
    }

    if (top_aside.offsetHeight > 60) {
        top_aside.style.justifyContent = 'center';
    } else {
        top_aside.style.justifyContent = 'space-between';
    }
}

const swatches = document.querySelectorAll('.swatch[data-swatch]'); // Create Swatches Array

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
color_picker.value = swatches[0].dataset.swatch;
choose_color(); // Init the color_mode

// Determine the brush color
function choose_color() {
    if (color_mode == 'picker') {
        // color = color_picker.value;
        color = colorPicker.color.hexString
    } else if (color_mode == 'swatch') {
        color = new_swatch.dataset.swatch;
    }
    console.log('swatch & '+ color);
}

// -------------------------------
// FILL TOOL
// -------------------------------

const main_area = document.querySelector(".main-area");
let artwork = document.querySelector(".main-area svg");

main_area.addEventListener('click', (event) => {
    // Click listener is set to main area because the SVG gets removed and appended,
    // that would break the listener if it were set to the SVG,
    // var 'event' is a sub variable that gets redefined each click
    choose_color();
    event.target.style.fill = color;
    push_version();
    artwork.style.fill = 'black'; // Keeps canvas black
    color_picker.style.display = 'none !important';
});

// -------------------------------
// DOWNLOAD THE PAINTING
// -------------------------------

const download_btn = document.querySelector('[data-command="download"]');

download_btn.addEventListener('click', () => {
    const dl_artwork = document.querySelector(".main-area").innerHTML;
    const blob = new Blob([dl_artwork.toString()]);
    const element = document.createElement("a");
    element.download = "My-Coloring-Book.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
});

// -------------------------------
// UNDO FUNCTION
//
// Logic:
// Clicking Edit >>> If Versions Array length is 30, delete last in Versions Array, then push the new edit to beginning. Counter-clockwise
// Clicking Undo >>> Delete current artwork on page, inject Versions[0] to main-area, delete Versions[0].
// -------------------------------

let versions = [artwork.cloneNode(true)]; // Init the Versions Array, put default as first element in Versions

// Edit Push to Versions

function push_version() {
    if (versions.length == 30) { // 30 = Max undo
        versions.pop(); // Removes last element in Versions
    }
    var v_artwork = artwork.cloneNode(true);
    versions.unshift(v_artwork); // Adds current artwork to beginning of Versions
}

const undo_btn = document.querySelector('[data-command="undo"]')
undo_btn.addEventListener('click', undo);

var x = 0;

function undo() {
    artwork = document.querySelector(".main-area svg"); // Reset the artwork variable
    if (versions.length == 1) {
        alert('There is nothing to undo!');
    } else {
        artwork.remove(); // Removes the artwork on page
        versions.shift(); // Deletes first element in Versions
        x = x + 1;
        main_area.appendChild(versions[0]); // Insert last version into main-area area
    }
}

// -------------------------------
// UPLOAD BUTTON
// -------------------------------

const upload_btn = document.querySelector('[data-command="upload"]');
const upload_preview_container = document.querySelector('.upload-preview');
const artwork_input = document.querySelector('input#artwork-html');


upload_btn.addEventListener('click', () => {
    var current_previous = document.querySelector('.upload-preview svg')
    if (current_previous) {
        current_previous.remove();
    }
    
    artwork = document.querySelector(".main-area svg"); // Reset the artwork variable
    var v_artwork = artwork.cloneNode(true);
    upload_preview_container.appendChild(v_artwork);
    
    artwork_input.value = main_area.innerHTML;
    console.log(artwork_input.value);
    toggle_upload_screen();
})

var upload_modal = document.querySelector('.upload-modal');

// -------------------------------
// TOGGLING THE UPLOAD SCREEN
// -------------------------------

const upload_reset_btn = document.querySelector('button[type="reset"]');

upload_reset_btn.addEventListener('click', () => {
    toggle_upload_screen()
})

function toggle_upload_screen() {
    if (document.querySelector('.upload-modal.opened')) {
        upload_modal.classList.remove('opened');
        upload_modal.classList.add('closed');
    } else {
        upload_modal.classList.remove('closed');
        upload_modal.classList.add('opened');
    }
}