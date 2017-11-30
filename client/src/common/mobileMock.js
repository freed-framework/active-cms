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
}
