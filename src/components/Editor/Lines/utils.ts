import {Line, LineType, WidgetOffset} from "../types";

export const initLines: Line[] = [];
['vl', 'vm', 'vr', 'ht', 'hm', 'hb'].forEach(type => {
  initLines.push({ type: type as LineType, show: false });
});

export function getCanvasOffset(rect: DOMRect): WidgetOffset {
  const { width, height } = rect;
  return {
    vertical: [{
      type: 'vl',
      offset: 0
    }, {
      type: 'vm',
      offset: width / 2
    }, {
      type: 'vr',
      offset: width
    }],
    horizontal: [
      {
        type: 'ht',
        offset: 0
      },
      {
        type: 'hm',
        offset: height / 2
      },
      {
        type: 'hb',
        offset: height
      }
    ]
  }
}
