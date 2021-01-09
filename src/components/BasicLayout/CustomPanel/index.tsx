import {defineComponent, ref, computed} from "vue";
import Base from "./Base";
import {useStore} from "../../../store";
import { stopClick } from "../../../uses/stopClick";
import {BaseStyle} from "../../../store/types";

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


    return () => {
      return (
        <div class="panel-wrap" onClick={ stopClick }>
          <el-tabs v-model={ active.value }>
            <el-tab-pane label="基本" name="base">
              {/*// @ts-ignore*/}
              <Base activeWidget={ activeWidget.value } onChange={ baseChange } />
            </el-tab-pane>
            <el-tab-pane label="定制" name="custom">配置管理</el-tab-pane>
          </el-tabs>
        </div>
      );
    }
  }
});
