import {defineComponent} from "vue";
import {useStore} from "../../store";

export default defineComponent({
  name: 'Header',
  setup(props) {
    const store = useStore();

    const changeIndex = (num: number) => {
      store.commit('setCurrentIndex', store.state.currentIndex + num);
      // store.dispatch('changeIndex', store.state.currentIndex + num);
    }

    return () => {
      return (
        <div class="wrap">
          <h2>vue3-ts-drag && { store.state.currentIndex }</h2>
          <el-button-group className="actions">
            <el-button onClick={ changeIndex.bind(null, -1) } disabled={ store.state.currentIndex === -1 }>后退</el-button>
            <el-button onClick={ changeIndex.bind(null, 1) } disabled={ store.state.currentIndex === store.state.snapshots.length - 1 }>前进</el-button>
            <el-button type="primary">保存</el-button>
            <el-button type="warning" disabled={true}>删除</el-button>
            <el-button type="danger" disabled={true}>清空</el-button>
          </el-button-group>
        </div>
      );
    }
  }
});
