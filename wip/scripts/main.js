const main_area = document.querySelector('.main-area');
const color_picker = document.querySelector('input[type="color"]');
const canvas = document.querySelector('#canvas');

// Set default color_mode
var color_mode = 'picker';

color_picker.addEventListener('click', () => {
    color_mode = 'picker';
});

// function choose_color() {
//     if (color_mode == 'picker') {
//         brush_color = color_picker.value;
//     } else {
//         brush_color = document.querySelector('[data-swatch].active').dataset.swatch;
//     }
// }

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

    item.addEventListener('click', e => {
        if (document.querySelector('[data-swatch].active')) {
            document.querySelector('[data-swatch].active').classList.toggle('active');
        }
        item.classList.add('active');
        // color_mode = 'swatch';

        let color = item.dataset.swatch;

        paint.selectedColor = color;
    })
});

// Brush widths

const brush_widths = document.querySelectorAll('.brush-size');

brush_widths.forEach(item => {
    item.setAttribute('title', item.dataset.brushsize);

    item.style.width = item.dataset.brushsize;
    item.style.height = item.dataset.brushsize;

    item.addEventListener('click', e => {
        if (document.querySelector('[data-brushsize].active')) {
            document.querySelector('[data-brushsize].active').classList.toggle('active');
            let brushSize = item.dataset.brushsize;
            paint.brushSize = brushSize;
        }
        item.classList.add('active');
    });
});

// Line widths

const line_widths = document.querySelectorAll('.line-width');

line_widths.forEach(item => {
    item.setAttribute('title', item.dataset.linewidth);
    item.style.width = item.dataset.linewidth;
    item.style.height = item.dataset.linewidth;

    item.addEventListener('click', e => {
        if (document.querySelector('[data-linewidth].active')) {
            document.querySelector('[data-linewidth].active').classList.toggle('active');;
            let linewidth = item.dataset.linewidth;
            paint.lineWidth = linewidth;
        }
        item.classList.add('active');
    });
});

// Commands

const commands = document.querySelectorAll('[data-command]');

commands.forEach(item => {
    item.setAttribute('title', item.dataset.command);
    item.addEventListener('click', e => {
        // if (document.querySelector('[data-command].active')) {
        //     document.querySelector('[data-command].active').classList.toggle('active');
        // }
        // item.classList.add('active');

        let command = item.dataset.command;

        if (command == 'undo') {
            paint.undoPaint();
        } else if (command === 'download') {
            var canva = document.querySelector('canvas');
            var image = canvas.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-streme');
            var link = document.createElement('a');
            link.download = 'my-image.png';
            link.href = image;
            link.click();
        }
    });
});

// Shapes

const shapes = document.querySelectorAll('[data-shape]');

shapes.forEach(item => {
    item.setAttribute('title', item.dataset.shape);
    item.addEventListener('click', e => {
        if (document.querySelector('[data-shape].active')) {
            document.querySelector('[data-shape].active').classList.toggle('active');
        }
        item.classList.add('active');
    });
});

// Tools

const tools = document.querySelectorAll('[data-tool]');

tools.forEach(item => {
    item.setAttribute('title', item.dataset.tool);
    item.addEventListener('click', e => {
        if (document.querySelector('[data-tool].active')) {
            document.querySelector('[data-tool].active').classList.toggle('active');
        }
        item.classList.add('active');

        let selectedTool = item.dataset.tool;
        paint.activeTool = selectedTool;

        switch(selectedTool) {
            case 'line':
            case 'square':
            case 'circle':
            case 'triangle':
            case 'pencil':
                document.querySelector('.for-shapes').style.display = 'inherit';
                document.querySelector('.for-brush').style.display = 'none';
                break;
            case 'brush':
            case 'eraser':
                document.querySelector('.for-brush').style.display = 'inherit';
                document.querySelector('.for-shapes').style.display = 'none';
            default:
                document.querySelector('.for-brush').style.display = 'none';
                document.querySelector('.for-shapes').style.display = 'none';
        };
    });
});

// const TOOL_LINE = 'line';
// const TOOL_RECTANGLE = 'rectangle';
// const TOOL_CIRCLE = 'circle';
// const TOOL_TRIANGLE = 'triangle';
// const TOOL_PAINT_BUCKET = 'paint-bucket';
// const TOOL_PENCIL = 'pencil';
// const TOOL_BRUSH = 'brush';
// const TOOL_ERASER = 'eraser';
// const TOOL_SQUARE = 'square';

class Fill {
    constructor(canvas, point, color) {
        this.context = canvas.getContext('2d');

        this.imageData = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);

        const targetColor = this.getPixel(point);

        const fillColor = this.hexToRgba(color);

        this.fillStack = [];

