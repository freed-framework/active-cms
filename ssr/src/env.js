/**
 * client server ssr 三个平台环境变量
 */
const ENV = {
    /**
     * 外部地址
     */
    api: {
        development: "http://sitxcsc.yatang.com.cn/api/sc",
        production: "http://uat-xcscm.yatang.com.cn/api/sc",
        test: "http://xcscm.yatang.com.cn/api/sc"
    },
    /**
     * 项目域名
     */
    domain: "http://wuget.yatang.com.cn",
    /**
     * zip包地址
     */
    publicPath: {
        development: "http://sit.db.com/html/",
        production: "http://xcrapp.yatang.com.cn/html/",
        test: "http://sit.db.com/html/"
    }
}

export default ENV;