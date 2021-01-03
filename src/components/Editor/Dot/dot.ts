import {conversionRotateOneCircle, conversionRotateToQuadrant} from "../../../utils";
import {DotInfo} from "../types";

const quadrantDirect = new Map<number, string>([
  [1, 'ne'],
  [2, 'nw'],
  [3, 'sw'],
  [4, 'se']
]);

const onCoordinate = new Map<number, string>([
  [0, 'e'],
  [90, 'n'],
  [180, 'w'],
  [270, 's']
]);

const sx = new Map<string, number>([
  ['nw', 135],
  ['n', 90],
  ['ne', 45],
  ['e', 0],
  ['se', 315],
  ['s', 270],
  ['sw', 225],
  ['w', 180]
]);
const getTrueType = (type: string, rotate: number): string => {
  rotate = conversionRotateOneCircle(rotate);
  const newRotate = conversionRotateOneCircle(sx.get(type)! - rotate);
  let result = '';
  if (newRotate % 90 === 0) {
    // console.log('newRotate', newRotate);
    result = onCoordinate.get(newRotate)!;
  } else {
    const whichQuadrantDirect = conversionRotateToQuadrant(newRotate);
    result = quadrantDirect.get(whichQuadrantDirect)!;
  }
  // console.log('result', result);
  return result;
}

export function calculateDotInfo(type: string, value: string, width: number, height: number, rotate: number): DotInfo {
  let left = 0;
  let top = 0;
  const trueType = getTrueType(type, rotate);
  // console.log('trueType', trueType);
  switch (value) {
    case '右上':
      left = width;
      top = 0;
      break;
    case '左下':
      left = 0;
      top = height;
      break;
    case '右下':
      left = width;
      top = height;
      break;
    case '左':
      left = 0;
      top = height / 2;
      break;
    case '右':
      left = width;
      top = height / 2;
      break;
    case '上':
      left = width / 2;
      top = 0;
      break;
    case '下':
      left = width / 2;
      top = height;
      break;
  }
  return { type, trueType, left, top };
}
