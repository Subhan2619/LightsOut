const boardSize = 5;
const gameBoard = document.getElementById('gameBoard');
const addendumBtn = document.getElementById('addendumBtn');
const addendum = document.getElementById('addendum');
const closeAddendum = document.getElementById('closeAddendum');
const clickCounterDisplay = document.getElementById('clickCounter');

let totalClicks = 0;

// Create the game board
function createBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => toggleLights(i));
        gameBoard.appendChild(button);
    }
}

// Update click counter
function updateClickCounter() {
    totalClicks++;
    clickCounterDisplay.textContent = `Total Clicks: ${totalClicks}`;
}

// Toggle lights
function toggleLights(index) {
    const buttons = Array.from(gameBoard.children);
    const neighbors = [index, index - 1, index + 1, index - boardSize, index + boardSize];

    neighbors.forEach(i => {
        if (i >= 0 && i < buttons.length) {
            const sameRow = Math.floor(i / boardSize) === Math.floor(index / boardSize);
            const verticalToggle = i % boardSize === index % boardSize;

            if (sameRow || verticalToggle) {
                buttons[i].classList.toggle('is-off');
            }
        }
    });

    updateClickCounter();

    if (checkWin()) {
        setTimeout(() => alert(`You win! Total Clicks: ${totalClicks}`), 100);
    }
}

// Randomize the board
function randomizeBoard() {
    const buttons = Array.from(gameBoard.children);
    for (let i = 0; i < buttons.length; i++) {
        if (Math.random() > 0.5) toggleLights(i);
    }
}

// Check win condition
function checkWin() {
    return Array.from(gameBoard.children).every(btn => btn.classList.contains('is-off'));
}

// Addendum functionality
addendumBtn.addEventListener('click', () => {
    addendum.classList.remove('hidden');
});

closeAddendum.addEventListener('click', () => {
    addendum.classList.add('hidden');
});

// Initialize
document.getElementById('lastModified').textContent = document.lastModified;
createBoard();
randomizeBoard();
