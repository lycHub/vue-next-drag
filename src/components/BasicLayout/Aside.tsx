import {defineComponent} from "vue";
import {WidgetList} from "../../store/widgets";
import {Widget} from "../../store/types";

export default defineComponent({
  name: 'Aside',
  setup(props) {
    const handleDragstart = (index: number, event: DragEvent) => {
      event.dataTransfer?.setData('index', index.toString());
    }
    const widgets = WidgetList.map((item, index) => {
      return(
        <el-card
          class="card"
          shadow="hover"
          draggable="true"
          onDragstart={ handleDragstart.bind(null, index) }>
          <i class={item.icon} />
          <p>{ item.name }</p>
        </el-card>
      );
    });
    return () => {
      return (
        <div class="widget-list">{ widgets }</div>
      );
    }
  }
})
