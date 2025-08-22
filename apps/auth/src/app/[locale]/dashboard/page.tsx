import { getDictionary } from '@repo/internationalization'
import { createMetadata } from '@repo/seo/metadata'
import type { Metadata } from 'next'

type ContactPageProps = {
  params: Promise<{
    locale: string
  }>
}

export const generateMetadata = async ({ params }: ContactPageProps): Promise<Metadata> => {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return createMetadata(dictionary.web.home.meta)
}

export default async function OverviewPage({ params }: ContactPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return <div className="flex">{dictionary.web.contact.meta.title}</div>
}
