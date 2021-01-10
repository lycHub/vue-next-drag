import {defineComponent, reactive, ref, toRaw, watch} from "vue";
import './index.scss';
import {properBase} from "../../../../../uses/propertyBase";
import {BaseStyle, Widget} from "../../../../../store/types";
import {cloneDeep} from "lodash";
import {setSnapshot} from "../../../../../uses/snapshop";

interface ButtonProps {
  disable: boolean;
  loading: boolean;
  type: string;
}

export default defineComponent({
  name: 'ButtonProperty',
  setup(props) {
    const store = properBase().store;
    const activeWidget = properBase().widget;
    const label = ref('按钮');
    const propValues = reactive<ButtonProps>({
      disable: false,
      loading: false,
      type: 'primary'
    });

    const setProps = (props: ButtonProps) => {
      // console.log('setProps', props);
      Object.keys(propValues).forEach(key => {
        const prop = key as keyof ButtonProps;
        if (props[prop]) {
          // @ts-ignore
          propValues[prop] = props[prop];
        }
      })
    }


    const setStatus = (widget: Widget | undefined) => {
      if (widget) {
        label.value = widget.label;
        setProps(widget.props);
      }
    }



    setStatus(activeWidget.value);
    watch(activeWidget, widget => {
      // console.log('wat bbbb widget', widget?.label);
      setStatus(widget);
    });

    watch(label, label => {
      const cloneWidget = cloneDeep(activeWidget.value!);
      const newWidget: Widget = {
        ...cloneWidget,
        label
      }
      setSnapshot(newWidget, store);
    });

    watch(propValues, props => {
      const cloneWidget = cloneDeep(activeWidget.value!);
      const newWidget: Widget = {
        ...cloneWidget,
        props: { ...cloneWidget.props, ...props }
      }
      setSnapshot(newWidget, store);
    });

    return () => {
      return (
        <div class="btn-panel">
         <div class="item"> 文字：<el-input v-model={ label.value } /></div>
         <div class="item"><el-checkbox v-model={ propValues.disable }>禁用</el-checkbox></div>
         <div class="item"><el-checkbox v-model={ propValues.loading }>加载中</el-checkbox></div>
          <div class="item">
            类型：
            <el-radio-group size="small" v-model={ propValues.type }>
              <el-radio-button label="primary" />
              <el-radio-button label="success" />
              <el-radio-button label="warning" />
              <el-radio-button label="danger" />
              <el-radio-button label="info" />
              <el-radio-button label="text" />
            </el-radio-group>
          </div>
        </div>
      );
    }
  }
});
