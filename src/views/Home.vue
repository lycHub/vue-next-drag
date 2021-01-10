<template>
  <div class="home" ref="root">
    <basic-layout>
      <editor />
    </basic-layout>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import BasicLayout from "../components/BasicLayout";
import Editor from '../components/Editor';
import {useStore} from "../store";

export default defineComponent({
  name: 'Home',
  components: { BasicLayout, Editor },
  setup() {
    const root = ref<HTMLElement | null>(null);
    const store = useStore();
    // store.dispatch('addSnapshot', newSnapshot);
    const records = localStorage.getItem('record');
    if (records) {
      // console.log('records', records);
      store.dispatch('addSnapshot', JSON.parse(records));
    }
    onMounted(() => {
      if (root.value) {
        root.value.addEventListener('click', (event: MouseEvent) => {
          if (store.state.editor.activeWidgetId) {
            store.commit('editor/setActivateWidgetId', '');
          }
        });
      }
    });
    return {
      root
    }
  }
});
</script>
