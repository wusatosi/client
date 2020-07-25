<template>
<div id="panels">
  <div id="panel-container">
    <panel/>
    <panel/>
  </div>
  <pb/>
</div>
</template>
<script>
import panel from '../components/Panel.vue'
import pb from '../components/PanelBackground.vue'

export default {
    components: {
        panel,
        pb
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
