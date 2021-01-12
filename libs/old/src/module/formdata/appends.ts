import { toString } from '../string/toString'

/**
 * FormData 批量添加方法
 * 注：该方法不会覆盖掉原本的属性
 * @param fd FormData 对象
 * @param obj 键值对对象
 * @returns 添加完成后的 FormData 对象
 */
export function appends(
  fd: FormData,
  obj: Record<string, string | Blob | any>,
): FormData {
  for (const k in obj) {
    const v = obj[k]
    fd.append(k, toString(v))
  }
  return fd
}
