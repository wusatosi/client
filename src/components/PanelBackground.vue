<template>
  <div id="parent">
    <canvas ref="canvas"/>
  </div>
</template>
<script lang="ts">
import paper from "paper";
import Vue, {PropType} from "vue";

import {Panel, Id, Size} from "@/utils/PanelTypes";
import {TwoDimensionMap} from "@/utils/TwoDimensionMap";

export interface SizedPanel extends Panel {
  size: Size;
}

class PanelLinkRelation {
  from: SizedPanel;
  to: SizedPanel;
  linkingLine: paper.Path = new paper.Path({});

  constructor(from: SizedPanel, to: SizedPanel) {
    this.from = from;
    this.to = to;
  }

  render() {
    console.log("render called")
    this.linkingLine.removeSegments();
    const fromAnchorPoint = PanelLinkRelation.getAnchorPointAtBoxCenter(this.from);
    const toAnchorPoint = PanelLinkRelation.getAnchorPointAtBoxCenter(this.to);
    this.linkingLine.add(fromAnchorPoint, toAnchorPoint);
    this.linkingLine.strokeColor = new paper.Color("#6495ED");
    this.linkingLine.strokeWidth = 10;
    // this.renderDebugOutlines()
  }

  private static getAnchorPointAtBoxCenter(dimension: SizedPanel) {
    const x = dimension.position.left + (dimension.size.width / 2);
    const y = dimension.position.top + dimension.anchor.topOffset;
    return new paper.Point(x, y);
  }

  /*
   * Debug outlines will not reset on re-render currently
   */
  private renderDebugOutlines() {
    function renderBox(dimension: SizedPanel) {
      const position = dimension.position;
      const topLeftPoint = new paper.Point(position.left, position.top);
      const paperSize = new paper.Size(dimension.size);
      const rectangle = new paper.Path.Rectangle(topLeftPoint, paperSize);
      rectangle.selected = true;
      console.log(`drawn box outline at ${topLeftPoint}, size: ${paperSize}`)
      return rectangle;
    }

    function renderAnchorLine(dimension: SizedPanel) {
      const yOffset = dimension.position.top + dimension.anchor.topOffset;
      const xStart = dimension.position.left - 50;
      const xStop = xStart + dimension.size.width + 100;

      const startPoint = new paper.Point(xStart, yOffset);
      const stopPoint = new paper.Point(xStop, yOffset);
      const line = new paper.Path.Line(startPoint, stopPoint);
      line.strokeColor = new paper.Color("red");

      console.log(`drawn anchor line from ${startPoint} to ${stopPoint}}`)
      return line;
    }

    function renderWithDimension(dimension: SizedPanel) {
      renderBox(dimension);
      renderAnchorLine(dimension);
    }

    renderWithDimension(this.from);
    renderWithDimension(this.to);
  }

}

export default Vue.extend({
  name: "Panel-Background",
  props: {
    panels: {
      type: Array as PropType<Array<SizedPanel>>
    },
  },
  data() {
    return {
      panelById: new Map<Id, SizedPanel>(),
      linkingMap: new TwoDimensionMap<PanelLinkRelation>(),
      relations: new Set<PanelLinkRelation>()
    }
  },
  methods: {
    _setupPaper() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      paper.setup(canvas);
    },
    _rebuildState() {
      this._resetAll();
      this._rebuildPanels();
      this._rebuildLinkingMap();
      this._rebuildRelations();
    },
    _resetAll() {
      this.panelById.clear();
      this.linkingMap.clear();
      this.relations.clear();
    },
    _rebuildPanels() {
      this.panels.forEach(panel => {
        this.panelById.set(panel.id, panel);
      });
    },
    _rebuildLinkingMap() {
      this.panels.forEach(linkingFromPanel => {
        linkingFromPanel.linkingTo.forEach(linkingToId => {
          // let if fail if its null
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const linkingToPanel = this.panelById.get(linkingToId)!;
          const relation = new PanelLinkRelation(
              linkingFromPanel,
              linkingToPanel
          );
          this.linkingMap.set(
              linkingFromPanel.id,
              linkingToId,
              relation
          )
        });
      });
    },
    _rebuildRelations() {
      this.linkingMap.forEach(relation => this.relations.add(relation))
    },
    reRenderAll() {
      this.relations.forEach((relation) => {
        relation.render();
      });
    }
  },
  mounted() {
    this._setupPaper();
    this._rebuildState();
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