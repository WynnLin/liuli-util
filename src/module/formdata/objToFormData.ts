import { toString } from '../obj/toString'

/**
 * 将参数对象转换为 FormData，只转换一层
 * @param data 参数对象
 * @return {FormData} 转换后的表单对象
 */
export function objToFormData(
  data: Record<string, string | Blob | any>,
): FormData {
  const fd = new FormData()
  for (const k in data) {
    const v = data[k]
    fd.append(k, toString(v))
  }
  return fd
}
