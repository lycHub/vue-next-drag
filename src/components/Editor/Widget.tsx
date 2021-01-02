import {defineComponent, onMounted, ref, PropType, computed} from "vue";
import {Widget} from "../../store/types";
import {useStore} from "../../store";
import Dot from './Dot';
import {Direct, DotInfo, DragStartInfo, WidgetMoveData} from "./types";
import {emitter} from "./bus";

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

    const calculate = (diffX: number, diffY: number): { left: number; top: number } => {
      let newLeft = startInfo!.left + diffX;
      let newTop = startInfo!.top + diffY;
      return {
        left: newLeft,
        top: newTop
      };
    }

    const generateDots = () => {
      const width = root.value!.clientWidth;
      const height = root.value!.clientHeight;
      dots.value = [];
      Object.entries(Direct).forEach(([type, value]) => {
        dots.value.push(calculateDotInfo(type, value, width, height));
      });
    }

    const calculateDotInfo = (type: string, value: string, width: number, height: number): DotInfo => {
      let left = 0;
      let top = 0;
      switch (value) {
        case '右上':
          left = width;
          top = 0;
          break;
        case '左下':
          left = 0;
          top = height;
          break;
        case '右下':
          left = width;
          top = height;
          break;
        case '左':
          left = 0;
          top = height / 2;
          break;
        case '右':
          left = width;
          top = height / 2;
          break;
        case '上':
          left = width / 2;
          top = 0;
          break;
        case '下':
          left = width / 2;
          top = height;
          break;
      }
      return { type, left, top };
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

    const renderDots = () => {
      return dots.value.map(item => {
        return <Dot info={ item } />;
      });
    }

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    }

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
