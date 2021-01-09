import {defineComponent, h, resolveComponent} from "vue";
import {properBase} from "../../../uses/propertyBase";

export default defineComponent({
  name: 'Custom',
  setup(props) {
    const activeWidget = properBase().widget;
    return () => {
      return (
        <>
          {
            activeWidget.value?.specialPanel ? h(resolveComponent(activeWidget.value?.specialPanel)) : <span>请选择组件</span>
          }
        </>
      );
    }
  }
});
