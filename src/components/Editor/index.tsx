import {defineComponent, h, computed, markRaw} from "vue";
import Widget from "./Widget";
import './index.scss';
import {useStore} from '../../store';
import {WidgetList} from "../../store/widgets";
import { uniqueId, cloneDeep } from 'lodash';
let zIndex = 1;
export default defineComponent({
  name: 'Editor',
  setup(props) {
    const store = useStore();
    // const widgets = computed(() => store.state.editor.widgets);
    const widgets = store.state.editor.widgets;
    const renderWidgets = () => {
      return widgets.length ? widgets.map((item, index) => {
        return <Widget position={ item.position } index={ index }>
          { h(item.component, { ...item.attrs, style: item.style }, { default: () => item.label }) }
        </Widget>;
      }) : null;
    }

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      event.dataTransfer!.dropEffect = 'copy';
    }

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const target = event.target as Element;
      if (target?.classList.contains('canvas')) {
        const index = event.dataTransfer?.getData('index'); // string | undefined
        if (index) {
          const widget = cloneDeep(WidgetList[+index]);
          widget.position = {
            left: event.offsetX,
            top: event.offsetY
          }
          // console.log('position', event.target);
          widget.id = uniqueId('widget-');
          store.commit('editor/addWidget', widget);
          // console.log('target', widget);
        }
      }
    }


    return () => {
      return (
        <div class="editor-container">
          <div class="editor-box">
            <div class="canvas" onDragover={ handleDragOver } onDrop={ handleDrop }>{ renderWidgets() }</div>
            <div class="drag-height">
              <span>拖动调节高度--{ store.state.editor.test }</span>
            </div>
          </div>
        </div>
      );
    }
  }
});
