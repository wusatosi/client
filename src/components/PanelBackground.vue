<template>
  <div id="parent">
    <canvas ref="canvas"/>
  </div>
</template>
<script lang="ts">
import paper from "paper";
import Vue, { PropType } from "vue";

import { Panel, DimensionData } from "../utils/Panels";

class PanelLinkRelation {
  from: DimensionData;
  to: DimensionData;

  constructor(from: Panel, to: Panel) {
    this.validatePanelRelation(from, to);
    this.from = from;
    this.to = to;
  }

  private validatePanelRelation(from: Panel, to: Panel) {
    console.assert(
      from.id < to.id,
      `illegal linkage, id relation missmatch, from: ${from}, to: ${to}`
    );
  }

  render() {
    // TODO: Render Code goes here
  }

}

export default Vue.extend({
  name: "Panel-Background",
  props: {
    panels: {
      type: Array as PropType<Array<Panel>>
    }
  },
  data() {
    return {
      relations: new Array<PanelLinkRelation>()
    }
  },
  methods: {
    _setupPaper() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      paper.setup(canvas);
    },
    _rebuildRelations() {
      // TODO: Relation Analyze goes here
    },
    _reRenderAll() {
      this.relations.forEach((relation) => {
        relation.render();
      });
    }
  },
  mounted() {
    this._setupPaper();
    this._rebuildRelations();
    this._reRenderAll();
  }
})
</script>
<style scoped>
#parent {
  height: 100%;
}
canvas {
  height: 100%;
  width: 100%;
}
</style>