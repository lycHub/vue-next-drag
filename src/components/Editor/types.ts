export interface DragStartInfo {
  x: number;
  y: number;
  left: number;
  top: number;
}


export enum Direct {
  nw = '左上',
  ne = '右上',
  sw = '左下',
  se = '右下',
  w = '左',
  e = '右',
  n = '上',
  s = '下'
}

export interface DotInfo {
  type: string;
  left: number;
  top: number;
}
