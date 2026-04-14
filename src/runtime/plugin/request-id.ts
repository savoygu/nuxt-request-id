import { defineNuxtPlugin, useHydration } from '#app'
import { useRequestId } from '../composables/request-id'

export default defineNuxtPlugin({
  name: 'requestId',
  enforce: 'pre',
  setup() {
    const requestId = useRequestId()
    useHydration('requestId', () => requestId.value, (data: string) => {
      requestId.value = data
    })
  },
})
