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
      <panel v-for="panel in panels" :key="panel.index" v-bind="panel" />
    </div>
    <pb v-bind="panels"/>
  </div>
</template>
<script>
import panel from '../components/Panel.vue'
import pb from '../components/PanelBackground.vue'

const initalizeData = {
  panels: [
    {
      index: 1,
      header: "panel 1",
      offset: {
        top: 200,
        left: 200
      }
    },
    {
      index: 2,
      header: "panel 2",
      offset: {
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
