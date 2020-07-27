<template>
  <div ref="container">
    <Dragable 
      @new-poistion="_onDragPosUpdate" 
      :top="source.poistion.top" 
      :left="source.poistion.left"
    >
        <p>{{ source.header }}</p>
        <p>Stuff</p>
        <img src="https://cataas.com/cat">
    </Dragable>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";

import Dragable from "./Dragable.vue";
import { Panel } from "../utils/Panels";

export interface PanelPositionUpdateEvent {
  self: Panel;
  newPos: ClientRect;
}

export default Vue.extend({
  name: "Panel",
  props: {
    source: {
      type: Object as PropType<Panel>
    }
  },
  components: {
    Dragable
  },
  methods: {
    _onDragPosUpdate() {
      const container = this.$refs.container as HTMLElement;
      const event: PanelPositionUpdateEvent = {
        self: this.source,
        newPos: container.getBoundingClientRect()
      }
      this.$emit("new-poistion", event);
    }
  }
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