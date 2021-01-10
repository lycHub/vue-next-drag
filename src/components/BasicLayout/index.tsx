import {defineComponent} from "vue";
import Aside from "./Aside";
import './index.scss';
import CustomPanel from './CustomPanel';
import Header from "./Header";

export default defineComponent({
  name: 'BasicLayout',
  setup(props, { slots }) {
    return () => {
      return (
        <el-container class="basic-layout">
          <el-header class="header">
            <Header />
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
