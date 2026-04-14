import crypto from 'node:crypto'
import { defineEventHandler, setResponseHeader } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler((event) => {
  const { headerName } = useRuntimeConfig(event).public.requestId

  const requestId = crypto.randomUUID()

  // Store in request context for access in composables
  event.context.requestId = requestId

  // Set response header
  setResponseHeader(event, headerName, requestId)
})
