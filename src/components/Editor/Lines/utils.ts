import {Line, LineType, WidgetOffset} from "../types";
import {markRaw} from "vue";

export const initLines: Line[] = [];
['vl', 'vm', 'vr', 'ht', 'hm', 'hb'].forEach(type => {
  initLines.push({ type: type as LineType, show: false });
});

export const canvasOffset = markRaw<WidgetOffset>({
  vertical: [{
    type: 'vl',
    offset: 0
  }, {
    type: 'vl',
    offset: 207
  }, {
    type: 'vl',
    offset: 414
  }],
  horizontal: [
    {
      type: 'ht',
      offset: 0
    },
    {
      type: 'hm',
      offset: 368
    },
    {
      type: 'vl',
      offset: 736
    }
  ]
});

// 角度转弧度
function rotateToRadian(rotate: number): number {
  return (rotate * Math.PI) / 180;
}



export function sin(rotate: number) {
  return Math.abs(Math.sin(rotateToRadian(rotate)));
}

export function cos(rotate: number) {
  return Math.abs(Math.cos(rotateToRadian(rotate)));
}
