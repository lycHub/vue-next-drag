export interface BaseStyle {
  fontSize: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
  borderRadius: string;
  textAlign: string;
}

export interface WidgetStyle {
  left: number;
  top: number;
  rotate: number;
  width: number;
  height: number;
  minSize: { width: number; height: number };
  opacity: number;
}

export interface Widget {
  id?: string;
  component: string;
  name: string;
  label: string;
  icon: string;
  widgetStyle: WidgetStyle;
  style: Partial<BaseStyle>;
  attrs: any;
}


export interface RootState {

}
