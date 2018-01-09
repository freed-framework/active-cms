const nodeENV = process.env.NODE_ENV || 'development';

/**
 * client server ssr 三个平台环境变量
 */
const apiMap = {
    development: "http://sitxcsc.yatang.com.cn/api/sc",
    production: "https://xcscm.yatang.com.cn/api/sc",
    test: "http://xcscm.yatang.com.cn/api/sc"
}

const publishMap = {
    development: "http://sit.db.com/html/",
    production: "http://xcrapp.yatang.com.cn/sc/html/",
    test: "http://sit.db.com/html/"
}

var ENV = {
    /**
     * 外部地址
     */
    api: apiMap[nodeENV],
    /**
     * 项目域名
     */
    domain: nodeENV === 'production' ? 'http://wuget.yatang.com.cn' : 'http://www.iting.top',
    // domain: "http://localhost:12345"
    /**
     * zip包地址
     */
    publicPath: publishMap[nodeENV]
}

export default ENV;
