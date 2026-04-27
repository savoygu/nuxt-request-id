import crypto from 'node:crypto'
import { defineEventHandler, setResponseHeader } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler((event) => {
  const { headerName } = useRuntimeConfig(event).public.requestId

  const requestId = crypto.randomUUID()

  // Store on request context so server handlers and app runtime can read it.
  event.context.requestId = requestId

  // Expose the same value in response headers for tracing.
  setResponseHeader(event, headerName, requestId)
})
