import {defineComponent, PropType, markRaw, ref, onMounted, nextTick} from "vue";
import {Widget, WidgetStyle} from "../../../store/types";
import {Line, singleOffset, WidgetMoveData, WidgetOffset} from "../types";
import {emitter} from "../bus";
import {Handler} from "mitt";
import {getCanvasOffset, initLines} from "./utils";
import {sin, cos} from "../../../utils";

const dis = 3;

export default defineComponent({
  name: 'Lines',
  props: {
    widgets: {
      type: Array as PropType<Widget[]>,
      default: () => []
    },
    canvasRect: {
      type: Object as PropType<DOMRect | null>,
      default: null
    }
  },
  setup(props) {
    let canvasOffset: WidgetOffset;
    onMounted(() => {
      nextTick(() => {
        // console.log('canvasRect', props.canvasRect);
        if (props.canvasRect) {
          canvasOffset = getCanvasOffset(props.canvasRect);
        }
      })
    });

    let offsetInfo = markRaw<WidgetOffset>({ vertical: [], horizontal: [] });
    const movingWidgetSize = { width: 0, height: 0 };
    const lines = ref<Line[]>(initLines);
    /*watch(() => props.widgets, newVal => {
      if (newVal.length) {
        // saveWidgetsOffset();
      }
    }, { deep: true });*/


    const handlePress = (id: string) => {
      const otherWidgets = props.widgets.filter(item => item.id !== id);
      if (otherWidgets.length) {
        saveWidgetsOffset(otherWidgets);
      }
    }

    const saveWidgetsOffset = (widgets: Widget[]) => {
      offsetInfo = { vertical: [], horizontal: [] };
      widgets.forEach(widget => {
        const info = calculateWidgetOffset(widget.widgetStyle);
        offsetInfo.vertical.push(...info.vertical);
        offsetInfo.horizontal.push(...info.horizontal);
      });
    }

    const handleMove = (data: WidgetMoveData) => {
      const info = calculateWidgetOffset(data.style, true);
      // console.log('handleMove info', movingWidgetSize);
      info.vertical.forEach(v => {
        const lineIndex = lines.value.findIndex(item => item.type === v.type);
        const nearLine = offsetInfo.vertical.concat(canvasOffset.vertical).find(item => Math.abs(item.offset - v.offset) <= dis);
        if (nearLine) {
          lines.value[lineIndex].left = nearLine.offset;
          lines.value[lineIndex].show = true;
          const delta = data.style.rotate ? (data.style.width - movingWidgetSize.width) / 2 : 0;
          let result = nearLine.offset - delta; // 不论delta正负都是对的
          if (v.type === 'vm') {
            result = nearLine.offset - movingWidgetSize.width / 2 - delta;
          } else if (v.type === 'vr') {
            result= nearLine.offset - movingWidgetSize.width - delta;
          }
          data.dom.style.left = result + 'px';
        } else {
          lines.value[lineIndex].show = false;
        }
      });
      info.horizontal.forEach(h => {
        const lineIndex = lines.value.findIndex(item => item.type === h.type);
        const nearLine = offsetInfo.horizontal.concat(canvasOffset.horizontal).find(item => Math.abs(item.offset - h.offset) <= dis);
        if (nearLine) {
          lines.value[lineIndex].top = nearLine.offset;
          lines.value[lineIndex].show = true;
          const delta = data.style.rotate ? (movingWidgetSize.height - data.style.height) / 2 : 0;
          let result = nearLine.offset + delta;
          if (h.type === 'hm') {
            result = nearLine.offset - movingWidgetSize.height / 2 + delta;
          } else if (h.type === 'hb') {
            result= nearLine.offset - movingWidgetSize.height + delta;
          }
          data.dom.style.top = result + 'px';
        } else {
          lines.value[lineIndex].show = false;
        }
      });
    }

    emitter.on<string>('press', handlePress as Handler<string>);
    emitter.on<WidgetMoveData>('move', handleMove as Handler<WidgetMoveData>);
    emitter.on<void>('up', () => {
      // emitter.off<string>('press', handlePress as Handler<string>);
      // emitter.off<WidgetStyle>('move', handleMove as Handler<WidgetStyle>);
      lines.value.forEach(item => item.show = false);
    });

    const calculateWidgetOffset = (style: WidgetStyle, isMovingWidget = false): WidgetOffset => {
      let vertical: singleOffset[] = [];
      let horizontal: singleOffset[] = [];
      if (isMovingWidget) {
        movingWidgetSize.width = style.width;
        movingWidgetSize.height = style.height;
      }
      if (style.rotate) {
        const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate);
        const diffX = (style.width - newWidth) / 2; 		// 旋转后范围变小是正值，变大是负值
        const vl = style.left + diffX;
        // console.log('diffX', diffX);
        vertical.push({
          type: 'vl',
          offset: vl
        }, {
          type: 'vm',
          offset: vl + Math.abs(newWidth) / 2
        }, {
          type: 'vr',
          offset: vl + newWidth
        });

        const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate);
        const diffY = (newHeight - style.height) / 2; 		// 始终是正
        const ht = style.top - diffY;
        horizontal.push({
          type: 'ht',
          offset: ht
        }, {
          type: 'hm',
          offset: ht + newHeight / 2
        }, {
          type: 'hb',
          offset: ht + newHeight
        });
        movingWidgetSize.width = newWidth;
        // movingWidgetSize.height = sin(style.rotate) * style.width;
        movingWidgetSize.height = newHeight;
      } else {
        const vl = style.left;
        const ht = style.top;
        vertical.push({
          type: 'vl',
          offset: vl
        }, {
          type: 'vm',
          offset: vl + style.width / 2
        }, {
          type: 'vr',
          offset: vl + style.width
        });
        horizontal.push({
          type: 'ht',
          offset: ht
        }, {
          type: 'hm',
          offset: ht + style.height / 2
        }, {
          type: 'hb',
          offset: ht + style.height
        });
      }
      return { vertical, horizontal };
    }

    return () => {
      return (
        <>
          {
            lines.value.map(item => {
              return <div
                class={['line', { show: item.show, vertical: item.type.startsWith('v') }]}
                style={{ top: item.top + 'px', left: item.left + 'px' }}>
              </div>;
            })
          }
        </>
      );
    }
  }
});
