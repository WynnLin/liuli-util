/**
 * 阻塞主线程指定时间
 * 注: 和 {@link wait} 不同，该函数会真的阻塞住主线程，即这段时间内其他的代码都无法执行，例如用户的点击事件！
 * @param {Number} time 阻塞毫秒数
 */
export function sleep (time) {
  const start = performance.now()
  while (performance.now() - start <= time) {}
}