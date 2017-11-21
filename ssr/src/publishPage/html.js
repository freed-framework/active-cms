import * as React from 'react';

class Html extends React.Component {
  render() {
    const extraProps = this.props.props;
    return (
      <html>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" />
        {/* <title>{extraProps.title}</title>
        <meta name="description" content={extraProps.description} />
        <meta name="keywords" content={extraProps.keywords.join(',')} />
        <meta name="author" content={extraProps.author} /> */}
        {/* {
          extraProps.metas.map((m) => {
            let $meta;
            switch (m.name) {
              case 'name':
                    $meta = <meta name={m.type} content={m.content} key={m.type+m.content} />;
                    break;
              case 'http-equiv':
                $meta = <meta httpEquiv={m.type} content={m.content} key={m.type+m.content} />;
                break;
              case 'itemprop':
                $meta = <meta itemprop={m.type} content={m.content} key={m.type+m.content} />;
                break;
            }
            return $meta
          })
        } */}
        {/* {
          extraProps.links.map((l) => {
            return (<link rel="stylesheet" href={l.href} key={l.href} />)
          })
        } */}
        <style dangerouslySetInnerHTML={{__html: this.props.style}} ></style>
      </head>
      <body>
        <div id="topicRoot" dangerouslySetInnerHTML={{__html: this.props.body}} />
        <script dangerouslySetInnerHTML={{__html: this.props.script}}></script>
      </body>
      </html>
    );
  }
}

export default Html;
