/**
 * 将 url 中的内容加载到元素上
 * 注：domSelector 必须有 src 属性用以将加载完成的资源赋值给其，加载默认是异步的
 * @param {RequestInfo} url url 资源
 * @param {Element} domSelector dom 选择器
 * @param {Object} {init} 初始化参数, 实为 fetch() 的参数以及一些自定义的参数，默认 {}
 * 关于 fetch 具体可以参考 <https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch>
 */
async function loadResource (url, domSelector, init = {}) {
  const res = await fetch(url, init)
  const blob = await res.blob()
  // 生成一个本地的 url 并赋值给 src 属性
  domSelector.src = window.URL.createObjectURL(blob)
}

export default loadResource
