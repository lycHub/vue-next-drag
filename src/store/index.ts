import {createStore, createLogger, Store, useStore as baseUseStore, ModuleTree, Module} from 'vuex';
import editor, {EditorState} from "./modules/editor";
import {Widget} from "./types";
import { InjectionKey } from 'vue';

export interface RootState {
  snapshots: Widget[][];
  currentIndex: number;
}

export interface AllStoreType extends RootState {
  editor: EditorState;
  // editor: Module<EditorState, RootState>;
}

const isDev = process.env.NODE_ENV === 'development';
export const key: InjectionKey<Store<AllStoreType>> = Symbol()
export const store = createStore<RootState>({
  modules: { editor },
  state: {
    snapshots: [],
    currentIndex: -1
  },
  getters: {
    currentSnapshot(state) {
      return state.snapshots[state.currentIndex] || [];
    }
  },
  mutations: {
    setSnapshot(state, shot: { index: number; widgets: Widget[]; }) {
      if (shot.index !== state.currentIndex) {
        state.snapshots.length = state.currentIndex + 1;
      }
      state.snapshots.splice(shot.index, 0, shot.widgets);
    },
    setCurrentIndex(state, index: number) {
      state.currentIndex = Math.max(index, -1);
    }
  },
  actions: {
    addSnapshot({ state, commit }, widgets: Widget[]) {
      const newIndex = state.currentIndex + 1;
      commit('setSnapshot', {
        index: newIndex,
        widgets
      });
      commit('setCurrentIndex', newIndex);
    }
  },
  strict: isDev,
  plugins: isDev ? [createLogger()] : []
})

export function useStore() {
  return baseUseStore<AllStoreType>(key)
}
