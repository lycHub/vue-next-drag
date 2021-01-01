import {SFCWithInstall} from "element-plus/lib/utils/types";

export interface WidgetPosition {
  left: number;
  top: number;
}

export interface Widget<T = any> {
  id?: string;
  component: SFCWithInstall<T>;
  name: string;
  label: string;
  icon: string;
  position: WidgetPosition;
  style: Record<string, number | string>; // object: key: string; val: number | string
  attrs: any;
}


export interface RootState {

}
