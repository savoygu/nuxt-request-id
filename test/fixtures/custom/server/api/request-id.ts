import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  return {
    requestId: event.context.requestId,
  }
})
