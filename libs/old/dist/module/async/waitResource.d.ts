import { ReturnFunc } from '../interface/ReturnFunc'
/**
 * 等待指定资源加载的可选参数接口
 */
interface IWaitResourceOptions {
  /**
   * 轮询间隔
   */
  interval: number
  /**
   * 最大轮询次数
   */
  max: number
}
/**
 * 轮询等待指定资源加载完毕再执行操作
 * 使用 Promises 实现，可以使用 ES7 的 {@see async} 和 {@see await} 调用
 * @param fn 判断必须的资源是否存在的方法
 * @param option 可配置项
 * @returns Promise 对象
 */
export declare function waitResource(
  fn: ReturnFunc<boolean>,
  { interval, max }?: Partial<IWaitResourceOptions>,
): Promise<void>
export {}
//# sourceMappingURL=waitResource.d.ts.map
