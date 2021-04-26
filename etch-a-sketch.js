//buttons for clearing space, selecting pen mode, and intializing grid default size
let blockNumber = 16;
let penmode = 0;
const clear = document.querySelector('#clearbutton');
const gridsize = document.querySelector('#gridsize');
const blackPen = document.querySelector('#blackpen');
const colorPen = document.querySelector('#colorpen');
const grayPen = document.querySelector('#graypen');
clear.addEventListener('click', () => {
    let allBlocks = document.querySelectorAll('.block')
    allBlocks.forEach((block) => {
        block.style.backgroundColor = 'white';
    });
});
gridsize.addEventListener('click', () => {
    blockCount = Number(window.prompt("Please enter an Integer between 3-100"));
    if (blockCount >= 3 && blockCount <= 100) {
        removeGrid(container);
        makeGrid(blockCount);
        return;
    }
    alert("Incorrect input: choose a number between 3-100");
    return;
})
blackPen.addEventListener('click', () => {
    penmode = 0;
    makeBlack();
    return;
})
colorPen.addEventListener('click', () => {
    penmode = 1;
    makeRandomColor();
    return;
})
grayPen.addEventListener('click', () => {
    penmode = 2;
    makeGray();
    return;
})


//define variables -- will add button that selects blockNumber later
const container = document.querySelector('#container');


//function that make blockNumber rows and populates them in the same amount with square divs
function makeGrid (gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let rowMake = document.createElement('div');
        rowMake.classList.add('row');
        container.appendChild(rowMake);

        //the toggle selects the current row being added and adds all the blocks to that current row. Otherwise all of the block are added to the first row
        rowMake.classList.toggle('currentrow');
        for (let j = 0; j < gridSize; j++) {
            let rowSelect = document.querySelector('.currentrow');
            let blockMake = document.createElement('div');
            blockMake.classList.add('block');
            rowSelect.appendChild(blockMake);
        }
        rowMake.classList.toggle('currentrow');
    };
    //adds the selected pen mode stored in a variable
    if(penmode == 1) {
        makeRandomColor();
        return;
    }
    else if(penmode == 2) {
        makeGray();
        return;
    }
    makeBlack();
    return;

    
}

function removeGrid(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//populates grid
makeGrid(blockNumber);


//pen modes
function makeBlack() {
    let allBlocks = document.querySelectorAll('.block')
    allBlocks.forEach((block) => {
        block.addEventListener('mouseover', () => {
            block.style.backgroundColor = 'black';
        });
    });
    return;
}

function makeRandomColor() {
    let allBlocks = document.querySelectorAll('.block')
    allBlocks.forEach((block) => {
        block.addEventListener('mouseover', () => {
            block.style.backgroundColor = randomColor();
        });
    });
    return;
}

function randomColor() {
    let color = Math.floor(Math.random()*16777215).toString(16);
    return "#" + color;
}

function makeGray() {
    let allBlocks = document.querySelectorAll('.block')
    allBlocks.forEach((block) => {
        block.addEventListener('mouseover', () => {
            let hex = RGBToHex(block.style.backgroundColor);
            console.log(hex);
            console.log(block.style.backgroundColor);
            block.style.backgroundColor = LightenDarkenColor(hex, -10);
        });
    });
    return;
}
//function from the internet that convert to hex and then darken the color
function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

  function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

