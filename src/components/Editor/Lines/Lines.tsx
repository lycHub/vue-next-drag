import {defineComponent, PropType, markRaw, ref} from "vue";
import {Widget, WidgetStyle} from "../../../store/types";
import {Line, LineType, singleOffset, WidgetMoveData, WidgetOffset} from "../types";
import {emitter} from "../bus";
import {Handler} from "mitt";
import {canvasOffset, initLines} from "./utils";



export default defineComponent({
  name: 'Lines',
  props: {
    widgets: {
      type: Array as PropType<Widget[]>,
      default: () => []
    }
  },
  setup(props) {
    let offsetInfo = markRaw<WidgetOffset>({ vertical: [], horizontal: [] });

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
        // console.log('wat press', offsetInfo);
      }
    }

    const handleMove = (data: WidgetMoveData) => {
      const info = calculateWidgetOffset(data.style);
      // console.log('handleMove info', info);
      info.vertical.forEach(v => {
        const lineIndex = lines.value.findIndex(item => item.type === v.type);
        const nearLine = offsetInfo.vertical.concat(canvasOffset.vertical).find(item => Math.abs(item.offset - v.offset) <= 3);
        if (nearLine) {
          lines.value[lineIndex].left = nearLine.offset;
          lines.value[lineIndex].show = true;
          let result = nearLine.offset;
          if (v.type === 'vm') {
            result= nearLine.offset - data.style.width / 2;
          } else if (v.type === 'vr') {
            result= nearLine.offset - data.style.width;
          }
          data.dom.style.left = result + 'px';
        } else {
          lines.value[lineIndex].show = false;
        }
      });
      info.horizontal.forEach(h => {
        const lineIndex = lines.value.findIndex(item => item.type === h.type);
        const nearLine = offsetInfo.horizontal.concat(canvasOffset.horizontal).find(item => Math.abs(item.offset - h.offset) <= 3);
        if (nearLine) {
          lines.value[lineIndex].top = nearLine.offset;
          lines.value[lineIndex].show = true;
          let result = nearLine.offset;
          if (h.type === 'hm') {
            result= nearLine.offset - data.style.height / 2;
          } else if (h.type === 'hb') {
            result= nearLine.offset - data.style.height;
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




    const saveWidgetsOffset = (widgets: Widget[]) => {
      offsetInfo = { vertical: [], horizontal: [] };
      widgets.forEach(widget => {
        const info = calculateWidgetOffset(widget.widgetStyle);
        offsetInfo.vertical.push(...info.vertical);
        offsetInfo.horizontal.push(...info.horizontal);
      });
    }

    const calculateWidgetOffset = (style: WidgetStyle): WidgetOffset => {
      let vertical: singleOffset[] = [];
      let horizontal: singleOffset[] = [];
      if (style.rotate) {

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
