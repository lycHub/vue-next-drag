import {createStore, createLogger, Store, useStore as baseUseStore} from 'vuex';
import editor, {EditorState} from "./modules/editor";
import {RootState} from "./types";
import { InjectionKey } from 'vue';

export interface AllStoreType {
  editor: EditorState;
}

const isDev = process.env.NODE_ENV === 'development';
export const key: InjectionKey<Store<RootState>> = Symbol()
export const store = createStore({
  modules: { editor },
  strict: isDev,
  plugins: isDev ? [createLogger()] : []
})

export function useStore() {
  return baseUseStore<AllStoreType>(key)
}
