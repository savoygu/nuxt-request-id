import { describe, expect, it } from 'vitest'
import { setup, url } from '@nuxt/test-utils/e2e'

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('nuxt-request-id defaults', async () => {
  await setup({
    fixture: 'fixtures/default',
  })

  it('adds the request id to response headers and server context', async () => {
    const response = await fetch(url('/api/request-id'))
    const header = response.headers.get('x-request-id')
    const data = await response.json()

    expect(header).toMatch(uuidPattern)
    expect(data).toEqual({ requestId: header })
  })

  it('renders the same request id through the composable state', async () => {
    const response = await fetch(url('/'))
    const header = response.headers.get('x-request-id')
    const html = await response.text()

    expect(header).toMatch(uuidPattern)
    expect(html).toContain(`<p id="request-id">${header}</p>`)
    expect(html).toContain(`<p id="request-id-state">${header}</p>`)
  })
})
