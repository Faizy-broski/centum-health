'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'
export default function HeroSection() {
  return (
    <motion.div variants={fadeUpVariant} initial="hidden" animate="show">
      <section className="py-12 sm:py-16 lg:py-24 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Centum 100 Biomarker Panel</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">Our membership includes analysis of 100 key biomarkers across 16 essential health categories</p>

          {/* What's Included Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-12 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">What's Included</h2>
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">100</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Total Biomarkers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">16</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Health Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
