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
