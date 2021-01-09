import {defineComponent, reactive, watch, toRaw, ref, PropType} from "vue";
import {BaseStyle, Widget} from "../../../store/types";

export default defineComponent({
  name: 'Base',
  props: {
    activeWidget: Object as PropType<Widget>
  },
  emits: ['change'],
  setup(props, { emit }) {
    const style = reactive<BaseStyle>({
      fontSize: '',
      color: '',
      backgroundColor: '',
      borderColor: '',
      borderRadius: '',
      textAlign: '',
      opacity: 1
    });
    const specialValue = reactive({
      fontSize: 14,
      borderRadius: 0
    })
    // const fontSize = ref(14);
    // const borderRadius = ref(0);
    watch(() => props.activeWidget, widget => {
      // console.log('wat widget', widget?.style);
      if (widget?.style) {
        setValue(widget.style);
      }
    })
    watch([specialValue, style], ([special, style]) => {
      emit('change', {
        ...toRaw(style),
        fontSize: special.fontSize + 'px',
        borderRadius: special.borderRadius + 'px',
      })
    });

    const setValue = (initStyle: Partial<BaseStyle>) => {
      Object.keys(style).forEach((key) => {
        const attr = key as keyof BaseStyle;
        if (Reflect.has(specialValue, attr)) {
          if (initStyle[attr]) {
            // @ts-ignore
            specialValue[attr] = +initStyle[attr].slice(0, -2);
          }
        } else {
          // @ts-ignore
          style[attr] = initStyle[attr] || '';
        }
      })
    }


    return () => {
      return (
        <div>
          {
            props.activeWidget ?
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
                  <el-input-number min={0} max={1} step={0.1} step-strictly v-model={ style.opacity } size="small" />
                </el-form-item>
              </el-form> :
            <span>请选择组件</span>
          }
        </div>
      );
    }
  }
});
