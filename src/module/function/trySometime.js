/**
 * 包装一个函数为有错误重试功能的函数
 * 注: 如果发生错误，最终将抛出最后一次调用的异常
 * @param {Function} fn 需要被包装的函数
 * @param {Number} [num=1] 调用的次数。默认为 1
 * @param {Function} [errorCheck=res=>true] 检查返回结果是否需要重试的函数。默认只要 resolve() 就返回 true
 * @returns {Function} 包装后的有错误重试功能的函数
 */
export function trySometime (fn, num = 1, errorCheck = res => true) {
  return new Proxy(fn, {
    async apply (target, thisArg, args) {
      let err
      for (let i = 0; i < num; i++) {
        try {
          // 等待结果出来
          const res = await Reflect.apply(target, thisArg, args)
          // 如果没问题就直接返回了
          if (errorCheck(res) === true) {
            return res
          }
          // 否则抛出异常以进行下一次重试
          throw res
        } catch (error) {
          err = error
        }
      }
      throw err
    },
  })
}