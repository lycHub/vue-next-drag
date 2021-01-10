import {defineComponent} from "vue";
import {properBase} from "../../uses/propertyBase";
import {clearSnapshot, delSnapshot, saveSnapshot} from "../../uses/snapshop";
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Header',
  setup(props) {
    const store = properBase().store;
    const activeWidget = properBase().widget;
    const currentSnapshot = properBase().currentSnapshot;

    const changeIndex = (num: number) => {
      store.commit('setCurrentIndex', store.state.currentIndex + num);
    }

    const handleDel = () => {
      delSnapshot(activeWidget.value!.id!, store);
    }
    const handleClear = () => {
      clearSnapshot(store);
    }

    const handleSave = () => {
      saveSnapshot(store);
      ElMessage.success({
        message: '已保存',
        type: 'success'
      });
    }
    return () => {
      return (
        <div class="wrap">
          <h2>vue3-ts-drag</h2>
          <el-button-group class="actions">
            <el-button onClick={ changeIndex.bind(null, -1) } disabled={ store.state.currentIndex === -1 }>后退</el-button>
            <el-button onClick={ changeIndex.bind(null, 1) } disabled={ store.state.currentIndex === store.state.snapshots.length - 1 }>前进</el-button>
            <el-button type="primary" onClick={ handleSave }>保存</el-button>
            <el-button type="warning" onClick={ handleDel } disabled={ activeWidget.value === undefined }>删除</el-button>
            <el-button type="danger" onClick={ handleClear } disabled={ currentSnapshot.value.length === 0 }>清空</el-button>
          </el-button-group>
        </div>
      );
    }
  }
});
