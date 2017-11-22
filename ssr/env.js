/**
 * client server ssr 三个平台环境变量
 */
var ENV = {
    /**
     * 外部地址
     */
    api: {
        development: "https://sitxcsc.yatang.com.cn/api/sc",
        production: "https://uat-xcscm.yatang.com.cn/api/sc",
        test: "https://xcscm.yatang.com.cn/api/sc"
    },
    /**
     * 项目域名
     */
    domain: "http://www.iting.top"
}

exports.default = ENV;