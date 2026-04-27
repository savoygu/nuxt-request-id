# nuxt-request-id

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

English | [中文](./README.zh-CN.md)

> A Nuxt module that generates a per-request UUID and keeps it consistent across server handlers, SSR, and client hydration.

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
- is returned in the response header (default: `x-request-id`)
- is available in app runtime through `useRequestId()` (components, composables, plugins)

## How It Works

1. A server middleware generates `crypto.randomUUID()` for each request.
2. The value is stored on `event.context.requestId` and added to response headers.
3. A Nuxt runtime plugin syncs it through hydration, and `useRequestId()` reads it from Nuxt state.

## Configuration

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `headerName` | `string` | `'x-request-id'` | Response header name |
| `stateKey` | `string` | `'requestId'` | Nuxt state key used by `useRequestId()` |

`stateKey` only changes the Nuxt state key used by `useRequestId()`. It does not change `event.context.requestId` or the response header behavior.

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

Use `useRequestId()` in app runtime to read the current request ID:

```vue
<script setup lang="ts">
const requestId = useRequestId()
</script>

<template>
  <p>Request ID: {{ requestId }}</p>
</template>
```

### In Nuxt Plugins

`useRequestId()` also works inside your own Nuxt plugins.

```ts
// plugins/request-logger.ts
export default defineNuxtPlugin(() => {
  const requestId = useRequestId()

  // Example: attach request id to your api client header
  const api = $fetch.create({
    onRequest({ options }) {
      if (!requestId.value) {
        return
      }

      options.headers = {
        ...options.headers,
        'x-request-id': requestId.value,
      }
    },
  })

  return {
    provide: { api },
  }
})
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

## Notes

- `useRequestId()` returns a Nuxt state ref. During a normal request lifecycle it should contain the generated UUID.
- If you customize `headerName`, only the response header name changes.
- If you customize `stateKey`, only the `useRequestId()` state key changes.

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