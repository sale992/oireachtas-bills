import { type IOireachtasBill } from '@/types/bills'
export function removeHtmlTags(html: string): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

export const getAllSponsors = (sponsors: IOireachtasBill['sponsors']) => {
  return (
    sponsors
      ?.map((sponsor) => sponsor?.sponsor?.as?.showAs)
      .filter(Boolean)
      .join(', ') || 'No sponsor'
  )
}
