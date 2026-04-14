import requestIdModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [requestIdModule],
  requestId: {
    headerName: 'x-trace-id',
    stateKey: 'traceId',
  },
})
