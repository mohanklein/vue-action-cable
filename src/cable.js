import { createConsumer } from "@rails/actioncable"

export default class Cable {
    _connectionUrl = null
    connection = null

    constructor (Vue, options) {
        Vue.prototype.$cable = this
        this.setConnectionUrl(options.connectionUrl)
    }

    connect (token=null) {
        let paramString = ''

        if (token) {
            paramString = '?token=' + token
        }

        return createConsumer(this._connectionUrl + paramString)
    }

    useGlobalConnection (token=null) {
        if (!this.connection) {
            this.connection = this.connect(token)
        }

        return this.connection
    }

    disconnect () {
        if (this.connection) {
            this.connection.disconnect()
            this.connection = null
        }
    }

    setConnectionUrl (url) {
        this._connectionUrl = url
    }
}
