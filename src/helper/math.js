import {MathUtils} from "three";


export function findMinMax2D(arr) {
  let min = arr[0][0];
  let max = arr[0][0];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] < min) {
        min = arr[i][j];
      }
      if (arr[i][j] > max) {
        max = arr[i][j];
      }
    }
  }
  return [min, max];
}

export function domain2range(domain, range) {
  let min = domain[0];
  let max = domain[1];
  let minRange = range[0];
  let maxRange = range[1];
  let rangeLen = maxRange - minRange;
  let domainLen = max - min;
  let scale = rangeLen / domainLen;
  return function(x) {
    return minRange + ((x||0) - min) * scale;
  };
}

export const damp = MathUtils.damp;
