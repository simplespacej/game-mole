import './style.css';
import characterImg from './character.png';

class Game {
    constructor(size = 4) {
        this.size = size;
        this.board = document.querySelector('.game-board') || this.createBoard();
        this.cells = [];
        this.character = document.createElement('img');
        this.character.src = characterImg;
        this.character.classList.add('character');

        this.score = 0;
        this.missed = 0;
        this.activeCell = null;
        this.timeout = null;

        this.init();
    }

    createBoard() {
        const board = document.createElement('div');
        board.classList.add('game-board');
        document.body.appendChild(board);
        return board;
    }

    init() {
        this.cells = [];
        this.board.innerHTML = '';
        for (let i = 0; i < this.size * this.size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            this.board.appendChild(cell);
            this.cells.push(cell);
        }
        this.startGame();
    }

    startGame() {
        this.nextMove();
    }

    nextMove() {
        if (this.missed >= 5) {
            alert(`Игра окончена! Ваш счёт: ${this.score}`);
            return;
        }

        if (this.activeCell && this.activeCell.contains(this.character)) {
            this.activeCell.removeChild(this.character);
        }

        const randomIndex = Math.floor(Math.random() * this.cells.length);
        this.activeCell = this.cells[randomIndex];
        this.activeCell.appendChild(this.character);

        this.character.onclick = () => {
            this.score++;
            console.log(`Очки: ${this.score}`);
            this.activeCell.removeChild(this.character);
            this.activeCell = null;
        };

        this.timeout = setTimeout(() => {
            if (this.activeCell && this.activeCell.contains(this.character)) {
                this.missed++;
                console.log(`Пропущено: ${this.missed}`);
            }
            this.nextMove();
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.game-board')) {
        new Game();
    }
});
