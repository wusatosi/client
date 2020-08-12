<template>
<!--
  Thoughts:

  Okay, so currently I'm syncing the position of <panel>s with the
  canvas through the $emit-@ message thing,
  Is there a better way to do this?
  I think I should use dual-way variable binding,
  so I can use the native reactive pattern without worry about it,
  but, nah! the canvas update thing isn't native to the change
  I don't know

  edit:
  I somehow HAVE TO put this comment inside the <template> section,
  or else vue.js REFUSE TO WORK
  WHY can't I have comment on the start of the file wtf vue.js?
-->
  <div id="panels">
    <div id="panel-container">
      <panel
          v-for="panel in this.panels" :key="panel.index" v-bind:source="panel"
          @request-new-position="_panelPosUpdateRequest"
      />
    </div>
    <pb v-bind:panels="this.panels" ref="pb"/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import panel from "../components/Panel.vue";
import pb from "../components/PanelBackground.vue";
import {PanelPositionUpdateEvent} from "@/components/Panel.vue";
import {SizedPanel} from "@/components/PanelBackground.vue";

const panels: Array<SizedPanel> = [
    {
      id: 1,
      header: "panel 1",
      position: {
        top: 200,
        left: 200
      },
      size: {
        width: 200,
        height: 230
      },
      anchor: {
        topOffset: 180
      },
      linkingTo: [2,3]
    },
    {
      id: 2,
      header: "panel 3",
      position: {
        top: 500,
        left: 700
      },
      size: {
        height: 200,
        width: 200
      },
      anchor: {
        topOffset: 180
      },
      linkingTo: [3]
    },
    {
      id: 3,
      header: "panel 2",
      position: {
        top: 200,
        left: 800
      },
      size: {
        height: 200,
        width: 200
      },
      anchor: {
        topOffset: 180
      },
      linkingTo: []
    }
  ]

const initializeData = {
  panels
}

export default Vue.extend({
  components: {
      panel,
      pb
  },
  data() {
    return initializeData;
  },
  methods: {
    _panelPosUpdateRequest(event: PanelPositionUpdateEvent) {
      const posRef = event.self.position;
      posRef.top = event.newPos.top;
      posRef.left = event.newPos.left;
      // TODO: make type checking happy
      this.$refs.pb.reRenderAll();
    }
  }
})
</script>
<style scoped>
#panels {
  height: 100%;
  width: 100%;
}

div {
  display: inline;
}
</style>
