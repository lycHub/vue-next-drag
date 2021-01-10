import {defineComponent, PropType} from "vue";
import {useStore} from "../../store";
import {MoveStartInfo} from "./types";
import {WidgetStyle} from "../../store/types";

export default defineComponent({
  name: 'RotateDot',
  props: {
    widgetStyle: {
      type: Object as PropType<WidgetStyle>,
      required: true
    }
  },
  emits: ['down', 'move', 'up'],
  setup(props, { emit }) {
    const store = useStore();
    let originCenter: MoveStartInfo;
    const { left, top, width, height } = store.state.editor.canvasRect!;
    const handleMousedown = (event: MouseEvent) => {
      event.stopPropagation();
      originCenter = {
        x: props.widgetStyle.left + (props.widgetStyle.width / 2),
        y: props.widgetStyle.top + (props.widgetStyle.height / 2)
      }
      // emit('down' );
      toggleMoving(true);
    }

    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      const currentX = event.clientX - left;
      const currentY = event.clientY - top;
      const a = Math.abs(currentX - originCenter.x);
      const b = Math.abs(currentY - originCenter.y);
      // const c = Math.sqrt(a * a + b * b);
      let rotate = Math.atan2(b, a) * 180 / Math.PI;
      // console.log('rotate :>> ', rotate);

      // 第一象限
      if (currentX >= originCenter.x && currentY <= originCenter.y) {
        rotate = 90 - rotate;
      }
      // 第二象限
      else if (currentX <= originCenter.x && currentY <= originCenter.y) {
        rotate = 270 + rotate;
      }
      // 第三象限
      else if (currentX <= originCenter.x && currentY >= originCenter.y) {
        rotate = 270 - rotate;
      }
      // 第四象限
      else if(currentX >= originCenter.x && currentY >= originCenter.y) {
        rotate = 90 + rotate;
      }

      // const result = rotate === 360 ? rotate : rotate;
      emit('move', rotate);
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
      return (<i class="el-icon-refresh-right rotate" onMousedown={ handleMousedown }></i>);
    }
  }
});
