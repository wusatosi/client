<template>
  <div ref="container">
    <Dragable
        @drag-to="_onDragTo"
        :position="this.position"
    >
      <p>{{ this.header }}</p>
      <p>Stuff</p>
      <img src="https://cataas.com/cat" alt="dummy image">
    </Dragable>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue";

import Dragable from "./Dragable.vue";
import {Panel, PositionOffset} from "@/utils/PanelTypes";

export interface PanelPositionUpdateEvent {
  self: Panel;
  newPos: PositionOffset;
}

export default Vue.extend({
  name: "Panel",
  props: {
    source: {
      type: Object as PropType<Panel>
    }
  },
  data() {
    return {
      ...this.source
    };
  },
  components: {
    Dragable
  },
  methods: {
    _onDragTo(newPos: PositionOffset) {
      const event: PanelPositionUpdateEvent = {
        self: this.source,
        newPos: newPos
      }
      this.$emit("request-new-position", event);
    }
  },
});
</script>
<style scoped>

div {
  position: absolute;
  background-color: #f1f1f1;
  text-align: center;
  width: 200px;
  cursor: move;
}

img {
  object-fit: cover;
  width: 200px;
}

</style>