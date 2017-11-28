/**
 * @file mobileCalc.js
 * @author denglingbo
 * 适用于移动端
 */

const docEl = document.documentElement;
const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
let rate;

/**
 * 是否指定宽度
 * @param width
 */
const calc = (width) => {
    const clientWidth = width || docEl.clientWidth;

    if (!clientWidth) {
        return;
    }

    rate = 100 * (clientWidth / 750);
    docEl.style.fontSize = `${rate}px`;
};

export {
    calc,
    resizeEvt,
}
