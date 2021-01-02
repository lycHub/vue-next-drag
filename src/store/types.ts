import {SFCWithInstall} from "element-plus/lib/utils/types";

export interface WidgetStyle {
  left: number;
  top: number;
  rotate: number;
  width: number;
  height: number;
}

export interface Widget<T = any> {
  id?: string;
  component: SFCWithInstall<T>;
  name: string;
  label: string;
  icon: string;
  widgetStyle: WidgetStyle;
  style: Record<string, number | string>; // object: key: string; val: number | string
  attrs: any;
}


export interface RootState {

}
