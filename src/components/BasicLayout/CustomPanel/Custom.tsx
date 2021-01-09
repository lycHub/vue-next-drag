import {defineComponent, h, resolveComponent} from "vue";

export default defineComponent({
  name: 'Custom',
  props: {
    panel: {
      type: String,
      default: ''
    }
  },
  emits: ['changeBaseStyle', 'changeStyle'],
  setup(props, { emit }) {
    return () => {
      return (
        <>
          {
            props.panel ? h(resolveComponent(props.panel)) : <span>请选择组件</span>
          }
        </>
      );
    }
  }
});
