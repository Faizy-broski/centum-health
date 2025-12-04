import AuthGraud from '@/components/authGraud/AuthGraud.component'
import PublicHeader from '../../_layouts/public/header/PublicHeader.component'
import PublicFooter from '../../_layouts/public/footer/PublicFooter.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Public',
  })

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGraud pageType="public">
      <PublicHeader />
      <div className="overflow-x-hidden md:overflow-x-visible">{children}</div>
      <PublicFooter />
    </AuthGraud>
  )
}
