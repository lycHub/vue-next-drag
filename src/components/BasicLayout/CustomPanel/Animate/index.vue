<template>
  <div class="animate-panel">
    <template v-if="activeWidget">
      <div class="preview animate__animated" ref="preview">
        Animate
      </div>
      <el-radio-group v-model="speed" size="small">
        <el-radio-button label="slow" />
        <el-radio-button label="slower" />
        <el-radio-button label="fast" />
        <el-radio-button label="faster" />
      </el-radio-group>
      <el-radio-group v-model="selected">
        <el-row>
          <el-col class="col" :span="12" v-for="item of effects" :key="item">
            <el-radio :label="item">{{ item }}</el-radio>
          </el-col>
        </el-row>
      </el-radio-group>
    </template>
    <span v-else>请选择组件</span>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import { properBase } from '../../../../uses/propertyBase';
import { Effects } from './effects';
import 'animate.css';
import './index.scss';
import {WidgetAnimateClass} from "../../../../store/types";
import {aniEmitter} from "../../../Editor/bus";

export default defineComponent({
  name: 'Animate',
  setup(props) {
    const store = properBase().store;
    const activeWidget = properBase().widget;
    const effects = ref(Effects.filter(item => item.toLowerCase().indexOf('out') === -1));
    const selected = ref('');
    const speed = ref('');
    const preview = ref<HTMLElement | null>(null);
    let currentClass = '';
    let speedClass = '';

    const commitCls = (cls: Partial<WidgetAnimateClass>) => {
      store.commit('editor/setAnimateClass', {
        id: activeWidget.value!.id,
        cls
      });
      aniEmitter.emit<void>('animate');
    }

    watch(selected, value => {
      // console.log('wat selected', preview.value);
      if (currentClass) {
        preview.value!.classList.remove(currentClass);
      }
      currentClass = value;
      preview.value!.classList.add(currentClass);
      commitCls({ animate: currentClass });
    });
    watch(speed, value => {
      // console.log('wat selected', preview.value);
      if (speedClass) {
        preview.value!.classList.remove(speedClass);
      }
      speedClass = value;
      preview.value!.classList.add(speedClass);
      commitCls({ speed: speedClass });
    });
    return {
      effects,
      selected,
      speed,
      activeWidget,
      preview
    }
  }
});
</script>
<style lang="scss">
  @import "./index";
</style>
