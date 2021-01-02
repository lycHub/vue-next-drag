import {defineComponent, onMounted, ref, PropType, computed, nextTick} from "vue";
import {Widget} from "../../store/types";
import {useStore} from "../../store";
import Dot from './Dot';
import {Direct, DotInfo, DragStartInfo} from "./types";

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
    }
    const handleMouseUp = () => {
      toggleMoving(false);
      root.value!.style.zIndex = '1';
      store.commit('editor/updateWidget', {
        id: props.info.id,
        widget: {
          ...props.info,
          position: {
            left: root.value!.offsetLeft,
            top: root.value!.offsetTop
          }
        }
      });
      // root.value!.style.transform = 'rotate(30deg)';
      nextTick(() => {
        console.log('up widgets', root.value!.getBoundingClientRect());
      });
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
      root.value!.style.left = props.info.position.left + 'px';
      root.value!.style.top = props.info.position.top + 'px';
      root.value!.style.zIndex = '1';
    });

    const renderDots = () => {
      return dots.value.map(item => {
        return <Dot info={ item } />;
      });
    }

    return () => {
      return (
        <div class={ ['widget', { active: isActive.value }] } ref={ root } onMousedown={ handleMousedown }>
          { isActive.value ? renderDots() : null }
          { slots.default!() }
        </div>
      );
    }
  }
})
