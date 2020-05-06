import Cable from './cable'

const VueActionCable = {
    /**
     * ActionCableVue entry point
     * @param Vue
     * @param {string} options.connectionUrl - ActionCable server websocket URL
     */
    install(Vue, options) {
        new Cable(Vue, options)
    },
}

export default VueActionCable
