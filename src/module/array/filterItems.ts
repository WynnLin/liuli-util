import { returnItself } from './../function/returnItself'
import { ArrayCallback } from '../interface/ArrayCallback'
import { convert } from '../interface/convert'

/**
 * 从数组中移除指定的元素
 * 注: 时间复杂度为 1~3On
 * @param arr 需要被过滤的数组
 * @param deleteItems 要过滤的元素数组
 * @param kFn 每个元素的唯一键函数
 */
export function filterItems<T, K>(
  arr: T[],
  deleteItems: T[],
  kFn: ArrayCallback<T, K> = convert(returnItself),
) {
  const kSet = new Set(deleteItems.map(kFn))
  return arr.filter((v, i, arr) => !kSet.has(kFn(v, i, arr)))
}
