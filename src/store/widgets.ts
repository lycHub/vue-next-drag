import {Widget} from "./types";
import Button from "element-plus/lib/el-button/src/button.vue";
import { ElButton } from 'element-plus';

export const elBtn: Widget<typeof Button> = {
  component: ElButton,
  name: '按钮',
  label: '按钮',
  icon: 'el-icon-thumb',
  widgetStyle: {
    left: 0,
    top: 0,
    width: 70,
    height: 40,
    rotate: 0
  },
  style: {
    borderRadius: 0,
    width: '100%',
    height: '100%'
  },
  attrs: {
    type: 'primary'
  }
}

export const WidgetList: Widget[] = [elBtn];
