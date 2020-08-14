export type Px = number;
export type Id = number;

export interface Panel extends DisplayData {
  id: Id;
  linkingTo: Array<Id>;
  position: PositionOffset;
  anchor: PanelLinkAnchor;
}

export interface DisplayData {
  header: String; 
}

export interface Size {
  height: Px;
  width: Px;
}

export interface PositionOffset {
  top: Px;
  left: Px;
}

export interface PanelLinkAnchor {
  topOffset: Px;
}

export interface SizedPanel extends Panel {
  size: Size;
}

export interface LinkingLineDrawer {
  initialize(from: SizedPanel, to: SizedPanel): void;
  draw(): void;
}
