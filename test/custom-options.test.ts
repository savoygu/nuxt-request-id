import { describe, expect, it } from 'vitest'
import { setup, url } from '@nuxt/test-utils/e2e'

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('nuxt-request-id custom options', async () => {
  await setup({
    fixture: 'fixtures/custom',
  })

  it('uses the configured header name and state key', async () => {
    const response = await fetch(url('/'))
    const header = response.headers.get('x-trace-id')
    const html = await response.text()

    expect(response.headers.get('x-request-id')).toBeNull()
    expect(header).toMatch(uuidPattern)
    expect(html).toContain(`<p id="request-id">${header}</p>`)
    expect(html).toContain(`<p id="trace-id-state">${header}</p>`)
  })
})
