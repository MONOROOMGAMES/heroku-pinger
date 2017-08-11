const http = require('http');

function herokuPinger(url, options) {
  options = options || {};
  options.cooldown = options.cooldown || 29 * 1000 * 60;
  let pingScheduled;

  setInterval( () => {
    if (pingScheduled) {
      http.get(url);
      pingScheduled = false;
    }
  }, options.cooldown);

  let obj = {
    schedulePing: () => { pingScheduled = true; }
  }

  return obj;
};

module.exports = herokuPinger;
