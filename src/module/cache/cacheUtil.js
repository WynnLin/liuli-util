import { LocalStorageCache } from './LocalStorageCache'
import { TimeoutInfinite, CacheOption } from './CacheOption'

/**
 * 默认使用的 {@link ICache} 接口的缓存实现
 */
const cache = new LocalStorageCache()

/**
 * 缓存工具类
 * 主要实现缓存高阶函数的封装
 */
export class CacheUtil {
  /**
   * 包裹函数为缓存函数
   * @param {Function} fn 一个接受一些参数并返回结果的函数
   * @param {Number|String} [timeout] 缓存时间。默认为无限
   * @returns {Function|Object} 带有缓存功能的函数
   */
  onceOfSameParam (fn, timeout = TimeoutInfinite) {
    const innerFn = function (...args) {
      const key = 'onceOfSameParam' + fn.toString() + JSON.stringify(args)
      const cacheOption = new CacheOption({ timeout })
      const val = cache.get(key)
      if (val !== null) {
        return val
      }
      const result = fn.call(this, ...args)
      cache.set(key, result, cacheOption)
      return result
    }
    /**
     * 所包装的原函数
     * @type {Function}
     */
    innerFn.origin = fn
    /**
     * 清空缓存，清空指定参数调用时的函数缓存
     * @type {Function}
     */
    innerFn.clear = function (...args) {
      const key = 'onceOfSameParam' + fn.toString() + JSON.stringify(args)
      cache.del(key)
    }
    return innerFn
  }
}

/**
 * 导出一个默认的缓存工具对象
 */
export const cacheUtil = new CacheUtil()