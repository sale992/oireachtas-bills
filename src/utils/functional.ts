import { type IOireachtasBill } from '@/types/bills'

export function removeHtmlTags(html: string): string {
  if (!html) return ''

  let text = html.replace(/<[^>]*>/g, '')

  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, "'")

  return text.trim()
}

export const getAllSponsors = (sponsors: IOireachtasBill['sponsors']) => {
  return (
    sponsors
      ?.map((sponsor) => sponsor?.sponsor?.as?.showAs)
      .filter(Boolean)
      .join(', ') || 'No sponsor'
  )
}
