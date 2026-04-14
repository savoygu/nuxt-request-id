# nuxt-request-id

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[English](./README.md) | 中文

> 一个为每个请求分配唯一 ID，并在服务端、SSR 与 hydration 之间保持一致的 Nuxt 模块。

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
- 默认会通过 `x-request-id` 响应头返回
- 可在应用代码中通过 `useRequestId()` 获取

## 配置

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `headerName` | `string` | `'x-request-id'` | 响应头名称 |
| `stateKey` | `string` | `'requestId'` | `useRequestId()` 使用的 Nuxt state key |

`stateKey` 只会影响 `useRequestId()` 使用的 Nuxt state key，不会改变服务端上下文里的 `event.context.requestId`。

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

在应用代码中通过 `useRequestId()` 读取当前请求 ID。

```vue
<script setup lang="ts">
const requestId = useRequestId()
</script>

<template>
  <div>Request ID: {{ requestId }}</div>
</template>
```

如果你修改了 `stateKey`，`useRequestId()` 会自动读取对应的自定义 key。

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

## 许可证

MIT

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-request-id/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-request-id
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-request-id.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/savoygu/nuxt-request-id
[license-src]: https://img.shields.io/npm/l/nuxt-request-id.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-request-id
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com