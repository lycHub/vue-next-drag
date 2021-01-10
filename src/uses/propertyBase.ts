import {AllStoreType, useStore} from "../store";
import {computed} from "vue";
import {Store} from "vuex";
import {Widget} from "../store/types";
import {ComputedRef} from "@vue/reactivity";

export function properBase(): { store: Store<AllStoreType>; widget: ComputedRef<Widget | undefined>; currentSnapshot: ComputedRef<Widget[]> } {
  const store = useStore();
  const activeWidget = computed(() => store.state.editor.widgets.find(item => item.id === store.state.editor.activeWidgetId));
  const currentSnapshot = computed(() => store.getters.currentSnapshot as Widget[]);
  return { store, widget: activeWidget, currentSnapshot };
}
