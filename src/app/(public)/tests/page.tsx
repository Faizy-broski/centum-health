import React from 'react'
import HeroSection from '../_components/tests/hero/HeroSection.component'
import HealthCategories from '../_components/tests/healthCategories/HealthCategories.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Tests',
  })

export default function Page() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Health Categories */}
      <HealthCategories />
    </div>
  )
}
