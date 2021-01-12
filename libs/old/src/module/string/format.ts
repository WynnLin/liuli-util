import { toString } from '../string/toString'

/**
 * 字符串格式化
 *
 * @param str 要进行格式化的值
 * @param args 格式化参数值，替换字符串中的 {} 的值
 * @returns 替换完成的字符串
 * @deprecated 已废弃，请使用 ES6 模板字符串 {@url(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)}
 */
export function format(str: string, args: Record<string, any>): string {
  return Object.keys(args).reduce(
    (res, k) => res.replace(new RegExp(`{${k}}`, 'g'), toString(args[k])),
    str,
  )
}
