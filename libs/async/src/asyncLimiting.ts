import { wait } from './wait'

/**
 * 包装一个异步函数为有限制并发功能的函数
 * @param fn 异步函数
 * @param limit 并发限制数量
 * @returns 返回被包装后的限制并发功能的函数
 */
export function asyncLimiting<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  limit: number,
): T {
  // 当前正在执行异步的数量
  let execCount = 0
  // waitArr 等待的队列
  const takeQueue: any[][] = []
  // 是否增加了 execCount 的标记
  let flag = false
  return async function (...args) {
    const _takeRun = async () => {
      if (!flag) {
        execCount++
        flag = false
      }
      const tempArgs = takeQueue.shift()!
      try {
        return await fn(...tempArgs)
      } finally {
        execCount--
      }
    }
    takeQueue.push(args)

    await wait(() => {
      const result = execCount < limit
      // 如果等待结束则必须立刻增加 execCount，避免微任务与宏任务调度可能产生错误
      if (result) {
        flag = true
        execCount++
      }
      return result
    })
    return _takeRun()
  } as T
}
