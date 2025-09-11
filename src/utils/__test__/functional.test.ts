import { describe, expect, it } from 'vitest'
import { removeHtmlTags, getAllSponsors } from '@/utils/functional'
import { type IOireachtasBill } from '@/types/bills'

describe('removeHtmlTags', () => {
  it('expects to return empty string', () => {
    expect(removeHtmlTags('')).toBe('')
  })

  it('expects to strip tags and entities', () => {
    const input = '<p>Test&nbsp;string'
    expect(removeHtmlTags(input)).toBe('Test string')
  })
})

describe('getAllSponsors', () => {
  it('expects to return all sponsors separated by comma', () => {
    const sponsors: IOireachtasBill['sponsors'] = [
      {
        sponsor: {
          as: { showAs: 'Minister for Justice', uri: null },
          by: { showAs: null, uri: null },
          isPrimary: true,
        },
      },
      {
        sponsor: {
          as: { showAs: 'Minister for Environment', uri: null },
          by: { showAs: null, uri: null },
          isPrimary: false,
        },
      },
    ]

    expect(getAllSponsors(sponsors)).toBe('Minister for Justice, Minister for Environment')
  })

  it('expects to return No sponsor text if sponsors are not provided', () => {
    expect(getAllSponsors([])).toBe('No sponsor')
  })
})
