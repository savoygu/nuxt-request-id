import { addImportsDir, addPlugin, addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Response header name for the request ID
   * @default 'x-request-id'
   */
  headerName: string
  /**
   * Nuxt state key used by useRequestId()
   * @default 'requestId'
   */
  stateKey: string
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    requestId: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-request-id',
    configKey: 'requestId',
  },
  defaults: {
    headerName: 'x-request-id',
    stateKey: 'requestId',
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.requestId = options

    const resolver = createResolver(import.meta.url)

    // Add server middleware
    addServerHandler({
      middleware: true,
      handler: resolver.resolve('./runtime/server/middleware/request-id'),
    })

    // Add runtime plugin to keep requestId consistent across SSR and hydration.
    addPlugin(resolver.resolve('./runtime/plugin/request-id'))

    // Add composables
    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
