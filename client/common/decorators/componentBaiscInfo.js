/**
 * @file componentBaiscInfo.js
 * @author denglingbo
 *
 */
import utils from '../util/util';

export default (name) => {
    return (target, key, descriptor) => {
        // 添加一个 组件 ID
        target.cid = utils.guid();

        target.type = name;
    }
}
