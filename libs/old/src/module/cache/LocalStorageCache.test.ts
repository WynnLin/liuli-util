import { LocalStorageCache } from './LocalStorageCache'
import { wait } from '../async/wait'
import { repeatedCall } from '../function/repeatedCall'
import { sleep } from '../function/sleep'

/**
 * @test {LocalStorageCache}
 */
describe.skip('test LocalStorageCache', () => {
  beforeEach(async () => {
    await new LocalStorageCache().clearExpired()
  })
  it('simple example', () => {
    const cache = new LocalStorageCache()
    const k = '1'
    const v1 = '1'
    const v2 = '2'
    cache.add(k, v1)
    expect(cache.get(k)).toBe(v1)
    // 如果已经存在则无效
    cache.add(k, v2)
    expect(cache.get(k)).toBe(v1)
    expect(cache.touch(k)).toBe(v1)
    // 可以使用 set 强制覆盖
    cache.set(k, v2)
    expect(cache.get(k)).toBe(v2)
    cache.del(k)
    expect(cache.get(k)).toBe(null)
  })
  it('test timeout', async () => {
    const cache = new LocalStorageCache()
    const k = '1'
    const v1 = '1'
    // @ts-ignore
    cache.add(k, v1, 10)
    expect(cache.get(k)).toBe(v1)
    await wait(20)
    expect(cache.get(k)).toBe(null)
    // @ts-ignore
    cache.add(k, v1, 10)
    await wait(20)
    expect(cache.touch(k)).toBe(null)
  })
  it('test touch', async () => {
    const cache = new LocalStorageCache()
    const k = '1'
    const v1 = '1'
    // @ts-ignore
    cache.add(k, v1, 10)
    await repeatedCall(4, async () => {
      await wait(5)
      expect(cache.touch(k)).toBe(v1)
    })
    expect(cache.touch(k)).toBe(v1)
  })
  it('test global default CacheOption', async () => {
    const cache = new LocalStorageCache({
      timeout: 50,
    })
    const k = '1'
    const v1 = '1'
    cache.add(k, v1)
    expect(cache.get(k)).toBe(v1)
    await wait(100)
    expect(cache.get(k)).toBeNull()
  })
  it.skip('test use set CacheOption override global default CacheOption', async () => {
    // @ts-ignore
    const cache = new LocalStorageCache({
      timeout: 10,
    })
    const k = '1'
    const v1 = '1'
    cache.add(k, v1, Number.MAX_SAFE_INTEGER)
    expect(cache.get(k)).toBe(v1)
    await wait(20)
    expect(cache.get(k)).toBe(v1)
  })
  it.skip('test auto clear expired', async () => {
    const cache = new LocalStorageCache()
    cache.set('1', 1, 50)
    cache.set('2', 1, 50)
    await wait(50)
    // 即便过了超时时间只要没有调用 get 依然存在于缓存中
    expect(window.localStorage.getItem('1')).not.toBeNull()
    expect(window.localStorage.getItem('2')).not.toBeNull()
    // tslint:disable-next-line:no-unused-expression
    new LocalStorageCache()
    await wait(10)
    // 然而现在获取不到了
    expect(window.localStorage.getItem('1')).toBeNull()
    expect(window.localStorage.getItem('2')).toBeNull()
  })
  it.skip('test auto clear expired for sleep', async () => {
    const cache = new LocalStorageCache()
    // @ts-ignore
    cache.set('1', 1, 10)
    // @ts-ignore
    cache.set('2', 1, 10)
    await wait(10)
    // 即便过了超时时间只要没有调用 get 依然存在于缓存中
    expect(window.localStorage.getItem('1')).not.toBeNull()
    expect(window.localStorage.getItem('2')).not.toBeNull()
    // tslint:disable-next-line:no-unused-expression
    new LocalStorageCache()
    sleep(10)
    // 然而现在还能获取到，因为 sleep 阻塞了主线程，使得构造函数中的清理过期缓存函数 clearExpired 没有机会运行（异步）
    expect(window.localStorage.getItem('1')).not.toBeNull()
    expect(window.localStorage.getItem('2')).not.toBeNull()
  })

  describe('test error', () => {
    it.skip('get error cache', () => {
      const cache = new LocalStorageCache()
      const k = '1'
      const v1 = ''
      localStorage.setItem(k, v1)
      expect(cache.get(k)).toBeNull()
      expect(localStorage.getItem(k)).toBe(v1)
      // 注意，如果可以被反序列化但不能使用 deserialize 进一步解析到真实值将会被删除而非直接返回 null
      const v2 =
        '{"key":"1","val":"{\\"name\\":\\"rx\\",\\"age\\":17a}","cacheOption":{"timeStart":1566119994195,"timeout":"TimeoutInfinite"}}'
      localStorage.setItem(k, v2)
      expect(cache.get(k)).toBeNull()
      // 注意观察这里获取到的值
      expect(localStorage.getItem(k)).toBeNull()
    })
    it.skip('touch error cache', () => {
      const cache = new LocalStorageCache()
      const k = '1'
      const v1 = ''
      localStorage.setItem(k, v1)
      expect(cache.touch(k)).toBeNull()
      expect(localStorage.getItem(k)).toBe(v1)
      const v2 =
        '{"key":"1","val":"{\\"name\\":\\"rx\\",\\"age\\":17a}","cacheOption":{"timeStart":1566119994195,"timeout":"TimeoutInfinite"}}'
      localStorage.setItem(k, v2)
      expect(cache.touch(k)).toBeNull()
      expect(localStorage.getItem(k)).toBeNull()
    })
  })
})
