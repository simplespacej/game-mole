import './style.css';
import characterImg from './character.png';
const boardSize = 4;

const existingBoard = document.querySelector('.game-board');
if (existingBoard) {
  existingBoard.remove();
}

const board = document.createElement('div');
board.classList.add('game-board');
document.body.appendChild(board);

const cells = [];
for (let i = 0; i < boardSize * boardSize; i += 1) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  board.appendChild(cell);
  cells.push(cell);
}

const character = document.createElement('img');
character.src = characterImg;
character.classList.add('character');
cells[0].appendChild(character);

function moveCharacter() {
  let newIndex;
  let currentIndex = cells.findIndex((cell) => cell.contains(character));

  do {
    newIndex = Math.floor(Math.random() * cells.length);
  } while (newIndex === currentIndex);

  cells[newIndex].appendChild(character);
}

setInterval(moveCharacter, 1000);