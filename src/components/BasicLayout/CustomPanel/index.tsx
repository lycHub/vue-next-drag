import {defineComponent, ref} from "vue";
import Base from "./Base";
import { stopClick } from "../../../uses/stopClick";
import Custom from "./Custom";

export default defineComponent({
  name: 'CustomPanel',
  setup(props) {
    const active = ref('base');
    return () => {
      return (
        <div class="panel-wrap" onClick={ stopClick }>
          <el-tabs v-model={ active.value }>
            <el-tab-pane label="基本" name="base">
              <Base />
            </el-tab-pane>
            <el-tab-pane label="定制" name="custom">
              <Custom />
            </el-tab-pane>
          </el-tabs>
        </div>
      );
    }
  }
});
