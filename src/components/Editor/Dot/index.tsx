import {defineComponent, PropType} from "vue";
import {DotInfo, MoveStartInfo} from "../types";
import {useStore} from "../../../store";

export default defineComponent({
  name: 'Dot',
  props: {
    info: {
      type: Object as PropType<DotInfo>,
      required: true
    }
  },
  emits: ['down', 'move', 'up'],
  setup(props, { emit }) {
    const store = useStore();
    const startInfo: MoveStartInfo = { x: 0, y: 0 };
    const handleMousedown = (event: MouseEvent) => {
      event.stopPropagation();
      startInfo.x = event.clientX;
      startInfo.y = event.clientY;
      emit('down' );
      toggleMoving(true);
    }

    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      const { left, top } = store.state.editor.canvasRect!;
      emit('move', { x: event.clientX - left, y: event.clientY - top });
    }
    const handleMouseUp = () => {
      toggleMoving(false);
      emit('up');
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

    return () => {
      return (
        <div
          class="dot"
          style={{ left: props.info.left + 'px', top: props.info.top + 'px', cursor: props.info.trueType + '-resize' }}
          onMousedown={ handleMousedown }
        >
        </div>
      );
    }
  }
});
