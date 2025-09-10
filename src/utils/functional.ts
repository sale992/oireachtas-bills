import { type OireachtasBill } from '@/types/bills'
export function removeHtmlTags(html: string): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

export const getAllSponsors = (sponsors: OireachtasBill['sponsors']) => {
  return (
    sponsors
      ?.map((sponsor) => sponsor?.sponsor?.as?.showAs)
      .filter(Boolean)
      .join(', ') || 'No sponsor'
  )
}
