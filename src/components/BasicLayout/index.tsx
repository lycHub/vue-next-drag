import {defineComponent} from "vue";
import Aside from "./Aside";
import './index.scss';
import CustomPanel from './CustomPanel';

export default defineComponent({
  name: 'BasicLayout',
  setup(props, { slots }) {
    return () => {
      return (
        <el-container class="basic-layout">
          <el-header class="header">
            <div class="left">
              <h2>vue3-ts-drag</h2>
              <el-button size="small">后退</el-button>
              <el-button size="small">前进</el-button>
            </div>
          </el-header>
          <el-container>
            <el-aside class="aside" width="200px">
              <Aside />
            </el-aside>
            <el-main class="main">{ slots.default!() }</el-main>
            <el-aside class="aside" width="300px">
              <CustomPanel />
            </el-aside>
          </el-container>
        </el-container>
      );
    }
  }
})
