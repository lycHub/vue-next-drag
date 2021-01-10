import {defineComponent, h, resolveComponent, ref, onMounted, watch, computed} from "vue";
import Lines from "./Lines";
import WidgetBox from './Widget';
import './index.scss';
import {useStore} from '../../store';
import {WidgetList} from "../../store/widgets";
import { uniqueId, cloneDeep } from 'lodash';
import {useRect} from "../../uses/rect";
import {Widget} from "../../store/types";
import {properBase} from "../../uses/propertyBase";

export default defineComponent({
  name: 'Editor',
  setup(props) {
    const store = properBase().store;
    const currentSnapshot = properBase().currentSnapshot;
    const widgets = computed(() => store.state.editor.widgets);

    watch(currentSnapshot, value => {
      store.commit('editor/resetWidgets', value);
    });
    
    const renderWidgets = () => {
      // console.log('renderWidgets', currentSnapshot.value);
      return widgets.value.length ? widgets.value.map(item => {
        return <WidgetBox info={ item } >
          {
            item.name === '按钮' ?
              h(resolveComponent(item.component), { ...item.props, style: item.style }, () => item.label) :
              h(resolveComponent(item.component), { ...item.props, style: item.style }, () => item.label)
          }
        </WidgetBox>;
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
          // console.log('drop', widget);
          widget.widgetStyle.left = event.offsetX;
          widget.widgetStyle.top = event.offsetY;
          // widget.widgetStyle.rotate = 0;
          widget.id = generateUUID();
          store.dispatch('addSnapshot', currentSnapshot.value.concat(widget));
          // store.commit('editor/addWidget', cloneDeep(widget));
        }
      }
      if (store.state.editor.activeWidgetId) {
        store.commit('editor/setActivateWidgetId', '');
      }
    }

    const canvas = ref<HTMLElement>();
    onMounted(() => {
      if (currentSnapshot.value.length) {
        store.commit('editor/resetWidgets', currentSnapshot.value);
      }
      store.commit('editor/setCanvasRect', useRect(canvas.value!));
      // console.log('canvas', canvas.value!.getBoundingClientRect());
    })

    return () => {
      return (
        <div class="editor-container">
          <div class="editor-box">
            <div ref={ canvas } class="canvas" onDragover={ handleDragOver } onDrop={ handleDrop }>
              { renderWidgets() }
              <Lines canvasRect={ store.state.editor.canvasRect } widgets={ widgets.value } />
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


function generateUUID(){
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
}
