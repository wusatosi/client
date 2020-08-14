import {LinkingLineDrawer, SizedPanel} from "@/utils/PanelTypes";
import {Color, Point} from "paper";
import paper from "paper";

interface LinkingLineHolder {
  linkingLine: paper.Path;
  from: SizedPanel;
  to: SizedPanel;
}

class NonInitializedTrapLinkingLineHolder implements LinkingLineHolder {
  get linkingLine(): paper.Path {
    throw "Non initialized";
  }

  get from(): SizedPanel {
    throw "Non initialized";
  }

  get to(): SizedPanel {
    throw "Non initialized";
  }

}

export class DefaultLinkingLineDrawer implements LinkingLineDrawer {

  private holder: LinkingLineHolder = new NonInitializedTrapLinkingLineHolder();

  initialize(from: SizedPanel, to: SizedPanel) {
    this.holder = {
      linkingLine: new paper.Path({}),
      from: from,
      to: to,
    };
    this.initializeLineStyle();
  }

  private initializeLineStyle() {
    const linkingLine = this.holder.linkingLine;
    linkingLine.strokeColor = new Color("#6495ED");
    linkingLine.strokeWidth = 10;
  }

  draw(): void {
    const {linkingLine, from, to} = this.holder;
    linkingLine.removeSegments();
    const fromAnchorPoint = DefaultLinkingLineDrawer.getAnchorPointAtBoxCenter(from);
    const toAnchorPoint = DefaultLinkingLineDrawer.getAnchorPointAtBoxCenter(to);
    linkingLine.add(fromAnchorPoint, toAnchorPoint);
  }

  private static getAnchorPointAtBoxCenter(dimension: SizedPanel) {
    const x = dimension.position.left + (dimension.size.width / 2);
    const y = dimension.position.top + dimension.anchor.topOffset;
    return new Point(x, y);
  }

}