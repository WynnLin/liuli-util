import { wait } from './wait'
import { AsyncFunc } from '../interface/AsyncFunc'

/**
 * 异步限制并发队列的接口
 * 主要适用于限制某个函数的并发限制
 */
interface IAsyncLimiting {
  /**
   * 限制同时存在的异步的数量
   */
  limit: number
}

/**
 * 包装一个异步函数为有限制并发功能的函数
 * @param fn 异步函数
 * @param options 可选参数
 * @param options.limit 并发限制数量，默认为 1
 * @returns 返回被包装后的限制并发功能的函数
 */
export function asyncLimiting<Fn extends AsyncFunc>(
  fn: Fn,
  { limit = 1 }: Partial<IAsyncLimiting> = {},
): Fn {
  // 当前正在执行异步的数量
  let execCount = 0
  // waitArr 等待的队列
  const takeQueue: any[][] = []
  // 是否增加了 execCount 的标记
  let flag = false
  return new Proxy(fn, {
    async apply(_, _this, args) {
      const _takeRun = async () => {
        if (!flag) {
          execCount++
          flag = false
        }
        const tempArgs = takeQueue.shift()
        try {
          return await Reflect.apply(_, _this, tempArgs!)
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
    },
  })
}
