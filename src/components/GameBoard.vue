<template>
  <div class="game-container">
    <ScoreDisplay :score="score" :level="level" :nextPiece="nextPiece" ref="scoreDisplay" />
    <div class="game-board" ref="gameBoard">
      <canvas ref="gameCanvas" width="300" height="600"></canvas>
      <div v-if="gameOver" class="game-over">
        <h2>Game Over</h2>
        <p>Final Score: {{ score }}</p>
        <button @click="restartGame">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import ScoreDisplay from './ScoreDisplay.vue'

export default {
  name: 'GameBoard',
  components: { ScoreDisplay },
  data() {
    return {
      ctx: null,
      currentPiece: null,
      nextPiece: [],
      board: Array(20).fill().map(() => Array(10).fill(0)),
      pieces: [
        [[1, 1, 1, 1]], // I piece
        [[2, 0], [2, 0], [2, 2]], // L piece
        [[0, 3, 0], [3, 3, 3]], // T piece
        [[4, 4], [4, 4]] // Square piece
      ],
    score: 0,
    level: 1,
    linesCleared: 0,
    highScores: JSON.parse(localStorage.getItem('tetrisHighScores')) || [],
    dropInterval: 1000, // Base speed
      gameOver: false,
      gameLoop: null,
    }
  },
  mounted() {
    this.initGame()
  },
  methods: {
    initGame() {
      const canvas = this.$refs.gameCanvas
      this.ctx = canvas.getContext('2d')
      this.gameOver = false
      this.score = 0
      this.level = 1
      this.board = Array(20).fill().map(() => Array(10).fill(0))
      this.setupControls()
      this.spawnPiece()
      this.startGameLoop()
    },
    startGameLoop() {
      let lastTime = 0
      let dropCounter = 0

      const update = (time = 0) => {
        const deltaTime = time - lastTime
        lastTime = time
        dropCounter += deltaTime

        if (dropCounter > this.dropInterval) {
          this.dropPiece()
          dropCounter = 0
        }

        this.draw()
        if (!this.gameOver) {
          this.gameLoop = requestAnimationFrame(update)
        }
      }

      this.gameLoop = requestAnimationFrame(update)
    },

  saveHighScore() {
    this.highScores.push({
      score: this.score,
      level: this.level,
      date: new Date().toLocaleDateString()
    });

    // Keep top 5 scores
    this.highScores.sort((a, b) => b.score - a.score);
    this.highScores = this.highScores.slice(0, 5);

    localStorage.setItem('tetrisHighScores', JSON.stringify(this.highScores));
  },
  checkGameOver() {
    if (this.board[0].some(cell => cell !== 0) ||
        (this.currentPiece && this.checkCollision())) {
      this.gameOver = true;
      this.saveHighScore();
      cancelAnimationFrame(this.gameLoop);
      return true;
    }
    return false;
  },

spawnPiece() {
  const getRandomPiece = () => {
    const index = Math.floor(Math.random() * this.pieces.length);
    return [...this.pieces[index]];
  };

  if (!this.nextPiece.length) {
    this.nextPiece = getRandomPiece();
  }

  this.currentPiece = {
    shape: [...this.nextPiece],
    x: Math.floor((10 - this.nextPiece[0].length) / 2),
    y: 0
  };

  this.nextPiece = getRandomPiece();

  // Check game over immediately after spawning
  if (this.checkGameOver()) {
    return false;
  }

  this.$nextTick(() => {
    if (this.$refs.scoreDisplay) {
      this.$refs.scoreDisplay.drawNextPiece();
    }
  });

  return true;
},
    restartGame() {
      // Clear all timeouts and animations
      cancelAnimationFrame(this.gameLoop);

      // Reset game state
      this.board = Array(20).fill().map(() => Array(10).fill(0));
      this.score = 0;
      this.level = 1;
      this.gameOver = false;
      this.nextPiece = [];
      this.currentPiece = null;

      // Start fresh game
      this.initGame();
    },
    setupControls() {
      window.addEventListener('keydown', (e) => {
        switch(e.key) {
          case 'ArrowLeft':
            this.movePiece(-1);
            break;
          case 'ArrowRight':
            this.movePiece(1);
            break;
          case 'ArrowDown':
            this.dropPiece();
            break;
          case 'ArrowUp':
            this.rotatePiece();
            break;
          case ' ':
            this.hardDrop();
            break;
        }
      });
    },
hardDrop() {
  if (!this.currentPiece || this.gameOver) return;

  let dropDistance = 0;
  while (!this.checkCollision()) {
    this.currentPiece.y++;
    dropDistance++;
  }

  this.currentPiece.y--;

  // Lock the current piece in place
  this.freezePiece();

  // Add lock delay
  setTimeout(() => {
    if (!this.gameOver) {
      this.spawnPiece();
    }
  }, 100);
}
,
    checkCollision() {
      const shape = this.currentPiece.shape;
      const pieceX = this.currentPiece.x;
      const pieceY = this.currentPiece.y;

      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            const boardX = pieceX + x;
            const boardY = pieceY + y;

            if (boardY >= 20) return true;
            if (boardX < 0 || boardX >= 10) return true;
            if (boardY >= 0 && this.board[boardY][boardX] !== 0) {
              return true;
            }
          }
        }
      }
      return false;
    },
    movePiece(dir) {
      const oldX = this.currentPiece.x;
      this.currentPiece.x += dir;
      if (this.checkCollision()) {
        this.currentPiece.x = oldX;
      }
    },
   dropPiece() {
     if (!this.currentPiece) return;

     const oldY = this.currentPiece.y;
     this.currentPiece.y++;

     if (this.checkCollision()) {
       this.currentPiece.y = oldY;
       this.freezePiece();
       if (!this.gameOver) {
         this.spawnPiece();
       }
     }
   }
