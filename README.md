# heroku-pinger
A simple ping scheduler to prevent free Heroku apps from going to sleep when they shouldn't.

Heroku dynos will fall asleep every 30 minutes if there is no activity on an application. The issue is that interaction via WebSockets is not considered "activity". This means that apps relying on WebSockets (such as real-time HTML5 multiplayer games), will fall asleep unless somebody new joins, or refreshes the page (who wants to reset their game?). Of course, this isn't relevant for any big projects in production, but it's really useful when you want to show off your flashy new prototype to your friends.

Heroku-pinger DOES NOT simply ping your Heroku app every 29 minutes, instead, you call a method, `.schedulePing()`, which will set a timer to ping your app in 29 minutes. This way, your app will still be able to fall asleep (thus conserving your free hours) when there is no activity on the app.

### Usage

#### Installation
`npm install --save heroku-pinger`

#### Parameters, Method(s), and Option(s)
```js
herokuPinger(url, options)
```
`pinger.schedulePing()` - Schedule a ping
`options.cooldown` - Specify the ping delay after `.schedulePing()` is called, in milliseconds

### Disclaimer
Neither the creator nor this project is associated with Heroku. 

If you have any criticisms, questions, suggtions, or simply want to talk, you can email me at pscott@zeptohost.com
