import {WidgetStyle} from "../../store/types";
import {Direct, DotMouseDownInfo, MoveStartInfo} from "./types";
import {getCenterPoint, getPoint, getRotatedPoint, sin} from "../../utils";

export interface MoveDiff {
  diffX: number;
  diffY: number;
}

function limitMinNum(num: number, limit: number): number {
  return Math.max(num, limit);
}

function stretchN(dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) {
  const { minSize, width } = widgetStyle;
  const { sPoint, handlePoint } = dotMousedownInfo;
  // console.log('handlePoint', handlePoint, currentPosition);

  // step2：求currentPosition已handlePoint为中心，反向旋转rotate后的坐标
  const rotatedCurrentPosition = getRotatedPoint(currentPosition, handlePoint, -widgetStyle.rotate);
  // console.log('rotatedCurrentPosition', rotatedCurrentPosition);

  // step3: 无旋转拉伸后的handlePoint以原handlePoint为中心，旋转rotate后的坐标
  const rotatedTopMiddlePoint = getRotatedPoint({
    x: handlePoint.x,
    y: rotatedCurrentPosition.y
  }, handlePoint, widgetStyle.rotate);
  // console.log('rotatedTopMiddlePoint', rotatedTopMiddlePoint);

  // 勾股定理
  const newHeight = Math.sqrt(Math.pow(rotatedTopMiddlePoint.x - sPoint.x, 2) + Math.pow(rotatedTopMiddlePoint.y - sPoint.y, 2));
  // console.log('newHeight', newHeight);

  if (newHeight > minSize.height) {
    const newCenter = {
      x: rotatedTopMiddlePoint.x - (rotatedTopMiddlePoint.x - sPoint.x) / 2,
      y: rotatedTopMiddlePoint.y + (sPoint.y - rotatedTopMiddlePoint.y) / 2
    }
    root.style.height = newHeight + 'px';
    root.style.top = newCenter.y - (newHeight / 2) + 'px';
    root.style.left = newCenter.x - (width / 2) + 'px';
    callback();
  }
}

function stretchE(dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) {
  const { minSize, height } = widgetStyle;
  const { sPoint, handlePoint } = dotMousedownInfo;

  const rotatedCurrentPosition = getRotatedPoint(currentPosition, handlePoint, -widgetStyle.rotate);

  const rotatedRightMiddlePoint = getRotatedPoint({
    x: rotatedCurrentPosition.x,
    y: handlePoint.y
  }, handlePoint, widgetStyle.rotate);

  const newWidth = Math.sqrt(Math.pow(rotatedRightMiddlePoint.x - sPoint.x, 2) + Math.pow(rotatedRightMiddlePoint.y - sPoint.y, 2));

  if (newWidth > minSize.width) {
    const newCenter = {
      x: rotatedRightMiddlePoint.x - (rotatedRightMiddlePoint.x - sPoint.x) / 2,
      y: rotatedRightMiddlePoint.y + (sPoint.y - rotatedRightMiddlePoint.y) / 2
    }
    root.style.width = newWidth + 'px';
    root.style.top = newCenter.y - (height / 2) + 'px';
    root.style.left = newCenter.x - (newWidth / 2) + 'px';
    callback();
  }
}


function stretchS(dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) {
  const { minSize, width } = widgetStyle;
  const { sPoint, handlePoint } = dotMousedownInfo;

  const rotatedCurrentPosition = getRotatedPoint(currentPosition, handlePoint, -widgetStyle.rotate);

  const rotatedBottomMiddlePoint = getRotatedPoint({
    x: handlePoint.x,
    y: rotatedCurrentPosition.y
  }, handlePoint, widgetStyle.rotate);

  const newHeight = Math.sqrt(Math.pow(rotatedBottomMiddlePoint.x - sPoint.x, 2) + Math.pow(rotatedBottomMiddlePoint.y - sPoint.y, 2));

  if (newHeight > minSize.height) {
    const newCenter = {
      x: rotatedBottomMiddlePoint.x - (rotatedBottomMiddlePoint.x - sPoint.x) / 2,
      y: rotatedBottomMiddlePoint.y + (sPoint.y - rotatedBottomMiddlePoint.y) / 2
    }
    root.style.height = newHeight + 'px';
    root.style.top = newCenter.y - (newHeight / 2) + 'px';
    root.style.left = newCenter.x - (width / 2) + 'px';
    callback();
  }
}


