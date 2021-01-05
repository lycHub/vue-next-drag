import {defineComponent, onMounted, ref, PropType, computed, h} from "vue";
import {Widget} from "../../store/types";
import {useStore} from "../../store";
import Dot from './Dot/index';
import {Direct, DotInfo, DotMouseDownInfo, DragStartInfo, MoveStartInfo, WidgetMoveData} from "./types";
import {emitter} from "./bus";
import {MoveDiff, stretchStrategy} from "./stretch";
import {calculateDotInfo} from "./Dot/dot";
import {getPoint} from "../../utils";

export default defineComponent({
  name: 'Widget',
  props: {
    info: {
      type: Object as PropType<Widget>,
      required: true
    }
  },
  setup(props, { slots }) {
    const root = ref<HTMLElement | null>(null);
    let startInfo: DragStartInfo | null = null;
    const dots = ref<DotInfo[]>([]);
    const store = useStore();
    // const activeWidgetIds = store.state.editor.activeWidgetIds;
    const isActive = computed(() => store.state.editor.activeWidgetIds.findIndex(item => item === props.info.id) > -1);
    const setActive = () => {
      store.commit('editor/setActivateWidgetIds', [props.info.id]);
      generateDots();
    }

    const toggleMoving = (movable: boolean) => {
      if (movable) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      } else {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    }

    const handleMousedown = (event: MouseEvent) => {
      event.preventDefault();
      startInfo = {
        x: event.clientX,
        y: event.clientY,
        left: root.value!.offsetLeft, // left和top第一次等于props.info.position
        top: root.value!.offsetTop
      };
      root.value!.style.zIndex = '2';
      emitter.emit<string>('press', props.info.id);
      setActive();
      toggleMoving(true);
    }

    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      const diffX = event.clientX - startInfo!.x;
      const diffY = event.clientY - startInfo!.y;
      const { left, top } = calculate(diffX, diffY);
      root.value!.style.top = top + 'px';
      root.value!.style.left = left + 'px';
      emitter.emit<WidgetMoveData>('move', {
        dom: root.value!,
        style: { ...props.info.widgetStyle, left, top }
      });
    }
    const handleMouseUp = () => {
      toggleMoving(false);
      root.value!.style.zIndex = '1';
      const { widgetStyle, ...rest } = props.info;
      store.commit('editor/updateWidget', {
        id: props.info.id,
        widget: {
          ...rest,
          widgetStyle: {
            ...widgetStyle,
            left: root.value!.offsetLeft,
            top: root.value!.offsetTop
          }
        }
      });
      // root.value!.style.transform = 'rotate(60deg)';
      emitter.emit<void>('up');
    }

    const calculate = (diffX: number, diffY: number): { left: number; top: number } => {
      let newLeft = startInfo!.left + diffX;
      let newTop = startInfo!.top + diffY;
      return {
        left: newLeft,
        top: newTop
      };
    }

    let dotMousedownInfo: DotMouseDownInfo;

    const handleDotDown = (type: string) => {
      // step1: handlePoint旋转后的坐标
      const { widgetStyle } = props.info;
      const center = {
        x: widgetStyle.left + (widgetStyle.width / 2),
        y: widgetStyle.top + (widgetStyle.height / 2)
      }
      const handlePoint = getPoint(widgetStyle, center, type);

      // ??
      const sPoint = {
        x: center.x + Math.abs(handlePoint.x - center.x) * (handlePoint.x < center.x ? 1 : -1),
        y: center.y + Math.abs(handlePoint.y - center.y) * (handlePoint.y < center.y ? 1 : -1)
      }
      dotMousedownInfo = { handlePoint, center, sPoint }
    }

    const handleDotMove = (type: string, position: MoveStartInfo) => {
      stretchStrategy[type](dotMousedownInfo, props.info.widgetStyle, position, root.value!, () => generateDots());
    }

    const handleDotUp = () => {
      const { widgetStyle, ...rest } = props.info;
      store.commit('editor/updateWidget', {
        id: props.info.id,
        widget: {
          ...rest,
          widgetStyle: {
            ...widgetStyle,
            width: root.value!.clientWidth,
            height: root.value!.clientHeight,
            top: root.value!.offsetTop,
            left: root.value!.offsetLeft
          }
        }
      });
    }


    const generateDots = () => {
      const width = root.value!.clientWidth;
      const height = root.value!.clientHeight;
      dots.value = [];
      Object.entries(Direct).forEach(([type, value]) => {
        dots.value.push(calculateDotInfo(type, value, width, height, props.info.widgetStyle.rotate));
      });
    }

    const renderDots = () => {
      return dots.value.map(item => {
        // let trueType = item.trueType;
        return h(Dot, {
          info: item,
          onDown: handleDotDown.bind(null, item.type),
          onMove: handleDotMove.bind(null, item.type),
          onUp: handleDotUp
        });
      });
    }

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    }


    onMounted(() => {
      root.value!.style.left = props.info.widgetStyle.left + 'px';
      root.value!.style.top = props.info.widgetStyle.top + 'px';
      root.value!.style.width = props.info.widgetStyle.width + 'px';
      root.value!.style.height = props.info.widgetStyle.height + 'px';
      root.value!.style.transform = `rotate(${props.info.widgetStyle.rotate}deg)`;
      root.value!.style.zIndex = '1';
      // root.value!.setAttribute('in-canvas', 'true');
    });

    return () => {
      return (
        <div class={ ['widget', { active: isActive.value }] } ref={ root } onClick={ handleClick } onMousedown={ handleMousedown }>
          { isActive.value ? renderDots() : null }
          { slots.default!() }
        </div>
      );
    }
  }
})
