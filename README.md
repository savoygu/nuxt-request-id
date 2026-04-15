# nuxt-request-id

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

English | [中文](./README.zh-CN.md)

> A Nuxt module that assigns a unique request ID to every request and keeps it available in server handlers, SSR, and hydration.

## Installation

```bash
npm install nuxt-request-id
# or
pnpm add nuxt-request-id
# or
yarn add nuxt-request-id
```

## Quick Start

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-request-id'],
})
```

After enabling the module, each request gets a UUID that:

- is exposed as `event.context.requestId`
- is returned in the `x-request-id` response header by default
- is available in app code through `useRequestId()`

## Configuration

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `headerName` | `string` | `'x-request-id'` | Response header name |
| `stateKey` | `string` | `'requestId'` | Nuxt state key used by `useRequestId()` |

`stateKey` only changes the Nuxt state key used by `useRequestId()`. The server-side context property remains `event.context.requestId`.

Example:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-request-id'],

  requestId: {
    headerName: 'x-trace-id',
    stateKey: 'traceId',
  },
})
```

## Usage

### In Components or Composables

Use `useRequestId()` anywhere in app code to read the current request ID.

```vue
<script setup lang="ts">
const requestId = useRequestId()
</script>

<template>
  <p>Request ID: {{ requestId }}</p>
</template>
```

### In Server Routes

Access the request ID through `event.context.requestId`:

```ts
// server/api/example.ts
export default defineEventHandler((event) => {
  const requestId = event.context.requestId
  return { requestId, message: 'Hello World' }
})
```

## License

MIT

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-request-id/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-request-id
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-request-id.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-request-id
[license-src]: https://img.shields.io/npm/l/nuxt-request-id.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-request-id
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com