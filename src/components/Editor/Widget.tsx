import {defineComponent, onMounted, ref, PropType} from "vue";
import {WidgetPosition} from "../../store/types";

interface DragStartInfo {
  x: number;
  y: number;
  left: number;
  top: number;
}

export default defineComponent({
  name: 'Widget',
  props: {
    index: Number,
    position: {
      type: Object as PropType<WidgetPosition>,
      default: () => ({
        left: 0,
        top: 0
      })
    }
  },
  setup(props, { slots }) {
    const root = ref<HTMLElement | null>(null);
    let startInfo: DragStartInfo | null = null;
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
      // console.log(root.value!.getBoundingClientRect());
      console.log(root.value!.offsetLeft, root.value!.offsetTop);
    }

    const handleMousedown = (event: MouseEvent) => {
      event.preventDefault();
      startInfo = {
        x: event.clientX,
        y: event.clientY,
        left: root.value!.offsetLeft, // left和top第一次等于props.position
        top: root.value!.offsetTop
      };
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
    onMounted(() => {
      root.value!.style.left = props.position.left + 'px';
      root.value!.style.top = props.position.top + 'px';
      root.value!.style.zIndex = `${(props.index || 0) + 1}`;
    });

    return () => {
      return (<div class="widget" ref={ root } onMousedown={ handleMousedown }>{ slots.default!() }</div>);
    }
  }
})
