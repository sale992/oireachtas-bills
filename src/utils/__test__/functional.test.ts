import { describe, expect, it } from 'vitest'
import { removeHtmlTags, getAllSponsors } from '@/utils/functional'
import { type OireachtasBill } from '@/types/bills'

describe('removeHtmlTags', () => {
  it('expects to remove html tags from string', () => {
    const testString = '<p>This is <strong>test</strong> string</p>'

    const res = removeHtmlTags(testString)

    expect(res).toBe('This is test string')
  })

  it('expects to return empty string', () => {
    const res = removeHtmlTags('')

    expect(res).toBe('')
  })
})

describe('getAllSponsors', () => {
  it('expect to return all sponsors separataed by comma', () => {
    const sponsors: OireachtasBill['sponsors'] = [
      { sponsor: { as: { showAs: 'John Doe', uri: null }, by: { showAs: null, uri: null }, isPrimary: true } },
      { sponsor: { as: { showAs: 'Jane Smith', uri: null }, by: { showAs: null, uri: null }, isPrimary: false } },
    ]

    expect(getAllSponsors(sponsors)).toBe('John Doe, Jane Smith')
  })
})
