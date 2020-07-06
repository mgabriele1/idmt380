var canvas = document.querySelector("canvas");

if (canvas.getContext) {
    var context = canvas.getContext("2d");
    // drawing code here
    
    var pos = {x: 0, y: 0};
    
    document.addEventListener("mouseenter", setPosition);
    document.addEventListener("mousedown", setPosition);
    document.addEventListener("mousemove", draw);
    
    // window.addEventListener("resize", resizeCanvas);
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
        if (swatch.hasAttribute('id', 'selected')) {
            swatch.removeAttribute('id');
        }
        swatch.style.backgroundColor = swatch.dataset.hex;
        swatch.addEventListener('click', () => {
            swatch.setAttribute('id', 'selected');
        })
    });
    
    function draw(e)  {
        if (e.buttons !== 1) return; 
        // Stop if mouse is not clicked
        context.lineWidth = 20;
        context.lineCap = "round";
        
        var selected_swatch = document.querySelector('#selected').dataset.hex;
        console.log(selected_swatch);
        
        context.strokeStyle = selected_swatch;
        
        setPosition(e);
        
        context.beginPath();
        // Begin the drawing path
        context.moveTo(pos.x, pos.y);
        // From position
        context.lineTo(pos.x, pos.y);
        // To position
        context.stroke();
        // Draw the stroke
    }


    } else {
        alert('Canvas is not supported in your browser.')
    }