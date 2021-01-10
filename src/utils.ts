// 角度转弧度
import {MoveStartInfo} from "./components/Editor/types";
import {WidgetStyle} from "./store/types";

function rotateToRadian(rotate: number): number {
  return (rotate * Math.PI) / 180;
}



export function sin(rotate: number) {
  return Math.abs(Math.sin(rotateToRadian(rotate)));
}

export function cos(rotate: number) {
  return Math.abs(Math.cos(rotateToRadian(rotate)));
}


// 角度都转成0 ~ 360范围内
export function conversionRotateOneCircle(rotate: number): number {
  return rotate <= 0
    ? rotate + Math.ceil(Math.abs(rotate / 360)) * 360
    : rotate - Math.floor(Math.abs(rotate / 360)) * 360;
}

// 角度属于哪个象限里
export function conversionRotateToQuadrant(rotate: number): number {
  rotate = conversionRotateOneCircle(rotate);

  const map: Map<boolean, 1 | 2 | 3 | 4> = new Map();
  map.set(rotate >= 0 && rotate < 90, 1);
  map.set(rotate >= 270 && rotate < 360, 4);
  map.set(rotate >= 180 && rotate < 270, 3);
  map.set(rotate >= 90 && rotate < 180, 2);

  return ~~map.get(true)!;
}


// 求两点之间的中点坐标
export function getCenterPoint(p1: MoveStartInfo, p2: MoveStartInfo) {
  return {
    x: p1.x + ((p2.x - p1.x) / 2),
    y: p1.y + ((p2.y - p1.y) / 2)
  }
}



/**
 * 计算根据圆心旋转后的点的坐标
 * @param   {Object}  point   旋转前的点坐标
 * @param   {Object}  center  旋转中心
 * @param   {Int}     rotate  旋转的角度
 * @return  {Object}          旋转后的坐标
 */
export function getRotatedPoint(point: MoveStartInfo, center: MoveStartInfo, rotate: number): MoveStartInfo {
  /**
   * 旋转公式：
   *  点a(x, y)
   *  旋转中心c(x, y)
   *  旋转后点n(x, y)
   *  旋转角度θ                tan ??
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */
  return {
    x: (point.x - center.x) * Math.cos(rotateToRadian(rotate)) - (point.y - center.y) * Math.sin(rotateToRadian(rotate)) + center.x,
    y: (point.x - center.x) * Math.sin(rotateToRadian(rotate)) + (point.y - center.y) * Math.cos(rotateToRadian(rotate)) + center.y
  }
}


/**
 * 获取旋转后的手柄坐标
 * @param  {Object} widgetStyle   形状的信息
 * @param  {Object} center   组件中心店
 * @param  {String} type 手柄名称
 * @return {Object}          旋转后的手柄坐标
 */
export function getPoint(widgetStyle: WidgetStyle, center: MoveStartInfo, type: string): MoveStartInfo {
  let point: MoveStartInfo;
  switch (type) {
    case 'n':
      point = {
        x: widgetStyle.left + (widgetStyle.width / 2),
        y: widgetStyle.top
      }
      break;
    case 's':
      point = {
        x: widgetStyle.left + (widgetStyle.width / 2),
        y: widgetStyle.top + widgetStyle.height
      }
      break;
      case 'w':
        point = {
          x: widgetStyle.left,
          y: widgetStyle.top + widgetStyle.height / 2
        }
      break;
      case 'e':
        point = {
          x: widgetStyle.left + widgetStyle.width,
          y: widgetStyle.top + widgetStyle.height / 2
        }
      break;
      case 'nw':
        point = {
          x: widgetStyle.left,
          y: widgetStyle.top
        }
      break;
      case 'ne':
        point = {
          x: widgetStyle.left + widgetStyle.width,
          y: widgetStyle.top
        }
      break;
      case 'sw':
        point = {
          x: widgetStyle.left,
          y: widgetStyle.top + widgetStyle.height
        }
      break;
    default: // se
      point = {
        x: widgetStyle.left + widgetStyle.width,
        y: widgetStyle.top+ widgetStyle.height
      }
      break;
  }
  return getRotatedPoint(point, center, widgetStyle.rotate);
}
