// See: https://dev.to/mandrewcito/vue-js-draggable-div-3mee

<template>
  <div
      v-bind:style="{top: positionCurrent.top + 'px', left: positionCurrent.left + 'px'}"
      ref="container"
      v-on:mousedown.prevent="dragMouseDown"
  >
    <slot/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {PositionOffset} from "@/utils/PanelTypes";

interface Movement {
  movementX: number;
  movementY: number;
}

export default Vue.extend({
  name: "Dragable",
  props: {
    position: {
      type: Object as Vue.PropType<PositionOffset>
    }
  },
  data() {
    return {
      positionTrack: {
        clientX: NaN,
        clientY: NaN
      },
      positionCurrent: this.position
    }
  },
  methods: {
    dragMouseDown(event: MouseEvent) {
      this.positionTrack.clientX = event.clientX;
      this.positionTrack.clientY = event.clientY;
      this._bindDragTracking();
    },
    _bindDragTracking() {
      document.onmousemove = this._onElementDrag;
      document.onmouseup = this._unbindDragTracking;
    },
    _onElementDrag(event: MouseEvent) {
      const Movement = this._calculateMovement(event);
      this._persistNewPositionState(event);
      const newPos = this._calculateNewPosition(Movement);
      this._emitOnPosUpdate(newPos);
    },
    _calculateMovement(event: MouseEvent): Movement {
      const movementX = this.positionTrack.clientX - event.clientX;
      const movementY = this.positionTrack.clientY - event.clientY;
      return {movementX, movementY};
    },
    _persistNewPositionState(event: MouseEvent) {
      this.positionTrack.clientX = event.clientX;
      this.positionTrack.clientY = event.clientY;
    },
    _calculateNewPosition(Movement: Movement): PositionOffset {
      const {movementX, movementY} = Movement;
      const container = this.$refs.container as HTMLElement;
      const top = container.offsetTop - movementY;
      const left = container.offsetLeft - movementX;
      return {top, left};
    },
    _unbindDragTracking() {
      this.positionTrack.clientX = NaN;
      this.positionTrack.clientY = NaN;
      document.onmouseup = null;
      document.onmousemove = null;
    },
    _emitOnPosUpdate(position: PositionOffset) {
      this.$emit("drag-to", position);
    }
  },
})
</script>
