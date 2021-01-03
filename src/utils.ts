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
