# heroku-pinger

A simple ping scheduler to prevent free Heroku apps from going to sleep when they shouldn't.

Heroku dynos will fall asleep every 30 minutes if there is no activity on an application. The issue is that interaction via WebSockets is not considered "activity". This means that apps relying on WebSockets (such as real-time HTML5 multiplayer games), will fall asleep unless somebody new joins, or refreshes the page (who wants to reset their game?). Of course, this isn't relevant for any big projects in production, but it's really useful when you want to show off your flashy new prototype to your friends.

### Wait, isn't this just a normal pinger?! I can just use setInterval...

Heroku-pinger DOES NOT simply ping your Heroku app every 29 minutes, instead, you call a method, `.schedulePing()`, which will set a timer to ping your app (default is 29 minutes). This way, your app will still be able to fall asleep (thus conserving your free hours) when there is no activity.

## Usage

#### Installation

`npm install --save heroku-pinger`

#### Parameters, Method(s), and Option(s)

```js
const pinger = require('heroku-pinger')(url, options);
```
`pinger.schedulePing()` - Schedule a ping.

`options.cooldown` - Specify the ping delay after `.schedulePing()` is called, in milliseconds. Defaults to 29 minutes.

#### Terse example

```js
// Other dependecies, eg express, etc.
const SITE_URL = "https://yourapp.herokuapp.com";
const herokuPinger = require('heroku-pinger');
const pinger = herokuPinger(SITE_URL);
const io = require('socket.io')(server);

// App routing, etc.

io.on('connection', (socket) => {
  socket.on('chat message', function(data) {
    socket.broadcast.emit('chat message', data);
    pinger.schedulePing();
  });
});

```

## Disclaimer
Neither this project nor the project's creator are associated with Heroku. 

If you have any criticisms, questions, suggestions, or simply want to talk, you can email me at pscott@zeptohost.com
