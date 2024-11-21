const gridSize = 5; // 5x5 grid
const gridContainer = document.getElementById('grid');
let board = [];
let totalClicks = 0; // Track total number of clicks

// Function to create the game grid
function createGrid() {
    gridContainer.innerHTML = ''; // Clear any previous grid
    board = [];

    // Create the squares and add to the grid
    for (let row = 0; row < gridSize; row++) {
        const rowArray = [];
        for (let col = 0; col < gridSize; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.addEventListener('click', () => toggleSquare(row, col));

            rowArray.push(false); // False means the square is "off" initially
            gridContainer.appendChild(square);
        }
        board.push(rowArray);
    }
}

// Function to toggle the state of a square and its neighbors
function toggleSquare(row, col) {
    // Toggle the clicked square
    toggle(row, col);

    // Toggle neighboring squares
    if (row > 0) toggle(row - 1, col); // Top
    if (row < gridSize - 1) toggle(row + 1, col); // Bottom
    if (col > 0) toggle(row, col - 1); // Left
    if (col < gridSize - 1) toggle(row, col + 1); // Right

    // Increment the total clicks counter
    totalClicks++;
    document.getElementById('clicksCounter').textContent = totalClicks;

    // Check if the game is solved
    if (isSolved()) {
        setTimeout(() => {
            alert("You win!");
        }, 200);
    }
}

// Function to toggle a specific square
function toggle(row, col) {
    board[row][col] = !board[row][col]; // Toggle the state
    const index = row * gridSize + col;
    const square = gridContainer.children[index];
    square.classList.toggle('is-off', board[row][col]); // Update UI
}

// Function to check if the game is solved
function isSolved() {
    return board.every(row => row.every(state => !state)); // All squares must be "off"
}

// Initialize the game with a random solvable configuration
function initGame() {
    createGrid();
    randomSolveableStart();
}

// Function to generate a random solvable starting configuration
function randomSolveableStart() {
    const randomClicks = Math.floor(Math.random() * 20) + 10; // Number of random clicks
    for (let i = 0; i < randomClicks; i++) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        toggleSquare(row, col);
    }
}

// Show or hide the addendum content
document.getElementById('addendumButton').addEventListener('click', function() {
    const content = document.getElementById('addendumContent');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
});

// Start the game
initGame();
