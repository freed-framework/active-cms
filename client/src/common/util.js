/**
 * @file util.js
 * @author denglingbo
 *
 * 工具类
 */

/**
 * 将 px 转换为 rem
 * @param {string} px
 * @param {number} rootFontSize
 */
export const px2rem = (px, rootFontSize = 100) => (
    px.replace(/(\d+)px/gi, (match, word) => (
        `${Number(word) / rootFontSize}rem`
    ))
)

/**
 * 直接将数字(string number)转换为 rem
 * @param px
 * @param rootFontSize
 */
export const num2rem = (px, rootFontSize = 100) => (
    px.toString().replace(/(\d+)$/gi, (match, word) => (
        `${Number(word) / rootFontSize}rem`
    ))
)
