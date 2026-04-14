<script setup lang="ts">
import { useState } from '#app'
import { useRequestId } from '../../../../src/runtime/composables/request-id'

const requestId = useRequestId()
const requestIdState = useState<string>('requestId')
</script>

<template>
  <main>
    <p id="request-id">
      {{ requestId }}
    </p>
    <p id="request-id-state">
      {{ requestIdState }}
    </p>
  </main>
</template>
