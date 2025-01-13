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
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a2e 100%);
}

.game-layout {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-instructions {
  color: #0ff;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #0ff;
}

.controls-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.neon-title {
  font-size: min(4vw, 2rem);
  margin: 0;
  text-align: center;
  padding: 5px;
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
  .game-page {
    padding: 10px;
  }

  .game-layout {
    flex-direction: column;
    align-items: center;
  }

  .game-instructions {
    display: none;
  }

  .neon-title {
    font-size: 1.6rem;
  }
}
</style>
