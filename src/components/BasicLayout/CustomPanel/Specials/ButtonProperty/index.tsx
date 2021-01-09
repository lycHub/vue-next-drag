import {defineComponent} from "vue";
import './index.scss';

export default defineComponent({
  name: 'ButtonProperty',
  setup(props) {
    return () => {
      return (
        <div class="btn-panel">
         <div class="item"> 文字：<el-input /></div>
         <div class="item"><el-checkbox>禁用</el-checkbox></div>
         <div class="item"><el-checkbox>加载中</el-checkbox></div>
          <div class="item">
            类型：
            <el-radio-group size="small">
              <el-radio-button label="primary" />
              <el-radio-button label="success" />
              <el-radio-button label="warning" />
              <el-radio-button label="danger " />
              <el-radio-button label="info " />
              <el-radio-button label="text " />
            </el-radio-group>
          </div>
        </div>
      );
    }
  }
});
