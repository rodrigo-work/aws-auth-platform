import PageContainer from '@/components/layout/page-container'
import { PageContent } from '@/components/page-content'
import { PageHeader } from '@/components/page-header'
import { Separator } from '@repo/design-system/components/ui/separator'
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

export default function OverviewPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex w-full flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
        <PageHeader title={'Documentação resumida sobre o projeto.'} />
        <Separator />
        <PageContent title="Password">
          <ul className="list-disc pl-5 font-light text-sm">
            <li>
              Idiomas: <code>en-US</code>, <code>pt-BR</code>
            </li>
            <li>Altera a senha do usuário, é necessário estar logado para realizar a alteração.</li>
            <li>
              Se o usuário estiver logado através do Google, não será possível alterar a senha.
            </li>
          </ul>
        </PageContent>
        <Separator />
        <PageContent title="Authentication">
          <ul className="list-disc pl-5 font-light text-sm">
            <li>
              Idiomas: <code>en-US</code>, <code>pt-BR</code>
            </li>
            <li>
              Habilita ou desabilita a autenticação TOTP, usando o Google Authenticator ou Microsoft
              Authenticator
            </li>
            <li>
              Se o usuário estiver logado através do Google, não será possível alterar a senha.
            </li>
          </ul>
        </PageContent>
      </div>
    </PageContainer>
  )
}
