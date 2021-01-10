import {Widget} from "../store/types";
import {cloneDeep} from "lodash";
import {Store} from "vuex";
import {AllStoreType} from "../store";
import {storageKey} from "../main";

export function setSnapshot(newWidget: Widget, store: Store<AllStoreType>) {
  const newSnapshot = cloneDeep(store.getters.currentSnapshot as Widget[]);
  const activeInSnapshotIndex = newSnapshot.findIndex(item => item.id === newWidget.id);
  // console.log('newSnapshot', newSnapshot, activeInSnapshotIndex);
  if (activeInSnapshotIndex > -1) {
    newSnapshot.splice(activeInSnapshotIndex, 1, cloneDeep(newWidget));
  }
  // console.log('newSnapshot', newSnapshot);
  store.dispatch('addSnapshot', newSnapshot);
}


export function delSnapshot(id: string, store: Store<AllStoreType>) {
  const newSnapshot = cloneDeep(store.getters.currentSnapshot as Widget[]);
  const activeInSnapshotIndex = newSnapshot.findIndex(item => item.id === id);
  // console.log('newSnapshot', newSnapshot, activeInSnapshotIndex);
  if (activeInSnapshotIndex > -1) {
    newSnapshot.splice(activeInSnapshotIndex, 1);
  }
  // console.log('newSnapshot', newSnapshot);
  store.dispatch('addSnapshot', newSnapshot);
}

export function clearSnapshot(store: Store<AllStoreType>) {
  store.dispatch('addSnapshot', []);
}


export function saveSnapshot(store: Store<AllStoreType>) {
  localStorage.setItem(storageKey, JSON.stringify(store.getters.currentSnapshot as Widget[]));
}
