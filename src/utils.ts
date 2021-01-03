// 角度转弧度
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