        this.floodFill(point, targetColor, fillColor);
        this.fillColor();
    }

    floodFill(point, targetColor, fillColor) {
        if (this.colorsMatch(targetColor, fillColor)) return;

        const currentColor = this.getPixel(point);

        if (this.colorsMatch(currentColor, targetColor)) {
            this.setPixel(point, fillColor);

            this.fillStack.push([new Point(point.x + 1, point.y), targetColor, fillColor]);
            this.fillStack.push([new Point(point.x - 1, point.y), targetColor, fillColor]);
            this.fillStack.push([new Point(point.x, point.y  + 1), targetColor, fillColor]);
            this.fillStack.push([new Point(point.x, point.y  - 1), targetColor, fillColor]);
        }
    }

    fillColor() {
        if (this.fillStack.length) {
            let range = this.fillStack.length;

            for (let i = 0; i < range; i++) {
                this.floodFill(this.fillStack[i][0], this.fillStack[i][1], this.fillStack[i][2]);
            }

            this.fillStack.splice(0, range);

            this.fillColor();
        } else {
            this.context.putImageData(this.imageData, 0, 0);
            this.fillStack = [];
        }
    }

    getPixel(point) {
        if (point.x < 0 || point.y < 0 || point.x >= this.imageData.width, point.y >= this.imageData.height) {
            return [-1, -1, -1, -1];
        } else {
            const offset = (point.y * this.imageData.width + point.x) * 4;

            return [
                [this.imageData.date[offset + 0]],  // Red
                [this.imageData.date[offset + 1]],  // Green
                [this.imageData.date[offset + 2]],  // Blue
                [this.imageData.date[offset + 3]]   // Alpha
            ];

        }
    }

    setPixel(point, fillColor) {
        const offset = (point.y * this.imageData.width + point.x) * 4;

        this.imageData.data[offset + 0] = fillColor[0]; // Red
        this.imageData.data[offset + 1] = fillColor[1]; // Green
        this.imageData.data[offset + 2] = fillColor[2]; // Blue
        this.imageData.data[offset + 3] = fillColor[3]; // Alpha
    }

    colorsMatch(color1, color2) {
        return color1[0] === color2[0] && color1[1] === color2[1]
            && color1[2] === color2[2] && color1[3] === color2[3];
    }

    hexToRgba(hex) {
        var result  = /^#?([a-f\d]{2})([a-f\d{2}])([a-f\d]{2})#/i.exec(hex);
        return [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            255
        ];
    }
}

// Canvas

class Paint {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = canvas.getContext('2d');
        this.undoStack = [];
        this.undoLimit = 5;
    }

    set activeTool(tool) {
        this.tool = tool;
    }

    set lineWidth(linewidth) {
        this._lineWidth = linewidth;
        this.context.lineWidth = this._lineWidth;
    }

    set brushSize(brushSize) {
        this._brushSize = brushSize;
    }

    set selectedColor(color) {
        this.color = color;
        this.context.strokeStyle = this.color;
    }

    init() {
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e) {
        this.savedData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.height);

        if (this.undoStack.length >= this.undoLimit) this.undoStack.shift();
        this.undoStack.push(this.savedData);

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPos = getMouseCoordsOnCanvas(e, this.canvas);

        if (this.tool == 'pencil' || this.tool == 'brush') {
            this.context.beginPath();
            this.context.moveTo(this.startPos.x, this.startPos.y)
            this.context.lineCap = 'round';
        } else if (this.tool == 'fill') {
            new Fill(this.canvas, this.startPos, this.color);
        } else if (this.tool == 'eraser') {
            this.context.clearRect(this.startPos.x, this.startPos.y, this._brushSize, this._brushSize);
        }
    }

    onMouseMove(e) {
        this.currentPos = getMouseCoordsOnCanvas(e, this.canvas);
        
        switch(this.tool) {
            case 'line':
            case 'rectangle':
            case 'circle':
            case 'triangle':
                this.drawShape();
                break;
            case 'pencil':
                this.drawFreeLine(this._lineWidth);
                break;
            case 'brush':
                this.drawFreeLine(this._brushSize);
                break;
            case 'eraser':
                this.context.clearRect(this.currentPos.x, this.currentPos.y, this._brushSize, this._brushSize);
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

        // this.tool = 'rectangle';

        if (this.tool == 'line') {
            console.log('line');
            this.context.moveTo(this.startPos.x, this.startPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
        } else if (this.tool == 'rectangle') {
            console.log('rectangle');
            this.context.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y);
        } else if (this.tool == 'circle') {
            let distance = findDistance(this.startPos, this.currentPos);
            this.context.arc(this.startPos.x, this.startPos.y, distance, 0, 2 * Math.PI, false);
        } else if (this.tool == 'triangle') {
            this.context.moveTo(this.startPos.x + (this.currentPos.x - this.startPos.x) / 2, this.startPos.y);
            this.context.lineTo(this.startPos.x, this.currentPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
            this.context.closePath();
        }

        this.context.stroke();
    }

    drawFreeLine(lineWidth) {
        this.context.lineWidth = lineWidth;
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        this.context.stroke();
    }

    undoPaint() {
        if (this.undoStack.length > 0) {
            this.context.putImageData(this.undoStack[this.undoStack.length - 1], 0, 0);
            this.undoStack.pop();
        } else {
            alert('You have reached undo limit');
        }
    }
}

var paint = new Paint('canvas');
paint.activeTool = 'line';
// concern
paint.lineWidth = 1;
paint.brushSize = 16;
paint.selectedColor = '#000000';
paint.init();

// Utility

function getMouseCoordsOnCanvas(e, canvas) {
    let rect = canvas.getBoundingClientRect();
    let x = Math.round(e.clientX - rect.left);
    let y = Math.round(e.clientY - rect.top);
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