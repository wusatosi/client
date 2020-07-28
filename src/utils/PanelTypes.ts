export type Px = number;
export type Id = number;

export interface Panel extends DisplayData, DimensionData {
  id: Id;
  linkingTo: Array<Id>;
}

export interface DisplayData {
  header: String; 
}

export interface DimensionData {
  size: Size;
  position: PositionOffset;
  anchor: PanelLinkAnchor;
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
