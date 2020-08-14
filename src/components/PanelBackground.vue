<template>
  <div id="parent">
    <canvas ref="canvas"/>
  </div>
</template>
<script lang="ts">
import paper from "paper";
import Vue, {PropType} from "vue";

import {Id, LinkingLineDrawer, SizedPanel} from "@/utils/PanelTypes";
import {TwoDimensionMap} from "@/utils/TwoDimensionMap";
import {ListMap} from "@/utils/ListMap";

class PanelLinkRelation {
  from: SizedPanel;
  to: SizedPanel;
  drawer: LinkingLineDrawer;

  constructor(from: SizedPanel, to: SizedPanel, drawer: LinkingLineDrawer) {
    this.from = from;
    this.to = to;
    this.drawer = drawer;
  }

  readyToInitialize() {
    this.drawer.initialize(this.from, this.to);
  }

  render() {
    this.drawer.draw();
  }

}

export default Vue.extend({
  name: "Panel-Background",
  props: {
    panels: {
      type: Array as PropType<Array<SizedPanel>>
    },
    drawerFactory: {
      type: Function as PropType<() => LinkingLineDrawer>
    }
  },
  data() {
    return {
      relations: new Set<PanelLinkRelation>(),
      relationById: new ListMap<Id, PanelLinkRelation>()
    }
  },
  methods: {
    _setupPaper() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      paper.setup(canvas);
    },
    _rebuildState() {
      this._resetAll();
      this._rebuildRelations();
    },
    _resetAll() {
      this.relations.clear();
    },
    _rebuildRelations() {
      const panelById = new Map<Id, SizedPanel>();
      this.panels.forEach(panel => {
        panelById.set(panel.id, panel);
      });
      const linkingMap = new TwoDimensionMap<PanelLinkRelation>();
      this.panels.forEach(linkingFromPanel => {
        linkingFromPanel.linkingTo.forEach(linkingToId => {
          // let if fail if its null
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const linkingToPanel = panelById.get(linkingToId)!;
          const relation = new PanelLinkRelation(
              linkingFromPanel,
              linkingToPanel,
              this.drawerFactory()
          );
          linkingMap.set(
              linkingFromPanel.id,
              linkingToId,
              relation
          )
        });
      });
      linkingMap.forEach(relation => this.relations.add(relation))
      this.relations.forEach((relation) => {
        this.relationById.set(relation.from.id, relation);
        this.relationById.set(relation.to.id, relation);
      });
    },
    _initializeDrawers() {
      this.relations.forEach((relation) => relation.readyToInitialize())
    },
    reRenderAll() {
      this.relations.forEach((relation) => {
        relation.render();
      });
    },
    reRenderRelated(panel: SizedPanel) {
      this.relationById.get(panel.id).forEach(relation => relation.render());
    }
  },
  mounted() {
    this._setupPaper();
    this._rebuildState();
    this._initializeDrawers();
    this.reRenderAll();
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