<template>
  <div id="panels">
    <div id="panel-container">
      <panel v-for="panel in panels" :key="panel.header" v-bind="panel" />
    </div>
    <pb/>
  </div>
</template>
<script>
import panel from '../components/Panel.vue'
import pb from '../components/PanelBackground.vue'

const initalizeData = {
  panels: [
    {
      header: "panel 1",
      "inital offset": {
        top: 200,
        left: 200
      }
    },
    {
      header: "panel 2",
      "inital offset": {
        top: 200,
        left: 400
      }
    }
  ]
}

export default {
  components: {
      panel,
      pb
  },
  data() {
    return initalizeData;
  }
}
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
