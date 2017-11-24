const data = "NobwRA5grglgJmAXGApgYwLQFsD2coA2KGA7AIwBsJATAIYAMArBmQCwkUbutwYCctEpgDMfEsJLl6DeggA0YAHa0sKJGAK0AnigBOYBbQAuR3QGck4M0a1FLG7TihH7AI1poA1hF1PFcAGEcAhx9ZF0IdwAKMkYyOQACNniE6npqRLIASjAAX3zcuXBoeHV0bDxCYldXADM4OEZa5j5Xdi56Vv5aFGJhRmF6WrFqOFc+egMlFTVkTR19QxNze2tbWfB5pxdEcHcvHz9A4ND1COjGPkTGVkSADhJMnILC4tgEZHLcfCIMGuE0BQUBQ+KQUK5qB1KBg7rUaBgmrRXBQyOCKPU0FNlKp1PM9FNjKYLLswGs7CSts43B5vL4oP4giEwmBzrQoow7tcKIkKNyks8CkVIO8yphvlUYWQaigSOkMNRqICuGgyCR+LLMCg+KMxGNaHBWNQsTNcdp8UsiasbOTNo4qST9rSjozTuFImyUVz7sInlNXKE4HoAOrwIwACyQZHoCgA7qGI8g8oK3qVPmLKr96GhXPRhO5XJK0LxWBNmG1XHcMCC0sJaLRRNQyHxjTi5mbFmBCSsSWSNg4tNtqQc6QyTszWVESFcEjdEmkUtkpnG4OH1En8kKSh9UOmfsQbqwKHdWmrWGxhFxWGhMHc0CRK/U7gC2qw2mg1ApsbN++bO8tiVY1p9pSOx7DShz0scTJnO6MSMPc1wLgKG4ptuXwZtUwggtmZCYMMAJcGQT78Ggdy0BgBqXCg/S1BQjTNp+JptgsBL/la6z2CBQ5OpBLrjrBrDRgk/SJLKvovJuIpphUe4sGg9S4WQtSkPQFAFuwaDMLQQIFuivJ5nAT4UKwjAtt+eIdl2AGkkBnF2qBYCOhBo7QW60QcKJC7pOJybCqmO4yRKHIDHc9AoJWriNGQXAGspfA3AWwi9IwKDSCgjCdBQZmmixFrdoBHEUvZ3HOVBrosrBsTTrEPpJA8PkoX5aG7hKJCsHcozUHw0U0I2XDdWqrjpZCCoUHeQKGiQtAMdMrY/pZbE9rZRUDvaYHDs6Y4wdElDwUkHJzvQSHrq8TWioFvzvhycD9JCkgoORV53JwdwVspakeEwCooLUWHZcxv5WexNr9oODrgSOZX8TtjaZPQQkKrVi4Sah53ir8DQoGQ+rxX83WcK+jDkTmyIYLW6SsNRWHpJijFzRZrGWkthW2qtDlOZDfHbWyT7XJyqT0I8/InZJ/nobJd73rIjDMNQQjMOwdzRbeRMsFNfB3OFdQoI2/3zYz+U2SzoNrY5EOba5FU7d5CRTnObANbkAC6QA==="

'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _viewer = require('../../../client/src/pages/viewer');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_ExecutionEnvironment.canUseDOM) {
  _reactDom2.default.render(_react2.default.createElement(_viewer2.default, { data: data }), document.getElementById('topicRoot'), function () {
    console.log('ReactDOM.render');
  });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;