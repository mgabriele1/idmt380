const main_area = document.querySelector('.main-area');
const color_picker = document.querySelector('input[type="color"]');
const canvas = document.querySelector('#canvas');

// Set default color_mode
var color_mode = 'picker';

color_picker.addEventListener('click', () => {
    color_mode = 'picker';
});

main_area.addEventListener('click', () => {
    if (color_mode == 'picker') {
        brush_color = color_picker.value;
    } else {
        brush_color = document.querySelector('[data-swatch].active-swatch').dataset.swatch;
    }
    // console.log('Brush Color = ' + brush_color);
});

// Color wheel

const color_wheel = document.querySelector('.stack');

color_wheel.addEventListener('click', () => {
    color_picker.click();
});

// Swatches

const swatches = document.querySelectorAll('[data-swatch]');

swatches.forEach(item => {
    item.style.backgroundColor = item.dataset.swatch;
    item.setAttribute('title', item.dataset.swatch);

    item.addEventListener('click', () => {
        if (document.querySelector('[data-swatch].active-swatch')) {
            document.querySelector('[data-swatch].active-swatch').classList.toggle('active-swatch');
        }
        item.classList.add('active-swatch');
        color_mode = 'swatch';
    })
});

// Brush widths

const brush_widths = document.querySelectorAll('.brush-width');

brush_widths.forEach(item => {
    item.setAttribute('title', item.dataset.brushwidth);

    item.style.width = item.dataset.brushwidth;
    item.style.height = item.dataset.brushwidth;

    item.addEventListener('click', () => {
        var brush_size = item.dataset.brushwidth;
    })
});

// Lines widths

const line_widths = document.querySelectorAll('.line-width');

line_widths.forEach(item => {
    item.setAttribute('title', item.dataset.linewidth);
    item.style.width = item.dataset.linewidth;
    item.style.height = item.dataset.linewidth;

    item.addEventListener('click', () => {
        var brush_size = item.dataset.linewidth;
    })
});

// Commands

const commands = document.querySelectorAll('[data-command]');

commands.forEach(item => {
    item.setAttribute('title', item.dataset.command);
    item.addEventListener('click', () => {
        if (document.querySelector('[data-command].active-command')) {
            document.querySelector('[data-command].active-command').classList.toggle('active-command');
        }
        item.classList.add('active-command');
    })
});

// Shapes

const shapes = document.querySelectorAll('[data-shape]');

shapes.forEach(item => {
    item.setAttribute('title', item.dataset.shape);
    item.addEventListener('click', () => {
        if (document.querySelector('[data-shape].active-shape')) {
            document.querySelector('[data-shape].active-shape').classList.toggle('active-shape');
        }
        item.classList.add('active-shape');
    })
});

// Tools

const tools = document.querySelectorAll('[data-tool]');

tools.forEach(item => {
    item.setAttribute('title', item.dataset.tool);
    item.addEventListener('click', () => {
        if (document.querySelector('[data-tool].active-tool')) {
            document.querySelector('[data-tool].active-tool').classList.toggle('active-tool');
        }
        item.classList.add('active-tool');

        let selectedTool = item.dataset.tool;

        switch(selectedTool) {
            case item.dataset.tool = 'line':
            case item.dataset.tool = 'square':
            case item.dataset.tool = 'circle':
            case item.dataset.tool = 'triangle':
            case item.dataset.tool = 'pencil':
                document.querySelector('.for-shapes').style.display = 'inherit';
                document.querySelector('.for-brush').style.display = 'none';
                break;
            case item.dataset.tool = 'brush':
                document.querySelector('.for-brush').style.display = 'inherit';
                document.querySelector('.for-shapes').style.display = 'none';
            default:
                document.querySelector('.for-brush').style.display = 'none';
                document.querySelector('.for-shapes').style.display = 'none';
        }
    })
});

const TOOL_LINE = 'line';
const TOOL_RECTANGLE = 'rectangle';
const TOOL_CIRCLE = 'circle';
const TOOL_TRIANGLE = 'triangle';
const TOOL_PAINT_BUCKET = 'paint-bucket';
const TOOL_PENCIL = 'pencil';
const TOOL_BRUSH = 'brush';
const TOOL_ERASER = 'eraser';
const TOOL_SQUARE = 'square';

// Canvas

class Paint {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = canvas.getContext('2d');

    }
    set activeTool(tool) {
        this.tool = tool;
    }

    init() {
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e) {
        this.savedData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.height)

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPos = getMouseCoordsOnCanvas(e, this.canvas);

        // console.log(this.startPos);
    }

    onMouseMove(e) {
        this.currentPos = getMouseCoordsOnCanvas(e, this.canvas);
        
        switch(this.tool) {
            case TOOL_LINE:
            case TOOL_RECTANGLE:
            case TOOL_CIRCLE:
            case TOOL_TRIANGLE:
                this.drawShape();
                break;
            default:
                break;
        }
    }

    onMouseUp(e) {
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }

    drawShape() {
        this.context.putImageData(this.savedData, 0, 0);

        this.context.beginPath();

        if (this.tool == TOOL_LINE) {
            console.log('line');
            this.context.moveTo(this.startPos.x, this.startPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
        } else if (this.tool == TOOL_RECTANGLE) {
            console.log('rectangle');
            this.context.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y);
        } else if (this.tool == TOOL_CIRCLE) {
            let distance = findDistance(this.startPos, this.currentPos);
            this.context.arc(this.startPos.x, this.startPos.y, distance, 0, 2 * Math.PI, false);
        } else if (this.tool == TOOL_TRIANGLE) {
            this.context.moveTo(this.startPos.x + (this.currentPos.x - this.startPos.x) / 2, this.startPos.y);
            this.context.lineTo(this.startPos.x, this.currentPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
            this.context.closePath();
        }

        this.context.stroke();
    }
}

var paint = new Paint('canvas');
paint.activeTool = TOOL_LINE;
paint.init();

// Utility

function getMouseCoordsOnCanvas(e, canvas) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return new Point(x, y);
}

function findDistance(coord1, coord2) {
    let exp1 = Math.pow(coord2.x - coord1.x, 2);
    let exp2 = Math.pow(coord2.y - coord1.y, 2);

    let distance = Math.sqrt(exp1 + exp2);

    return distance;
}

// Point

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}