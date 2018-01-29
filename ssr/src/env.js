const nodeENV = process.env.NODE_ENV || 'development';
/**
 * client server ssr 三个平台环境变量
 */

const apiMap = {
    development: "http://uat-xcscm.yatang.com.cn/api/sc",
    production: "https://xcscm.yatang.com.cn/api/sc",
    test: "http://uat-xcscm.yatang.com.cn/api/sc"
}

const publishMap = {
    development: "http://sit.db.com/html/",
    production: "http://xcrapp.yatang.com.cn/sc/html/",
    test: "http://sit.db.com/html/"
}

const domain = {
    development: "http://wuget.yatang.com.cn",
    production: "http://wuget-uat.yatang.com.cn",
    test: "http://wuget-sit.yatang.com.cn"
}

const ENV = {
    /**
     * 外部地址
     */
    api: apiMap[nodeENV],

    /**
     * 项目域名
     */
    domain: domain[nodeENV],

    /**
     * zip包地址
     */
    publicPath: publishMap[nodeENV]
}

export default ENV;