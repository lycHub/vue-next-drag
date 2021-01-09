import {defineComponent, ref} from "vue";
import Base from "./Base";
import { stopClick } from "../../../uses/stopClick";
import Custom from "./Custom";
import Animate from "./Animate/index.vue";

export default defineComponent({
  name: 'CustomPanel',
  setup(props) {
    return () => {
      return (
        <div class="panel-wrap" onClick={ stopClick }>
          <el-tabs modelValue="base">
            <el-tab-pane label="基本" name="base">
              <Base />
            </el-tab-pane>
            <el-tab-pane label="定制" name="custom">
              <Custom />
            </el-tab-pane>
            <el-tab-pane label="动画" name="animate">
              <Animate />
            </el-tab-pane>
          </el-tabs>
        </div>
      );
    }
  }
});
