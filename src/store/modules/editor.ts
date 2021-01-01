// @ts-ignore
import {Widget} from "../types";
import {Module} from "vuex";
import {RootState} from "../types";
// import {WidgetList} from "../widgets";

export interface EditorState {
  widgets: Widget[];
  test: string;
}

const editor: Module<EditorState, RootState> = {
  namespaced: true,
  state: {
    widgets: [],
    test: 'aaa'
  },
  getters: {
    widgets(state: EditorState) {
      return state.widgets;
    }
  },
  mutations: {
    setTest(state) {
      state.test = 'vvvvv';
    },
    addWidget(state, widget: Widget) {
      state.widgets.push(widget);
    },
    setWidgets(state, widgets: Widget[]) {
      state.widgets = widgets;
    }
  }
}

export default editor;
