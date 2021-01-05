import {defineComponent, PropType} from "vue";
import {DotInfo, MoveStartInfo, WidgetMoveData} from "../types";
import {emitter} from "../bus";

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
      // const diffX = event.clientX - startInfo.x;
      // const diffY = event.clientY - startInfo.y;
      // emit('move', { diffX, diffY });
      emit('move', { x: event.clientX - 569, y: event.clientY - 114 });
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
