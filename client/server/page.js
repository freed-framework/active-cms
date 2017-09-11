
var React = require("react");

var View = require('../viewer/App.jsx')

var ReactDOMServer = require('react-dom/server');

module.exports = function (req, scriptFilename) {
    var data = [{"name":"floor","guid":"ddddds11-1ead-43ae-b6de-e6debb958b08","style":{"layout": {"height":100}}},{"name":"floor","guid":"237d6d2c-1034-4f76-a5c8-6678b9a3cb78","style":{"height":60}}]
    var html = ReactDOMServer.renderToString(<View.default pageData={data} />);
    return ReactDOMServer.renderToString(
        <html>
            <head>
                <link id="server-side-style" href={"assets/" + scriptFilename[1]} rel="stylesheet" type="text/css" />
            </head>
            <body>
                <div id="content" dangerouslySetInnerHTML={{ __html: html }} />
                <script src={"assets/" + scriptFilename[0]}></script>
            </body>
        </html>
    );
}