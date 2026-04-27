import { defineNuxtPlugin, useHydration } from '#app'
import { useRequestId } from '../composables/request-id'

export default defineNuxtPlugin({
  name: 'requestId',
  enforce: 'pre',
  setup() {
    // useRequestId can be safely used inside Nuxt plugins.
    const requestId = useRequestId()

    // Transfer SSR state to client so both sides keep the same request id.
    useHydration('requestId', () => requestId.value, (data: string) => {
      requestId.value = data
    })
  },
})
