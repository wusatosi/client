// See: https://dev.to/mandrewcito/vue-js-draggable-div-3mee

<template>
  <div ref="container" v-on:mousedown.prevent="dragMouseDown">
    <slot/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { PositionOffset } from "@/utils/PanelTypes";

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
      const Movement = this._calculateMovement(event);
      this._persistNewPositionState(event);
      this._doUpdatePosition( this._calculateNewPosition(Movement) );
      this._emitOnPosUpdate();
    },
    _calculateMovement(event: MouseEvent): Movement {
      const movementX = this.positions.clientX - event.clientX;
      const movementY = this.positions.clientY - event.clientY;
      return { movementX, movementY };
    },
    _persistNewPositionState(event: MouseEvent) {
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
    },
    _doUpdatePosition(newPos: PositionOffset) {
      const { top, left } = newPos;
      const container = this.$refs.container as HTMLElement;
      // TODO: 
      // I should let vue do the style property binding
      // at least I should try
      // let's do it after the canvas thing is figured out
      container.style.top = `${top}px`;
      container.style.left = `${left}px`;
    },
    _calculateNewPosition(Movement: Movement): PositionOffset {
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
      this.$emit("new-position");
    }
  },
  mounted() {
    this._doUpdatePosition({
      top: this.top,
      left: this.left
    });
  }
})
</script>