,
    freezePiece() {
      if (!this.currentPiece) return;

      const shape = this.currentPiece.shape;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            const boardY = this.currentPiece.y + y;
            const boardX = this.currentPiece.x + x;
            if (boardY >= 0) {
              this.board[boardY][boardX] = shape[y][x];
            }
          }
        }
      }

      this.clearLines();
      this.currentPiece = null;
    },
clearLines() {
  let linesCleared = 0;
  const linesToClear = [];

  // First pass: identify lines to clear
  for (let y = this.board.length - 1; y >= 0; y--) {
    if (this.board[y].every(cell => cell !== 0)) {
      linesToClear.push(y);
    }
  }

  // Second pass: clear lines and update score once
  if (linesToClear.length > 0) {
    // Simple flash effect
    gsap.to(this.$refs.gameBoard, {
      filter: 'brightness(2)',
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    // Clear lines from bottom to top
    linesToClear.forEach(y => {
      this.board.splice(y, 1);
      this.board.unshift(new Array(10).fill(0));
    });

    // Update score
    const points = [100, 300, 500, 800][linesToClear.length - 1] * this.level;
    this.score += points;

    // Show score popup
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = `+${points}`;
    this.$refs.gameBoard.appendChild(popup);

    gsap.to(popup, {
      y: -50,
      opacity: 0,
      duration: 0.5,
      onComplete: () => popup.remove()
    });
  }
},
    rotatePiece() {
      const rotated = [];
      const shape = this.currentPiece.shape;

      for (let i = 0; i < shape[0].length; i++) {
        rotated[i] = [];
        for (let j = 0; j < shape.length; j++) {
          rotated[i][j] = shape[shape.length - 1 - j][i];
        }
      }

      const originalShape = this.currentPiece.shape;
      this.currentPiece.shape = rotated;

      if (this.checkCollision()) {
        this.currentPiece.shape = originalShape;
      }
    },
    draw() {
      this.ctx.clearRect(0, 0, 300, 600);
      this.drawBoard();
      this.drawCurrentPiece();
    },
    drawBoard() {
      const colors = ['#000', '#0FF', '#F0F', '#FF0', '#0F0'];
      this.board.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            this.ctx.fillStyle = colors[value];
            this.ctx.fillRect(x * 30, y * 30, 28, 28);
          }
        });
      });
    },
    drawCurrentPiece() {
      if (!this.currentPiece) return;
      const colors = ['#000', '#0FF', '#F0F', '#FF0', '#0F0'];
      this.currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            this.ctx.fillStyle = colors[value];
            this.ctx.fillRect(
              (this.currentPiece.x + x) * 30,
              (this.currentPiece.y + y) * 30,
              28,
              28
            );
          }
        });
      });
    }
  }
}
</script>

<style scoped>
.game-container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.game-board {
  position: relative;
  border: 2px solid #0ff;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  border: 2px solid #0ff;
  border-radius: 8px;
  text-align: center;
  color: #0ff;
}

.game-over button {
  background: #0ff;
  color: black;
  border: none;
  padding: 10px 20px;
  margin-top: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.game-over button:hover {
  background: #fff;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  width: fit-content;
  display: block;
}
</style>
