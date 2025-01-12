<template>
  <div class="controls">
    <button @click="moveLeft">Left</button>
    <button @click="rotatePiece">Rotate</button>
    <button @click="moveRight">Right</button>
    <button @click="dropPiece">Drop</button>
  </div>
</template>

<script>
export default {
  name: "Controls",
  methods: {
    moveLeft() {
      this.$emit("move", "left");
    },
    rotatePiece() {
      this.$emit("move", "rotate");
    },
    moveRight() {
      this.$emit("move", "right");
    },
    dropPiece() {
      this.$emit("move", "drop");
    },
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}
button {
  padding: 10px 20px;
  border: none;
  background-color: #444;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #888;
}
</style>