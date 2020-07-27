<template>
<!-- 
  Thoughts:

  Okay, so currently I'm syncing the poistion of <panel>s with the 
  canvas through the $emit-@ message thing,
  Is there a better way to do this? 
  I think I should use dual-way variable binding,
  so I can use the native reactive pattern without worry about it,
  but, nah! the canvas update thing isn't native to the change
  I don't know

  edit: 
  I somehow HAVE TO put this comment inside the <template> section,
  or else VUEJS REFUSE TO WORK
  WHY can't I have comment on the start of the file wtf vuejs? 
-->
  <div id="panels">
    <div id="panel-container">
      <panel v-for="panel in panels" :key="panel.index" v-bind:source="panel" />
    </div>
    <pb v-bind="panels"/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { Panel } from "../utils/Panels";

import panel from "../components/Panel.vue";
import pb from "../components/PanelBackground.vue";

const panels: Array<Panel> = [
    {
      id: 1,
      header: "panel 1",
      poistion: {
        top: 200,
        left: 200
      },
      size: {
        height: NaN,
        width: NaN
      },
      anchor: []
    },
    {
      id: 2,
      header: "panel 2",
      poistion: {
        top: 200,
        left: 400
      },
      size: {
        height: NaN,
        width: NaN
      },
      anchor: []
    }
  ]

const initalizeData = {
  panels
}

export default Vue.extend({
  components: {
      panel,
      pb
  },
  data() {
    return initalizeData;
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
