/**
 * @file index.js
 * @author shijh
 * 
 * 工具方法
 */


 /**
  * 获取元素位置
  * element {Element} 目标元素
  */
export const getRect = (element) => {
    const rect = element.getBoundingClientRect();
    const { clientTop, clientLeft } = document.documentElement;

    return {
        top: rect.top - clientTop,
        bottom: rect.bottom - clientTop,
        left: rect.left - clientLeft,
        right: rect.right - clientLeft
    }

}