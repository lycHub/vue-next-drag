import {WidgetStyle} from "../../store/types";
import {Direct} from "./types";

export interface MoveDiff {
  diffX: number;
  diffY: number;
}

function limitMinNum(num: number, limit: number): number {
  return Math.max(num, limit);
}

function stretchN(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, height, top } = widgetStyle;
  const newHeight = limitMinNum(height - diff.diffY, minSize.height);
  // console.log('stretchN', newHeight);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
    root.style.top = (top + diff.diffY) + 'px';
    // root.value!.style.left = (left - diff.diffY / 2 * sin(rotate)) + 'px';
    callback();
  }
}

function stretchE(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width } = widgetStyle;
  const newWidth = limitMinNum(width + diff.diffX, minSize.width);
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
    callback();
  }
}


function stretchS(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, height } = widgetStyle;
  const newHeight = limitMinNum(height + diff.diffY, minSize.height);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
    callback();
  }
}


function stretchW(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width, left } = widgetStyle;
  const newWidth = limitMinNum(width - diff.diffX, minSize.width);
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
    root.style.left = (left + diff.diffX) + 'px';
    callback();
  }
}

function stretchNW(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width, height, left, top } = widgetStyle;
  
  const newHeight = limitMinNum(height - diff.diffY, minSize.height);
  const newWidth = limitMinNum(width - diff.diffX, minSize.width);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
    root.style.top = (top + diff.diffY) + 'px';
  }
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
    root.style.left = (left + diff.diffX) + 'px';
  }
  callback();
}

function stretchNE(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width, height, top } = widgetStyle;

  const newHeight = limitMinNum(height - diff.diffY, minSize.height);
  const newWidth = limitMinNum(width + diff.diffX, minSize.width);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
    root.style.top = (top + diff.diffY) + 'px';
  }
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
  }
  callback();
}


function stretchSE(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width, height, top } = widgetStyle;

  const newHeight = limitMinNum(height + diff.diffY, minSize.height);
  const newWidth = limitMinNum(width + diff.diffX, minSize.width);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
  }
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
  }
  callback();
}



function stretchSW(widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) {
  const { minSize, width, height, left } = widgetStyle;

  const newHeight = limitMinNum(height + diff.diffY, minSize.height);
  const newWidth = limitMinNum(width - diff.diffX, minSize.width);
  if (newHeight > minSize.height) {
    root.style.height = newHeight + 'px';
  }
  if (newWidth > minSize.width) {
    root.style.width = newWidth + 'px';
    root.style.left = (left + diff.diffX) + 'px';
  }
  callback();
}
// @ts-ignore
export const stretchStrategy: { [key: string]: (widgetStyle: WidgetStyle, diff: MoveDiff, root: HTMLElement, callback: () => void) => void } = {
  n: stretchN,
  e: stretchE,
  s: stretchS,
  w: stretchW,
  nw: stretchNW,
  ne: stretchNE,
  se: stretchSE,
  sw: stretchSW
}
