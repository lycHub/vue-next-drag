import {defineComponent} from "vue";
import Aside from "./Aside";
import './index.scss';

export default defineComponent({
  name: 'BasicLayout',
  setup(props, { slots }) {
    // const test = resolveComponent('el-button');
    return () => {
      return (
        <el-container class="basic-layout">
          <el-header class="header">
            Header
           {/* {
              h(test, {}, 'dsa')
            }*/}
          </el-header>
          <el-container>
            <el-aside class="aside" width="200px">
              <Aside />
            </el-aside>
            <el-main class="main">{ slots.default!() }</el-main>
          </el-container>
        </el-container>
      );
    }
  }
})
