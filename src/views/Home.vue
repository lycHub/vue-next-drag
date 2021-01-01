<template>
  <div class="home">
    <basic-layout>
      <editor />
    </basic-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import BasicLayout from "../components/BasicLayout";
import Editor from '../components/Editor';

export default defineComponent({
  name: 'Home',
  components: { BasicLayout, Editor },
  setup() {
    onMounted(() => {

    });
  }
});
</script>