function stretchW(dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) {
  const { minSize, height } = widgetStyle;
  const { sPoint, handlePoint } = dotMousedownInfo;

  const rotatedCurrentPosition = getRotatedPoint(currentPosition, handlePoint, -widgetStyle.rotate);

  const rotatedLeftMiddlePoint = getRotatedPoint({
    x: rotatedCurrentPosition.x,
    y: handlePoint.y
  }, handlePoint, widgetStyle.rotate);

  const newWidth = Math.sqrt(Math.pow(rotatedLeftMiddlePoint.x - sPoint.x, 2) + Math.pow(rotatedLeftMiddlePoint.y - sPoint.y, 2));

  if (newWidth > minSize.width) {
    const newCenter = {
      x: rotatedLeftMiddlePoint.x - (rotatedLeftMiddlePoint.x - sPoint.x) / 2,
      y: rotatedLeftMiddlePoint.y + (sPoint.y - rotatedLeftMiddlePoint.y) / 2
    }
    root.style.width = newWidth + 'px';
    root.style.top = newCenter.y - (height / 2) + 'px';
    root.style.left = newCenter.x - (newWidth / 2) + 'px';
    callback();
  }
}


function stretchNW(dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) {
  const { minSize } = widgetStyle;
  const { sPoint } = dotMousedownInfo;
  const newCenterPoint = getCenterPoint(currentPosition, sPoint);
  const newTopLeftPoint = getRotatedPoint(currentPosition, newCenterPoint, -widgetStyle.rotate)
  const newBottomRightPoint = getRotatedPoint(sPoint, newCenterPoint, -widgetStyle.rotate)

  const newWidth = newBottomRightPoint.x - newTopLeftPoint.x
  const newHeight = newBottomRightPoint.y - newTopLeftPoint.y
  if (newWidth > minSize.width && newHeight > minSize.height) {
    root.style.width = newWidth + 'px';
    root.style.height = newHeight + 'px';
    root.style.left = newTopLeftPoint.x + 'px';
    root.style.top = newTopLeftPoint.y + 'px';
    callback();
  }
}

function stretchNE(dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) {
  const { minSize } = widgetStyle;
  const { sPoint } = dotMousedownInfo;
  const newCenterPoint = getCenterPoint(currentPosition, sPoint);

  const newTopRightPoint = getRotatedPoint(currentPosition, newCenterPoint, -widgetStyle.rotate)
  const newBottomLeftPoint = getRotatedPoint(sPoint, newCenterPoint, -widgetStyle.rotate)

  const newWidth = newTopRightPoint.x - newBottomLeftPoint.x
  const newHeight = newBottomLeftPoint.y - newTopRightPoint.y
  if (newWidth > minSize.width && newHeight > minSize.height) {
    root.style.width = newWidth + 'px';
    root.style.height = newHeight + 'px';
    root.style.left = newBottomLeftPoint.x + 'px';
    root.style.top = newTopRightPoint.y + 'px';
    callback();
  }
}


function stretchSE(dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) {
  const { minSize } = widgetStyle;
  const { sPoint } = dotMousedownInfo;
  const newCenterPoint = getCenterPoint(currentPosition, sPoint);

  const newTopLeftPoint = getRotatedPoint(sPoint, newCenterPoint, -widgetStyle.rotate)
  const newBottomRightPoint = getRotatedPoint(currentPosition, newCenterPoint, -widgetStyle.rotate)

  const newWidth = newBottomRightPoint.x - newTopLeftPoint.x
  const newHeight = newBottomRightPoint.y - newTopLeftPoint.y

  if (newWidth > minSize.width && newHeight > minSize.height) {
    root.style.width = newWidth + 'px';
    root.style.height = newHeight + 'px';
    root.style.left = newTopLeftPoint.x + 'px';
    root.style.top = newTopLeftPoint.y + 'px';
    callback();
  }
}


function stretchSW(dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) {
  const { minSize } = widgetStyle;
  const { sPoint } = dotMousedownInfo;
  const newCenterPoint = getCenterPoint(currentPosition, sPoint);

  const newTopRightPoint = getRotatedPoint(sPoint, newCenterPoint, -widgetStyle.rotate)
  const newBottomLeftPoint = getRotatedPoint(currentPosition, newCenterPoint, -widgetStyle.rotate)

  const newWidth = newTopRightPoint.x - newBottomLeftPoint.x
  const newHeight = newBottomLeftPoint.y - newTopRightPoint.y
  if (newWidth > minSize.width && newHeight > minSize.height) {
    root.style.width = newWidth + 'px';
    root.style.height = newHeight + 'px';
    root.style.left = newBottomLeftPoint.x + 'px';
    root.style.top = newTopRightPoint.y + 'px';
    callback();
  }
}




export const stretchStrategy: { [key: string]: (dotMousedownInfo: DotMouseDownInfo, widgetStyle: WidgetStyle, currentPosition: MoveStartInfo, root: HTMLElement, callback: () => void) => void } = {
  n: stretchN,
  e: stretchE,
  s: stretchS,
  w: stretchW,
  nw: stretchNW,
  ne: stretchNE,
  se: stretchSE,
  sw: stretchSW
}
