import {WidgetStyle} from "../../store/types";

export interface MoveStartInfo {
  x: number;
  y: number;
}

export interface DragStartInfo extends MoveStartInfo {
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
  trueType: string;
  left: number;
  top: number;
}

export interface DotMouseDownInfo {
  handlePoint: MoveStartInfo;
  center: MoveStartInfo;
  sPoint: MoveStartInfo;
}


/*
  if (rotate) {
	const newWIdth = width * Math.cos(r) + height * Math.sin(r);
	const diffX = (width - newWIdth) / 2 		// 旋转后范围变小是正值，变大是负值
	vl: position.left + diffX
	vm: vl + Math.abs(newWIdth) / 2
	vr: vl + newWIdth




	newHeight = height * Math.cos(r) + width * Math.sin(r)
	const diffY = (newHeight - height) / 2 		// 始终是正

	ht: position.top - diffY
	hm: ht + newHeight / 2
	hb: ht + newHeight
} else {
	vl: position.left
	vm: position.left + style.width / 2
	vr: position.left + style.width

	ht: position.top
	hm: position.top + style.height / 2
	hb: position.top + style.height
}
* */

export type LineType = 'vl' | 'vm' | 'vr' | 'ht' | 'hm' | 'hb';

export interface singleOffset {
  type: LineType;
  offset: number;
}

export interface WidgetOffset {
  vertical: singleOffset[];
  horizontal: singleOffset[];
}


export interface Line {
  type: LineType;
  show: boolean;
  left?: number;
  top?: number;
}

export interface WidgetMoveData {
  dom: HTMLElement;
  style: WidgetStyle
}
