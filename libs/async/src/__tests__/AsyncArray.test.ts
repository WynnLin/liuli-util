import { AsyncArray } from '../AsyncArray'
import { wait } from '../wait'
import { countTime, Expect } from '@liuli-util/test'

describe('测试 AsyncArray', () => {
  async function testReduce(reduce: Function) {
    const res = await reduce(
      [1, 2, 3, 4],
      async (res: any, item: number) => res + item,
      0,
    )
    expect(res).toBe(10)
  }

  async function testMap(map: Function) {
    const res = await map([1, 2, 3, 4, 5], async (item: number) => item * 2)
    expect(res).toEqual([2, 4, 6, 8, 10])
  }

  async function testFilter(filter: Function) {
    const res = await filter(
      [1, 2, 3, 4, 5],
      async (item: number) => item % 2 === 0,
    )
    expect(res).toEqual([2, 4])
  }

  async function testForEach(forEach: Function) {
    const fn = jest.fn(async (item: number) => {
      console.log(item)
    })
    await forEach([1, 2, 3, 4, 5], fn)
    expect(fn.mock.calls.length).toBe(5)
  }

  async function testParallelTime(
    fn: (arr: any[], fn: (...args: any[]) => Promise<any>) => Promise<any>,
  ) {
    const num = 5
    const time = 100
    expect(
      await countTime(() => fn(Array(num).fill(0), () => wait(time))),
    ).toBeLessThanOrEqual(num * time)
  }

  describe('测试 AsyncArray', () => {
    it('测试 reduce', async () => {
      await testReduce(AsyncArray.reduce)
    })
    it('测试 map', async () => {
      await testMap(AsyncArray.map)
      await testParallelTime(AsyncArray.map)
    })
    it('测试 filter', async () => {
      await testFilter(AsyncArray.filter)
      await testParallelTime(AsyncArray.filter)
    })
    it('测试 forEach', async () => {
      await testForEach(AsyncArray.forEach)
      await testParallelTime(AsyncArray.forEach)
    })
  })
  describe('测试 AsyncArray', () => {
    it('基本示例', async () => {
      const res = await new AsyncArray([1, 2, 3, 4, 5])
        .filter(async (i) => i % 2 === 0)
        .map(async (i) => i * 2)
        .map(async (i) => i.toString())
      expect(res as Expect<typeof res, string[]>).toEqual(['4', '8'])
    })
    it('测试串行并行转换', async () => {
      const fn = jest.fn(async (i: number) => {
        //模拟不同的异步操作时间不同
        const num = Math.floor(Math.random() * 100)
        await wait(num)
        return i % 2 === 0
      })
      const res = await new AsyncArray(Array(10).fill(0))
        .map(async (_, i) => i)
        .filter(fn)
      expect(res.every((i) => i % 2 === 0)).toBe(true)
    })
  })
})
