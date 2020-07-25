// See: https://dev.to/mandrewcito/vue-js-draggable-div-3mee

<template>
  <div ref="container" v-on:mousedown.prevent="dragMouseDown">
    <slot/>
  </div>
</template>
<script>
export default {
  name: "Dragable",
  data() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined
      }
    }
  },
  methods: {
    dragMouseDown(event) {
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      this._bindDragTracking();
    },
    _bindDragTracking() {
      document.onmousemove = this._onElementDrag;
      document.onmouseup = this._unbindDragTracking;
    },
    _onElementDrag(event) {
      const movements = this._calcuateMovements(event);
      this._persistNewPoistionState(event);
      this._doUpdatePoistion(movements);
    },
    _calcuateMovements(event) {
      const movementX = this.positions.clientX - event.clientX;
      const movementY = this.positions.clientY - event.clientY;
      return { movementX, movementY };
    },
    _persistNewPoistionState(event) {
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
    },
    _doUpdatePoistion(movements) {
      const { movementX, movementY } = movements;
      const container = this.$refs.container;
      container.style.top = (container.offsetTop - movementY) + 'px';
      container.style.left = (container.offsetLeft - movementX) + 'px';
    },
    _unbindDragTracking() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}
</script>
