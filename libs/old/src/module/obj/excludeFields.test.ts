import { excludeFields } from './excludeFields'

/**
 * @test {excludeFields} 测试从对象中排除字段
 */
describe('test excludeFields', () => {
  const obj = {
    name: 'rx',
    age: 17,
  }
  it('test normal object and not exclude any field.', () => {
    expect(excludeFields(obj)).not.toBe(obj)
    expect(excludeFields(obj)).toEqual(obj)
  })

  it('test normal object and normal fields', () => {
    expect(excludeFields(obj, 'name')).toEqual({ age: 17 })
    expect(excludeFields(obj, 'name', 'age')).toEqual({})
  })
  it('test exclude Symbol', () => {
    const symbol = Symbol('name')
    const name = 'name'
    expect(
      excludeFields(
        {
          [symbol]: name,
          [name]: symbol,
        },
        symbol,
      ),
    ).toEqual({ [name]: symbol })
  })
})
