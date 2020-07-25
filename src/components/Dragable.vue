// See: https://dev.to/mandrewcito/vue-js-draggable-div-3mee

<template>
  <div ref="container" v-on:mousedown.prevent="dragMouseDown">
    <slot/>
  </div>
</template>
<script>
export default {
  name: "Dragable",
  props: {
    top: {
      type: Number,
      default: () => this.$refs.container.offsetTop
    },
    left: {
      type: Number,
      default: () => this.$refs.container.offsetLeft
    }
  },
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
      this._doUpdatePoistion( this._calcuateNewPoistion(movements) );
      this._emitOnPosUpdate();
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
    _doUpdatePoistion(newPos) {
      const { top, left } = newPos;
      const container = this.$refs.container;
      // TODO: 
      // I should let vue do the style property binding
      // at least I should try
      // let's do it after the canvas thing is figured out
      container.style.top = `${top}px`;
      container.style.left = `${left}px`;
    },
    _calcuateNewPoistion(movements) {
      const { movementX, movementY } = movements;
      const container = this.$refs.container;
      const top = container.offsetTop - movementY;
      const left = container.offsetLeft - movementX;
      return { top, left };
    },
    _unbindDragTracking() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
    _emitOnPosUpdate() {
      this.$emit("new-poistion");
    }
  },
  mounted() {
    this._doUpdatePoistion({
      top: this.top,
      left: this.left
    });
  }
}
</script>
