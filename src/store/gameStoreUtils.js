import { reactive } from "vue";

export const gameStore = reactive({
  board: [],
  score: 0,
  level: 1,
  gameOver: false,

  initializeGame(rows, columns) {
    this.board = Array(rows).fill().map(() => Array(columns).fill({ color: null }));
    this.score = 0;
    this.level = 1;
    this.gameOver = false;
  },

  updateScore(points) {
    this.score += points;
    if (this.score % 100 === 0) this.level++;
  },

  setGameOver() {
    this.gameOver = true;
  },
});