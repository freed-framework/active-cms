
var React = require("react");

var fs = require('fs');

var View = require('../viewer/App').default;

var ReactDOMServer = require('react-dom/server');

// var style = fs.readFileSync('../client/ssr/assets/' + main[1], 'utf-8');

// var script = fs.readFileSync('../client/ssr/assets/' + main[0], 'utf-8');
var main = require('./assets/stats.generated.json').assetsByChunkName.main;
// var View = require('./assets/' + main[0]).default;
// console.log(View)
module.exports = function (req, main) {
    var data = [{"name":"floor","guid":"ddddds11-1ead-43ae-b6de-e6debb958b08","style":{"layout": {"height":100}}},{"name":"floor","guid":"237d6d2c-1034-4f76-a5c8-6678b9a3cb78","style":{"height":60}}]
    var html = ReactDOMServer.renderToString(<View pageData={data} />);
    return ReactDOMServer.renderToString(
        <html>
            <head>
                <meta charset="utf-8" />
                <link id="server-side-style" href={"assets/" + main[1]} rel="stylesheet" type="text/css" />
                {/* <style type="text/css">
                    {`${style}`}
                </style> */}
            </head>
            <body>
                <div id="content" dangerouslySetInnerHTML={{ __html: html }} />
                {/* <script dangerouslySetInnerHTML={{ __html: `${script}` }} /> */}
                <script src={'./assets/73a94358e809703b8de8.js'}></script>
            </body>
        </html>
    );
}