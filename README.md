# Vue Action Cable
A simple Vue.js wrapper for Rails Action Cable.
### Installation
```
npm install vue-action-cable
```
Then use it in Vue.js:
```
import VueActionCable from 'vue-action-cable'

Vue.use(VueActionCable, {
    connectionUrl: 'wss://www.your-app.de/cable'
})
```
You might want to use something like `process.env.ACTION_CABLE_URL` as `connectionUrl` in order to satisfy development and production environments.

### Usage
This package simply exposes `$cable` on your Vue instance which is nothing other than a wrapper on Rails Action Cable's `createConsumer` method. Use it something like this:
```
mounted () {
    // This ensures a single web socket connection. Call it in every component that wants to use Action Cable.
    this.websocket = this.$cable.useGlobalConnection()

    // Or with an auth token: Calls your connectionUrl with a token GET-param, e.g. 'wss://www.your-app.de/cable?token=1290e42e42e5e1d68220d8de66092e75'
    const token = this.$auth.getToken('local').replace('Bearer ', '')
    this.websocket = this.$cable.useGlobalConnection(token)
}
```
And then access Action Cable's methods like so:
```
this.subscription = this.websocket.subscriptions.create({ channel: 'AppearancesChannel', user_id: this.user.id }, {
    connected: () => console.log('Connected to AppearancesChannel for user #' +  this.user.id),
    received: (data) => {
        const message = JSON.parse(data)
        this.user.is_online = message
    }
})
// or directly like so as 'useGlobalConnection() only returns $cable.connection':
this.subscription = this.$cable.connection.subscriptions.create(...
```
Don't forget to cleanup to avoid duplicate subscriptions and angry users:
```
destroyed () {
    if (this.subscription) {
        this.subscription.unsubscribe()
    }
}
```

### Manual Connection
If you want to use multiple websocket connections on the same page, simply call the connect method yourself:
```
this.websocket = this.$cable.connect()

// or with an auth token
this.$cable.connect('1290e42e42e5e1d68220d8de66092e75')
```

### Close Websocket Connection
```
// Global existing connection
this.websocket = this.$cable.useGlobalConnection()
this.$cable.disconnect()

// Manually created ones
this.websocket = this.$cable.connect()
this.websocket.disconnect()
```