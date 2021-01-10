import {defineComponent, reactive, watch, toRaw, ref} from "vue";
import {BaseStyle, Widget} from "../../../store/types";
import {properBase} from "../../../uses/propertyBase";
import {createLogger} from "vuex";
import {cloneDeep} from "lodash";
import {setSnapshot} from "../../../uses/snapshop";

export default defineComponent({
  name: 'Base',
  setup(props, { emit }) {
    const store = properBase().store;
    const activeWidget = properBase().widget;
    const currentSnapshot = properBase().currentSnapshot;
    const style = reactive<BaseStyle>({
      fontSize: '',
      color: '',
      backgroundColor: '',
      borderColor: '',
      borderRadius: '',
      textAlign: ''
    });
    const specialValue = reactive({
      fontSize: 14,
      borderRadius: 0
    })
    const opacity = ref(1);
    watch(activeWidget, widget => {
      // console.log('wat widget', widget?.style);
      if (widget) {
        setStyles(widget.style);
        opacity.value = widget.widgetStyle.opacity || 1;
      }
    });
    watch([specialValue, style], ([special, style]) => {
      const cloneWidget = cloneDeep(activeWidget.value!);
      const newWidget: Widget = {
        ...cloneWidget,
        style: {
          ...cloneWidget.style,
          ...toRaw(style),
          fontSize: special.fontSize + 'px',
          borderRadius: special.borderRadius + 'px',
        }
      }
      setSnapshot(newWidget, store);
    });

    watch(opacity, value => {
      const cloneWidget = cloneDeep(activeWidget.value!);
      const newWidget: Widget = {
        ...cloneWidget,
        widgetStyle: { ...cloneWidget.widgetStyle, opacity: value }
      }
      setSnapshot(newWidget, store);
    });

    const setStyles = (newStyle: Partial<BaseStyle>) => {
      // console.log('setStyles', newStyle);
      Object.keys(style).forEach(key => {
        const attr = key as keyof BaseStyle;
        if (!Reflect.has(specialValue, attr)) {
          style[attr] = newStyle[attr] || '';
        } else {
          specialValue.fontSize = newStyle.fontSize ? +newStyle.fontSize.slice(0, -2) : 14;
          specialValue.borderRadius = newStyle.borderRadius ? +newStyle.borderRadius.slice(0, -2) : 14;
        }
      })
    }

    return () => {
      return (
        <div>
          {
            activeWidget.value ?
              <el-form ref="form" label-width="100px">
                <el-form-item label="字号：">
                  <el-input-number min={ 12 } v-model={ specialValue.fontSize } size="small" />
                </el-form-item>
                <el-form-item label="圆角：">
                  <el-input-number min={ 0 } v-model={ specialValue.borderRadius } size="small" />
                </el-form-item>
                <el-form-item label="对齐：">
                  <el-radio-group v-model={ style.textAlign }>
                    <el-radio-button label="left">左</el-radio-button>
                    <el-radio-button label="center">中</el-radio-button>
                    <el-radio-button label="right">右</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="字体颜色：">
                  <el-color-picker v-model={ style.color } />
                </el-form-item>
                <el-form-item label="背景颜色：">
                  <el-color-picker v-model={ style.backgroundColor } />
                </el-form-item>
                <el-form-item label="边框颜色：">
                  <el-color-picker v-model={ style.borderColor } />
                </el-form-item>
                <el-form-item label="透明度：">
                  <el-input-number min={0} max={1} step={0.1} step-strictly v-model={ opacity.value } size="small" />
                </el-form-item>
              </el-form> :
            <span>请选择组件</span>
          }
        </div>
      );
    }
  }
});
