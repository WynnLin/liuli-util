import { ArrayCallback } from '../interface/ArrayCallback';
/**
 * 数组之间的差异结果对象结构接口
 * left 第一个数组独有的元素列表
 * right 第二个数组独有的元素列表
 * common 两个数组共有的元素列表。注意: 这里的元素实质上是从第一个集合获取的
 */
interface IArrayDiff<L, R> {
    left: L[];
    right: R[];
    common: L[];
}
/**
 * 比较两个数组的差异
 * @param left 第一个数组
 * @param right 第二个数组
 * @param kFn 每个元素的唯一标识产生函数
 * @returns 比较的差异结果
 */
export declare function arrayDiffBy<L, R>(left: L[], right: R[], kFn?: ArrayCallback<L | R, any>): IArrayDiff<L, R>;
export {};
//# sourceMappingURL=arrayDiffBy.d.ts.map