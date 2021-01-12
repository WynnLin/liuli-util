/**
 * 将一个 Iterator 迭代器转换为一个 Array
 * @param iterator Iterator 迭代器
 * @return Iterator 中每一项元素转换而得到的 Array
 * @deprecated 已废弃，请使用 ES6 原生函数 {@see Array.from} 替代
 */
export function asIterator<T>(iterator: Iterator<T>): T[] {
  const arr = []
  while (true) {
    const next = iterator.next()
    if (next.done) {
      break
    }
    arr.push(next.value)
  }
  return arr
}
