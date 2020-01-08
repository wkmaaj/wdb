// DOM variables
var colorDisplay = document.querySelector("#colorDisplay");
var colorResetBtn = document.querySelector("#colorResetBtn");
var h1 = document.querySelector("h1");
var message = document.querySelector("#message");
var squares = document.querySelectorAll(".square");
var modes = document.querySelectorAll(".diffMode");


// Initial script execution
var numSquares = 6;
init();


// Functions
function init() {
    initListeners();    
    loadBoard(numSquares);
}

function initListeners() {
    setupColorResetListener();
    setupDiffModeListeners();
    setupSquaresListeners();
}

function setupDiffModeListeners() {
    for(let i=0; i<modes.length; i++) {
        modes[i].addEventListener("click", function() {
            removeSelected(modes);
            this.classList.add("selected");
            console.log(this.textContent);
            if(this.textContent === "Beg") {
                numSquares = 3;
            } else if(this.textContent === "Med") {
                numSquares = 6;
            } else if(this.textContent === "Adv") {
                numSquares = 9;
            } else if(this.textContent === "Exp") {
                numSquares = 12;
            } else {
                numSquares = 15;
            }
            console.log("User switched difficulty mode to \"" + this.textContent + "\", reloading board with " + numSquares + " squares");
            loadBoard(numSquares);
        })
    };
}

function setupSquaresListeners() {
    for(let i=0; i<squares.length; i++) {
        squares[i].addEventListener("click", function() {
            console.log("Clicked square with color: ", this.style.backgroundColor);
            if(this.style.backgroundColor === pickedColor) {
                changeColor(this.style.backgroundColor);
                message.textContent = "Correct!";
                colorResetBtn.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "rgb(35, 35, 35)";
                message.textContent = "Try again";
            }
        });
    };
}

function setupColorResetListener() {
    colorResetBtn.addEventListener("click", function() {
        console.log("User reloading board with " + numSquares + " squares");
        loadBoard(numSquares);
    });
}

function loadBoard(num) {
    colors = generateRandomColors(num);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "rgb(70, 130, 180)";
    colorResetBtn.textContent = "New Colors";
    message.textContent = "";
    
    for(let i=0; i<squares.length; i++) {
        if(colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }
}

function removeSelected(modes) {
    for(let i=0; i<modes.length; i++) {
        modes[i].classList.remove("selected");
    }
};

function changeColor(color) {
    squares.forEach(function(square) {
        square.style.backgroundColor = color;
    })
    h1.style.backgroundColor = color;
};

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

function generateRandomColors(num) {
    let arr = [];
    for(let i=0; i<num; i++) {
        arr.push(randomColor());
    }
    return arr;
};

function randomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return ("rgb(" + red + ", " + green + ", " + blue +")");
};