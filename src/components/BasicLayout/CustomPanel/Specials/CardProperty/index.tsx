import {defineComponent, reactive, ref, toRaw, watch} from "vue";
import './index.scss';
import {properBase} from "../../../../../uses/propertyBase";
import {BaseStyle, Widget} from "../../../../../store/types";
import {cloneDeep} from "lodash";
import {setSnapshot} from "../../../../../uses/snapshop";

interface CardProps {
  shadow: string;
  header: string;
}

export default defineComponent({
  name: 'CardProperty',
  setup(props) {
    const store = properBase().store;
    const activeWidget = properBase().widget;
    const label = ref('');
    const propValues = reactive<CardProps>({
      shadow: 'hover',
      header: '标题'
    });

    const setProps = (props: CardProps) => {
      Object.keys(propValues).forEach(key => {
        const prop = key as keyof CardProps;
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
      setStatus(widget);
    });

    watch(label, value => {
      const cloneWidget = cloneDeep(activeWidget.value!);
      const newWidget: Widget = {
        ...cloneWidget,
        label: value
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
        <div class="card-panel">
         <div class="item"> 标题：<el-input v-model={ propValues.header } /></div>
          <div class="item"> 内容：<el-input type="textarea" v-model={ label.value } /></div>
          <div class="item">
            阴影：
            <el-radio-group size="small" v-model={ propValues.shadow }>
              <el-radio-button label="always " />
              <el-radio-button label="hover" />
              <el-radio-button label="never" />
            </el-radio-group>
          </div>
        </div>
      );
    }
  }
});
