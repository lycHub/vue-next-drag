import {defineComponent, PropType} from "vue";
import {DotInfo} from "./types";

export default defineComponent({
  name: 'Dot',
  props: {
    info: {
      type: Object as PropType<DotInfo>,
      required: true
    }
  },
  setup(props) {
    const { left, top, type } = props.info;
    return () => {
      return (
        <div
          class="dot"
          style={{ left: left + 'px', top: top + 'px', cursor: type + '-resize' }}
        >
        </div>
      );
    }
  }
});
