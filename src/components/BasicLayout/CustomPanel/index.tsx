import {defineComponent, ref, computed, h, resolveComponent} from "vue";
import Base from "./Base";
import {useStore} from "../../../store";
import { stopClick } from "../../../uses/stopClick";
import {BaseStyle, WidgetStyle} from "../../../store/types";
import Custom from "./Custom";

export default defineComponent({
  name: 'CustomPanel',
  setup(props) {
    const active = ref('base');
    const store = useStore();
    const activeWidget = computed(() => store.state.editor.widgets.find(item => item.id === store.state.editor.activeWidgetId));
    const baseChange = (style: BaseStyle) => {
      // console.log('baseChange', style);
      store.commit('editor/setWidgetBaseStyle', {
        id: activeWidget.value!.id,
        value: style
      });
    }

    const styleChange = (style: Partial<WidgetStyle>) => {
      // console.log('baseChange', style);
      store.commit('editor/setWidgetStyle', {
        id: activeWidget.value!.id,
        value: style
      });
    }


    return () => {
      return (
        <div class="panel-wrap" onClick={ stopClick }>
          <el-tabs v-model={ active.value }>
            <el-tab-pane label="基本" name="base">
              {/*// @ts-ignore*/}
              <Base activeWidget={ activeWidget.value } onChangeBaseStyle={ baseChange } onChangeStyle={ styleChange } />
            </el-tab-pane>
            <el-tab-pane label="定制" name="custom">
              <Custom panel={ activeWidget.value?.specialPanel } />
            </el-tab-pane>
          </el-tabs>
        </div>
      );
    }
  }
});
