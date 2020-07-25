<template>
  <div id="parent">
    <h1>loaded</h1>
    <canvas ref="canvas"/>
  </div>
</template>
<script>
import paper from "paper";

export default {
  name: "Panel-Background",
  mounted() {
    // Copyed from http://paperjs.org/tutorials/getting-started/using-javascript-directly/
    paper.setup(this.$refs.canvas);
		// Create a Paper.js Path to draw a line into it:
		const path = new paper.Path();
		// Give the stroke a color
		path.strokeColor = 'black';
		const start = new paper.Point(100, 100);
		// Move to start and draw a line from there
		path.moveTo(start);
		// Note that the plus operator on Point objects does not work
		// in JavaScript. Instead, we need to call the add() function:
		path.lineTo(start.add([ 200, -50 ]));
		// Draw the view now:
		paper.view.draw();
  }
}
</script>
<style scoped>
#parent {
  height: 100%;
}
canvas {
  height: 100%;
  width: 100%;
}
</style>