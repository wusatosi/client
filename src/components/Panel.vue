<template>
  <div ref="container">
    <Dragable @new-poistion="posUpdate" :top="this['inital offset'].top" :left="this['inital offset'].left">
        <p>{{ header }}</p>
        <p>Stuff</p>
        <img src="https://cataas.com/cat">
    </Dragable>
  </div>
</template>
<script>
import Dragable from "./Dragable.vue";

export default {
  name: "Panel",
  props: ["header", "inital offset"],
  components: {
    Dragable
  },
  methods: {
    posUpdate() {
      this.$emit("new-poistion", this.$refs.container.getBoundingClientRect())
    }
  }
}
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