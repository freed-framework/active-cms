/**
 * @file mobileCalc.js
 * @author denglingbo
 * 适用于移动端
 */
const docEl = document.documentElement;
const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
let rate;

const win = window;
const antdFlex = (baseFontSize, fontscale) => {
    const _baseFontSize = baseFontSize || 100;
    const _fontscale = fontscale || 1;

    const doc = win.document;
    const ua = navigator.userAgent;
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
    const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    let dpr = win.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
        dpr = 1;
    }
    const scale = 1 / dpr;

    let metaEl = doc.querySelector('meta[name="viewport"]');
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        doc.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
    doc.documentElement.style.fontSize = `${_baseFontSize / 2 * dpr * _fontscale}px`;
}

// const calc2 = (baseFontSize) => {
//     const width = baseFontSize * 7.5;
//     const clientWidth = width || docEl.clientWidth;
    
//     if (!clientWidth) {
//         return;
//     }
    
//     rate = 100 * (clientWidth / 750);
    
//     docEl.style.fontSize = `${rate}px`;
// }

/**
 * 是否指定宽度
 * @param width
 */
const calc = (baseFontSize, fontscale) => {
    // calc2(100);
    antdFlex(baseFontSize, fontscale);
};

/**
 * <START> cordova mock
 */
setTimeout(function() {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('deviceready', true, true);
    document.dispatchEvent(evt);
}, 100);

window.YTNavigation = {
    redirect: function (url, options) {
        console.log(url);
        // window.location.href = `/${url}`;
    },
};
/**
 * <END> cordova mock
 */

export {
    calc,
    resizeEvt,
    antdFlex,
}
