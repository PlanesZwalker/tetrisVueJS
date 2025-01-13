<template>
  <div class="score-display">
    <h2>Score: {{ score }}</h2>
    <h3>Level: {{ level }}</h3>
    <div class="next-piece">
      <h3>Next Piece</h3>
      <canvas ref="previewCanvas" width="160" height="120"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreDisplay',
  props: {
    score: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    nextPiece: {
      type: Array,
      required: true
    }
  },

// In ScoreDisplay.vue
mounted() {
  this.drawNextPiece();
},
watch: {
  nextPiece: {
    handler() {
      this.drawNextPiece();
    },
    deep: true
  }
},
  methods: {
   drawNextPiece() {
     if (!this.nextPiece.length) return;

     const ctx = this.$refs.previewCanvas.getContext('2d');

     // Clear the entire canvas with black background
     ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
     ctx.fillRect(0, 0, 160, 120);

     const colors = ['#000', '#0FF', '#F0F', '#FF0', '#0F0'];
     const blockSize = 28;
     const padding = 30;

     this.nextPiece.forEach((row, y) => {
       row.forEach((value, x) => {
         if (value) {
           ctx.fillStyle = colors[value];
           ctx.fillRect(
             x * blockSize + padding,
             y * blockSize + padding,
             blockSize - 2,
             blockSize - 2
           );
         }
       });
     });
   }

  }
}
</script>
<style scoped>
.score-display {
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #0ff;
  border-radius: 8px;
  padding: 0.9rem;
  color: #0ff;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
  flex-direction: row;
  display:block;
  height:max-content;
  max-height: 28vh;
  gap: 20px;

}

.score-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.next-piece {
  text-align: center;
  padding: 0.5rem;
  flex: 0 0 auto;
}

canvas {
  margin: 0 auto;
  border-radius: 4px;
  width: min(20vw, 160px);
  height: auto;
}


</style>
