// ----------------------------------------------------------------
// >>>>>>>>>>>>>>>>>>>>>>>>>> INDEX PAGE <<<<<<<<<<<<<<<<<<<<<<<<<<
// ----------------------------------------------------------------

if (current_page == 'index') {

    document.querySelector('#close-modal').addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
    });
    
}

// ----------------------------------------------------------------
// >>>>>>>>>>>>>>>>>>>>>>>>>> COLOR PAGE <<<<<<<<<<<<<<<<<<<<<<<<<<
// ----------------------------------------------------------------

if (current_page == 'color') {

// --------------------------------
// COLOR WHEEL & PICKER
// --------------------------------

const color_picker = document.querySelector('.color-picker');
const color_wheel = document.querySelector('.stack');
const picker_close = document.querySelector('.picker-close');
const picker_reflect = document.querySelector('.picker-reflect');

function togglePicker(color_picker, picker_reflect, picker_close, color_wheel) {
    if (color_mode == 'picker') {
        if (!document.querySelector('.move-up')) {
            showAllPicker(color_picker, picker_reflect, picker_close, color_wheel);
        } else {
            hideJustPicker(color_picker, picker_reflect, picker_close, color_wheel)
        }
    } else if (color_mode == 'swatch') {
        hideColorPicker(color_picker, picker_reflect, picker_close, color_wheel);
    }
}

function showAllPicker(color_picker, picker_reflect, picker_close, color_wheel) {
    color_picker.classList.remove('hide');
    picker_reflect.classList.remove('hide');
    setTimeout(function() {
        color_picker.classList.add('move-up');
        picker_reflect.classList.remove('squish');
    }, 250);
}

function hideColorPicker(color_picker, picker_reflect, picker_close, color_wheel) {
    color_picker.classList.remove('move-up');
    picker_reflect.classList.remove('squish');
    setTimeout(function() {
        color_picker.classList.add('hide');
        picker_reflect.classList.add('hide');
    }, 250);
}
hideColorPicker(color_picker, picker_reflect, picker_close, color_wheel);

function hideJustPicker(color_picker, picker_reflect, picker_close, color_wheel) {
    color_picker.classList.remove('move-up');
    setTimeout(function() {
        color_picker.classList.add('hide');
        }, 250);
}

picker_close.addEventListener('click', togglePicker);

color_wheel.addEventListener('click', () => {
    reset_active_swatch();
    color_mode = 'picker';
    togglePicker(color_picker, picker_reflect, picker_close, color_wheel);
    picker_reflect.classList.add('active');
});

function reset_active_swatch() {
    var active_swatch = document.querySelector('[data-swatch].active'); // Reset the active swatch
    if (active_swatch) {
        active_swatch.classList.remove('active'); // Remove the active class from the active swatch
    }
}

var colorPicker = new iro.ColorPicker(".color-picker", {
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
    picker_reflect.style.backgroundColor = hex;
});

// --------------------------------
// SWATCHES
// --------------------------------

const swatches = document.querySelectorAll('.swatch[data-swatch]'); // Create Swatches Array

swatches.forEach(swatch => {
    swatch.style.backgroundColor = swatch.dataset.swatch; // Set bck color to data HTML data-swatch
    swatch.setAttribute('title', swatch.dataset.swatch); // Add a hover title box
    swatch.addEventListener('click', () => {
        reset_active_swatch();
        swatch.classList.add('active'); // Set the clicked swatch to the active swatch
        color_mode = 'swatch'; // Set the color mode to Swatch
        new_swatch = swatch; // Set the new swatch
        togglePicker(color_picker, picker_reflect, picker_close, color_wheel);
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
}

// --------------------------------
// DOWNLOAD THE PAINTING
// --------------------------------

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

// --------------------------------
// FILL TOOL
// --------------------------------

function resetArtworkVar() {
    artwork = document.querySelector(".main-area svg"); // Re-vars the svg as artwork
}
resetArtworkVar();

const main_area = document.querySelector(".main-area");

main_area.addEventListener('click', (event) => {
    // Click listener is set to main area because the SVG gets removed and appended,
    // that would break the listener if it were set to the SVG,
    // var 'event' is a sub variable that gets redefined each click
    if (document.querySelector('.move-up')) {
        togglePicker(color_picker, picker_reflect, picker_close, color_wheel);
    } else {
        choose_color();
        push_version();
        resetArtworkVar();
        event.target.style.fill = color;
        artwork.style.fill = 'black'; // Keeps canvas black
        color_picker.style.display = 'none !important';
    }
});

// --------------------------------
// UNDO FUNCTION
// --------------------------------

let versions = [artwork.cloneNode(true)]; // Init the Versions Array, put default as first element in Versions

function push_version() {
    resetArtworkVar();
        if (versions.length == 30) { // 30 = Max undo
            versions.pop(); // Removes last element in Versions
        }
    var v_artwork = artwork.cloneNode(true);
    versions.unshift(v_artwork); // Adds current artwork to beginning of Versions
}

const undo_btn = document.querySelector('[data-command="undo"]')
undo_btn.addEventListener('click', undo);

function undo() {
    resetArtworkVar();
    if (versions.length == 0) {
        alert('There is nothing to undo!');
    } else {
        artwork.remove(); // Removes the artwork on page
        main_area.appendChild(versions[0]); // Insert last version into main-area area
        versions.shift(); // Deletes first element in Versions
    }
}


// --------------------------------
// UPLOAD BUTTON
// --------------------------------

const upload_btn = document.querySelector('[data-command="upload"]');
const upload_preview_container = document.querySelector('.upload-preview');
const artwork_input = document.querySelector('input#artwork-html');


upload_btn.addEventListener('click', () => {
    var current_previous = document.querySelector('.upload-preview svg')
    if (current_previous) {
        current_previous.remove();
    }
    
    resetArtworkVar();
    var v_artwork = artwork.cloneNode(true);
    upload_preview_container.appendChild(v_artwork);
    
    artwork_input.value = main_area.innerHTML;
    toggle_upload_screen();
})

var upload_modal = document.querySelector('.upload-modal');

// --------------------------------
// TOGGLING THE UPLOAD SCREEN
// --------------------------------

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

// -------------------------------
// COLOR SWATCH SCROLL/ CENTER
// -------------------------------

function responsivenessCheck() {
    var outerSwatch = document.getElementById("swatch-out");
    var outerWidth = outerSwatch.clientWidth;
    var innerWidth = document.getElementById("swatch-in").clientWidth;
    
    if (outerWidth > innerWidth) {
        outerSwatch.classList.remove("swatches");
        outerSwatch.classList.add("swatches-wide");
    } else {
        outerSwatch.classList.add("swatches");
        outerSwatch.classList.remove("swatches-wide");
    }
}
window.onresize = responsivenessCheck;
responsivenessCheck();

}