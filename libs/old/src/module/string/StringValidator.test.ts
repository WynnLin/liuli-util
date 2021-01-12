import { StringValidator } from './StringValidator'

/**
 * @test {stringValidator}
 */
describe('test stringValidator', () => {
  const {
    isBlank,
    isEmpty,
    isFloat,
    isInteger,
    isEmail,
    isIpv4,
    isTelephone,
    isMobile,
    isDomain,
    isPostcode,
    isPort,
  } = StringValidator
  it('test isBlank', () => {
    expect(isBlank(null)).toBeTrue()
    expect(isBlank(undefined)).toBeTrue()
    expect(isBlank('')).toBeTrue()
    expect(isBlank(' ')).toBeTrue()
    expect(isBlank('a')).toBeFalse()
  })
  it('test isEmpty', () => {
    expect(isEmpty(null)).toBeTrue()
    expect(isEmpty(undefined)).toBeTrue()
    expect(isEmpty('')).toBeTrue()
    expect(isEmpty(' ')).toBeFalse()
    expect(isEmpty('a')).toBeFalse()
  })
  it('test isFloat', () => {
    expect(isFloat('5')).toBeTrue()
    expect(isFloat('5.6')).toBeTrue()
    expect(isFloat('5.a')).toBeFalse()
  })
  it('test isInteger', () => {
    expect(isInteger('7')).toBeTrue()
    expect(isInteger('7.5')).toBeFalse()
    expect(isInteger('7.a')).toBeFalse()
  })
  it('test isEmail', () => {
    expect(isEmail('rx@liuli.com')).toBeTrue()
    expect(isEmail('@liuli.com')).toBeFalse()
    expect(isEmail(null)).toBeFalse()
  })
  it('test isIpv4', () => {
    expect(isIpv4('127.0.0.1')).toBeTrue()
    expect(isIpv4('127.0.0.266')).toBeFalse()
    expect(isIpv4('127.0.0')).toBeFalse()
    expect(isIpv4('')).toBeFalse()
    expect(isIpv4(null)).toBeFalse()
  })
  it('test isTelephone', () => {
    expect(isTelephone('010-88888888')).toBeTrue()
    expect(isTelephone('101-5574021')).toBeFalse()
    expect(isTelephone('88888888')).toBeFalse()
    expect(isTelephone('')).toBeFalse()
    expect(isTelephone(null)).toBeFalse()
  })
  it('test isMobile', () => {
    expect(isMobile('13532611510')).toBeTrue()
    expect(isMobile('22345678910')).toBeFalse()
    expect(isMobile('')).toBeFalse()
    expect(isMobile(null)).toBeFalse()
  })
  it('test isDomain', () => {
    expect(isDomain('rxliuli.com')).toBeTrue()
    expect(isDomain('blog.rxliuli.com')).toBeTrue()
    expect(isDomain('rxliuli')).toBeFalse()
    expect(isDomain('')).toBeFalse()
    expect(isDomain(null)).toBeFalse()
  })
  it('test isPostcode', () => {
    expect(isPostcode('510000')).toBeTrue()
    expect(isPostcode('011231')).toBeTrue()
    expect(isPostcode('12345')).toBeFalse()
    expect(isPostcode('')).toBeFalse()
    expect(isPostcode(null)).toBeFalse()
  })
  it('test isPort', () => {
    expect(isPort('22')).toBeTrue()
    expect(isPort('8080')).toBeTrue()
    expect(isPort('70000')).toBeFalse()
    expect(isPort('')).toBeFalse()
    expect(isPort(null)).toBeFalse()
  })
})
describe('测试 StringValidator2', () => {
  const {
    isBlank,
    isEmpty,
    isFloat,
    isInteger,
    isEmail,
    isIpv4,
    isTelephone,
    isMobile,
    isDomain,
    isPostcode,
    isPort,
  } = StringValidator
  function testEmptyOrBlank(fn: typeof isBlank | typeof isEmpty) {
    expect(fn('')).toBeTrue()
    expect(fn(' ')).toBeTrue()
    expect(fn('a')).toBeFalse()
  }

  it('test isBlank', () => {
    testEmptyOrBlank(isBlank)
  })
  it('test isEmpty', () => {
    testEmptyOrBlank(isBlank)
  })
  it('test isFloat', () => {
    expect(isFloat('5')).toBeTrue()
    expect(isFloat('5.6')).toBeTrue()
    expect(isFloat('5.a')).toBeFalse()
  })
  it('test isInteger', () => {
    expect(isInteger('7')).toBeTrue()
    expect(isInteger('7.5')).toBeFalse()
    expect(isInteger('7.a')).toBeFalse()
  })
  it('test isEmail', () => {
    expect(isEmail('rx@liuli.com')).toBeTrue()
    expect(isEmail('@liuli.com')).toBeFalse()
  })
  it('test isIpv4', () => {
    expect(isIpv4('127.0.0.1')).toBeTrue()
    expect(isIpv4('127.0.0.266')).toBeFalse()
    expect(isIpv4('127.0.0')).toBeFalse()
    expect(isIpv4('')).toBeFalse()
  })
  it('test isTelephone', () => {
    expect(isTelephone('010-88888888')).toBeTrue()
    expect(isTelephone('101-5574021')).toBeFalse()
    expect(isTelephone('88888888')).toBeFalse()
    expect(isTelephone('')).toBeFalse()
  })
  it('test isMobile', () => {
    expect(isMobile('13532611510')).toBeTrue()
    expect(isMobile('22345678910')).toBeFalse()
    expect(isMobile('')).toBeFalse()
  })
  it('test isDomain', () => {
    expect(isDomain('rxliuli.com')).toBeTrue()
    expect(isDomain('blog.rxliuli.com')).toBeTrue()
    expect(isDomain('rxliuli')).toBeFalse()
    expect(isDomain('')).toBeFalse()
  })
  it('test isPostcode', () => {
    expect(isPostcode('510000')).toBeTrue()
    expect(isPostcode('011231')).toBeTrue()
    expect(isPostcode('12345')).toBeFalse()
    expect(isPostcode('')).toBeFalse()
  })
  it('test isPort', () => {
    expect(isPort('22')).toBeTrue()
    expect(isPort('8080')).toBeTrue()
    expect(isPort('70000')).toBeFalse()
    expect(isPort('')).toBeFalse()
  })
})
