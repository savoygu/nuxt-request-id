<script setup lang="ts">
import { useState } from '#app'
import { useRequestId } from '../../../../src/runtime/composables/request-id'

const requestId = useRequestId()
const traceIdState = useState<string>('traceId')
</script>

<template>
  <main>
    <p id="request-id">
      {{ requestId }}
    </p>
    <p id="trace-id-state">
      {{ traceIdState }}
    </p>
  </main>
</template>
