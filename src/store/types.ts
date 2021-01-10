export interface BaseStyle {
  fontSize: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
  borderRadius: string;
  textAlign: string;
  width?: string;
  height?: string;
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

export interface WidgetAnimateClass {
  animate: string;
  speed: string;
}

export interface Widget {
  id?: string;
  component: string;
  specialPanel: string;
  name: string;
  label: string;
  icon: string;
  widgetStyle: WidgetStyle;
  style: Partial<BaseStyle>;
  props: any;
  animateClass: Partial<WidgetAnimateClass>;
}
