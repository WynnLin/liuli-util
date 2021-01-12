/**
 * 提供者函数，用于生成任意值的函数
 * @typeparam R 返回结果类型
 * @returns 返回结果
 */
export type Supplier<R> = () => R
