// See: https://dev.to/mandrewcito/vue-js-draggable-div-3mee

<template>
  <div ref="container" v-on:mousedown.prevent="dragMouseDown">
    <slot/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { PoistionOffset } from "../utils/Panels";

interface Movement {
  movementX: number;
  movementY: number;
}

export default Vue.extend({
  name: "Dragable",
  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      positions: {
        clientX: NaN,
        clientY: NaN
      }
    }
  },
  methods: {
    dragMouseDown(event: MouseEvent) {
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      this._bindDragTracking();
    },
    _bindDragTracking() {
      document.onmousemove = this._onElementDrag;
      document.onmouseup = this._unbindDragTracking;
    },
    _onElementDrag(event: MouseEvent) {
      const Movement = this._calcuateMovement(event);
      this._persistNewPoistionState(event);
      this._doUpdatePoistion( this._calcuateNewPoistion(Movement) );
      this._emitOnPosUpdate();
    },
    _calcuateMovement(event: MouseEvent): Movement {
      const movementX = this.positions.clientX - event.clientX;
      const movementY = this.positions.clientY - event.clientY;
      return { movementX, movementY };
    },
    _persistNewPoistionState(event: MouseEvent) {
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
    },
    _doUpdatePoistion(newPos: PoistionOffset) {
      const { top, left } = newPos;
      const container = this.$refs.container as HTMLElement;
      // TODO: 
      // I should let vue do the style property binding
      // at least I should try
      // let's do it after the canvas thing is figured out
      container.style.top = `${top}px`;
      container.style.left = `${left}px`;
    },
    _calcuateNewPoistion(Movement: Movement): PoistionOffset {
      const { movementX, movementY } = Movement;
      const container = this.$refs.container as HTMLElement;
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
})
</script>
