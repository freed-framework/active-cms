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

export const getStyle = (ele) => {
    let style = null;

    if (window.getComputedStyle) {
        style = window.getComputedStyle(ele, null);
    } else {
        style = ele.currentStyle;
    }

    return style;
}

/**
 * 获取token
 */
export const getToken = () => {
    const token = localStorage.getItem('access_token');

    return `bearer ${token}`;
}