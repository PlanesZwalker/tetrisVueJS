<template>
  <div class="game-page">
    <h1 class="neon-title">TetrisJAVA</h1>
    <div class="game-layout">
      <GameBoard />
    </div>
  </div>
</template>

<script>
import GameBoard from '../components/GameBoard.vue'

export default {
  name: 'GamePage',
  components: {
    GameBoard
  }
}
</script>

<style scoped>
.game-page {
  max-width: 1024px;
  margin: 0 auto;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a2e 100%);
  color: #fff;
  padding: 20px;
}

.game-layout {
  display: grid;
  grid-template-columns: minmax(auto, 400px);
  gap: 1.5rem;
  margin: 0 auto;
}

.neon-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
  text-shadow: 0 0 5px #fff,
               0 0 10px #fff,
               0 0 20px #0ff,
               0 0 40px #0ff;
  animation: neon-pulse 1.5s ease-in-out infinite alternate;
}

@keyframes neon-pulse {
  from {
    text-shadow: 0 0 5px #fff,
                 0 0 10px #fff,
                 0 0 20px #0ff,
                 0 0 40px #0ff;
  }
  to {
    text-shadow: 0 0 5px #fff,
                 0 0 15px #fff,
                 0 0 25px #0ff,
                 0 0 50px #0ff;
  }
}

@media (max-width: 768px) {
  .game-layout {
    grid-template-columns: 1fr;
  }
}
</style>
