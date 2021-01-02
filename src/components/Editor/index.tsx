import {defineComponent, h, computed, markRaw} from "vue";
import Widget from "./Widget";
import Lines from "./Lines/Lines";
import './index.scss';
import {useStore} from '../../store';
import {WidgetList} from "../../store/widgets";
import { uniqueId, cloneDeep } from 'lodash';

export default defineComponent({
  name: 'Editor',
  setup(props) {
    const store = useStore();
    // const widgets = computed(() => store.state.editor.widgets);
    const widgets = store.state.editor.widgets;
    const renderWidgets = () => {
      return widgets.length ? widgets.map(item => {
        const { width, height, ...rest } = item.style;
        return <Widget info={ item } >
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
          widget.widgetStyle.left = event.offsetX;
          widget.widgetStyle.top = event.offsetY;
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
            <div class="canvas" onDragover={ handleDragOver } onDrop={ handleDrop }>
              { renderWidgets() }
              <Lines widgets={ widgets } />
            </div>
            <div class="drag-height">
              <span>拖动调节高度</span>
            </div>
          </div>
        </div>
      );
    }
  }
});
