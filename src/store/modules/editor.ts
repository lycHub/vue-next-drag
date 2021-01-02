// @ts-ignore
import {Widget} from "../types";
import {Module} from "vuex";
import {RootState} from "../types";
// import {WidgetList} from "../widgets";

export interface EditorState {
  widgets: Widget[];
  activeWidgetIds: string[];
}

const editor: Module<EditorState, RootState> = {
  namespaced: true,
  state: {
    widgets: [], // 可能会引起不必要的开销
    activeWidgetIds: []
  },
  mutations: {
    setActivateWidgetIds(state, ids: string[]) {
      state.activeWidgetIds = ids;
    },
    addWidget(state, widget: Widget) {
      state.widgets.push(widget);
    },
    updateWidget(state, newWidget: { id: string; widget: Widget }) {
      let index = state.widgets.findIndex(item => item.id === newWidget.id); // find不管用
      if (index > -1) {
        // state.widgets[index] = newWidget.widget;
        state.widgets.splice(index, 1, newWidget.widget);
      }
    },
    setWidgets(state, widgets: Widget[]) {
      state.widgets = widgets;
    }
  }
}

export default editor;
