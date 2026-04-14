import { useRequestEvent, useState, useRuntimeConfig } from '#app'

export function useRequestId() {
  const { stateKey } = useRuntimeConfig().public.requestId
  return useState<string>(stateKey, () => useRequestEvent()?.context?.requestId)
}
