import ComingSoon from '@/components/coming-soon/ComingSoon.component'
import React from 'react'

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Health Insights <span className="text-green-600">Blog</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Expert insights, research updates, and practical tips for optimizing your health journey.</p>
      </div>

      {/* Coming Soon Section */}
      <ComingSoon features={true} />
    </div>
  )
}
