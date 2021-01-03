export interface WidgetStyle {
  left: number;
  top: number;
  rotate: number;
  width: number;
  height: number;
  minSize: { width: number; height: number };
}

export interface Widget {
  id?: string;
  component: string;
  name: string;
  label: string;
  icon: string;
  widgetStyle: WidgetStyle;
  style: Record<string, number | string>; // object: key: string; val: number | string
  attrs: any;
}


export interface RootState {

}
