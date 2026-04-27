# nuxt-request-id

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[English](./README.md) | 中文

> 一个为每次请求生成 UUID，并在服务端、SSR 与客户端 hydration 之间保持一致的 Nuxt 模块。

## 安装

```bash
npm install nuxt-request-id
# 或
pnpm add nuxt-request-id
# 或
yarn add nuxt-request-id
```

## 快速开始

将 `nuxt-request-id` 添加到你的 `nuxt.config.ts`：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-request-id'],
})
```

启用模块后，每个请求都会生成一个 UUID，并且：

- 可通过 `event.context.requestId` 在服务端读取
- 默认会写入响应头（`x-request-id`）
- 可在应用运行时通过 `useRequestId()` 获取（组件、composable、plugin）

## 工作机制

1. 服务端 middleware 为每个请求生成 `crypto.randomUUID()`。
2. 该值写入 `event.context.requestId`，同时设置到响应头。
3. 运行时 plugin 通过 hydration 同步该值，`useRequestId()` 再从 Nuxt state 中读取。

## 配置

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `headerName` | `string` | `'x-request-id'` | 响应头名称 |
| `stateKey` | `string` | `'requestId'` | `useRequestId()` 使用的 Nuxt state key |

`stateKey` 只会影响 `useRequestId()` 对应的 Nuxt state key，不会改变 `event.context.requestId`，也不会改变响应头逻辑。

示例：

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

## 使用方式

### `useRequestId()`

在应用运行时代码中通过 `useRequestId()` 读取当前请求 ID：

```vue
<script setup lang="ts">
const requestId = useRequestId()
</script>

<template>
  <div>Request ID: {{ requestId }}</div>
</template>
```

如果你修改了 `stateKey`，`useRequestId()` 会自动读取对应的自定义 key。

### 在 Nuxt Plugin 中使用

你可以在自定义 Nuxt plugin 中直接使用 `useRequestId()`：

```ts
// plugins/request-logger.ts
export default defineNuxtPlugin(() => {
  const requestId = useRequestId()

  // 示例：把 request id 注入到 API 请求头
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

### 服务端路由

可以通过 `event.context.requestId` 在服务端读取请求 ID：

```ts
// server/api/example.ts
export default defineEventHandler((event) => {
  const requestId = event.context.requestId

  return {
    requestId,
    message: 'Hello World',
  }
})
```

## 注意事项

- `useRequestId()` 返回的是 Nuxt state 的 ref。在正常请求生命周期内通常可拿到对应 UUID。
- 自定义 `headerName` 仅影响响应头名称。
- 自定义 `stateKey` 仅影响 `useRequestId()` 的 state key。

## 许可证

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