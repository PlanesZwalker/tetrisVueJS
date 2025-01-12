<template>
  <div class="game-status">
    <h2>Score: {{ score }}</h2>
    <h3>Level: {{ level }}</h3>
    <h3 v-if="gameOver">Game Over</h3>
  </div>
</template>

<script>
export default {
  name: "GameStatus",
  props: {
    score: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    gameOver: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.game-status {
  margin-bottom: 20px;
  text-align: center;
}
</style>