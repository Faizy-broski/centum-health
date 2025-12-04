'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { containerVariants, slideLeftVariant, slideRightVariant } from '@/utils/animation.util'
import React from 'react'

const items = [
  {
    color: 'green',
    title: 'Clinical Summary',
    text: 'Overall positive findings. Keep up the good work! Recommend following up with your primary care doctor.',
  },
  {
    color: 'orange',
    title: 'Foods to Enjoy',
    text: 'Mackerel, Sardines, Herring, Walnuts, Cashews, Acai, Acorn Squash',
  },
  {
    color: 'teal',
    title: 'Foods to Limit',
    text: 'Processed foods, refined sugars, trans fats, excessive alcohol',
  },
  {
    color: 'purple',
    title: 'Activities to Enjoy',
    text: 'Swimming, walking, yoga, strength training, cycling',
  },
  {
    color: 'pink',
    title: 'Activities to Limit',
    text: 'Excessive high-intensity exercise, prolonged sitting',
  },
  {
    color: 'indigo',
    title: 'Self Care',
    text: 'Prioritize 7-9 hours sleep, stress management, meditation, regular health check-ups',
  },
  {
    color: 'cyan',
    title: 'Supplement Recommendations',
    text: 'Omega-3 Fatty Acids, Red Yeast Rice, Vitamin D3, Magnesium',
  },
]

export default function ActionPlan() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your Action Plan</h2>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {items.map((item, index) => (
            <motion.div key={index} variants={index % 2 === 0 ? slideLeftVariant : slideRightVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Card className={`border border-${item.color}-200 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300`}>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-8 h-8 bg-${item.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <CheckCircle2 className={`h-5 w-5 text-${item.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.text}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
