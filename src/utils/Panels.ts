export type px = number

export interface Panel extends DisplayData, DimensionData {
  id: number;
}

export interface DisplayData {
  header: String; 
}

export interface DimensionData {
  size: Size;
  position: PoistionOffset;
  anchor: Array<PanelLinkAnchor>;
}

export interface Size {
  height: px;
  width: px;
}

export interface PoistionOffset {
  top: px;
  left: px;
}

export interface PanelLinkAnchor {
  topOffset: px;
}
