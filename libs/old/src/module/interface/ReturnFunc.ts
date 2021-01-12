/**
 * 不关心参数的函数类型
 * @typeparam R 函数的返回值类型
 */
export type ReturnFunc<R> = (...args: any[]) => R
