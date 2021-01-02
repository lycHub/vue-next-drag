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
    onMounted(() => {
      if (root.value) {
        root.value.addEventListener('click', (event: MouseEvent) => {
          store.commit('editor/setActivateWidgetIds', []);
        });
      }
    });
    return {
      root
    }
  }
});
</script>
