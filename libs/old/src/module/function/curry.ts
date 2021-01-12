/**
 * 柯里化后返回的函数
 */
interface IRFunc extends Function {
  /**
   * 是否为柯里化函数，默认为 true 以标识柯里化函数
   */
  _curry: boolean
  /**
   * 剩余参数的长度
   */
  _length: number
  /**
   * 重写 toString 便于调试
   */
  toString: () => string
}

/**
 * 将函数包装为柯里化函数
 * 注: 该函数模仿了 Lodash 的 curry 函数
 * @param fn 需要包装的函数
 * @param  {...any} args 应用的部分参数
 * @returns 包装后的函数
 * @deprecated 由于之前的理解错误，该函数在下个大版本将会被废弃，请使用命名更合适的 {@link partial}
 */
export function curry(fn: Function, ...args: any[]): IRFunc {
  const realArgs = args.filter((arg) => arg !== curry._)
  // 如果函数参数足够则调用传入的函数
  if (realArgs.length >= fn.length) {
    return fn(...realArgs)
  }

  /**
   * 最终返回的函数
   * @param otherArgs 接受任意参数
   * @returns 返回一个函数，或者函数调用完成返回结果
   */
  function innerFn(...otherArgs: any[]): Function {
    // 记录需要移除补到前面的参数
    const removeIndexSet = new Set()
    let i = 0
    const newArgs = args.map((arg) => {
      if (
        arg !== curry._ ||
        otherArgs[i] === undefined ||
        otherArgs[i] === curry._
      ) {
        return arg
      }
      removeIndexSet.add(i)
      // 每次补偿前面的 curry._ 参数计数器 +1
      return otherArgs[i++]
    })
    const newOtherArgs = otherArgs.filter((_v, i) => !removeIndexSet.has(i))
    return curry(fn, ...newArgs, ...newOtherArgs)
  }
  // 定义柯里化函数的剩余参数长度，便于在其他地方进行部分参数应用
  // 注: 不使用 length 属性的原因是 length 属性
  innerFn._length = fn.length - args.filter((arg) => arg !== curry._).length
  // 自定义 toString 函数便于调试
  innerFn.toString = () =>
    `name: ${fn.name}, args: [${args.map((o) => o.toString()).join(', ')}]`
  innerFn._curry = true
  return innerFn
}

/**
 * 柯里化的占位符，需要应用后面的参数时使用
 * 例如 {@link curry(fn)(curry._, 1)} 意味着函数 fn 的第二个参数将被确定为 1
 */
curry._ = Symbol('_')
