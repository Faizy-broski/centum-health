'use client'
import { BarChart3, Heart, Shield, TestTube } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants, slideLeftVariant } from '@/utils/animation.util'
const steps = [
  {
    id: 1,
    title: 'Complete Health Questionnaire',
    description: 'Complete our comprehensive health assessment to understand your unique needs, health goals and any possible symptoms or existing known conditions.',
    icon: TestTube,
    color: 'bg-green-500',
  },
  {
    id: 2,
    title: 'Secure Testing & Storage',
    description: 'Get booked in for your comprehensive 100 biomarker blood test at one of our affiliated blood testing locations with results automatically transferred to & securely stored in your personal health portal.',
    icon: Shield,
    color: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'AI-Powered Analysis',
    description: 'Our advanced AI software analyzes your data to curate your own personal clinical summary of all of your test results in an easy to understand and navigate way.',
    icon: Heart,
    color: 'bg-purple-500',
  },
  {
    id: 4,
    title: 'Track & Optimize',
    description: 'Monitor progress and optimize your health journey with diet, lifestyle and supplement recommendations.',
    icon: BarChart3,
    color: 'bg-orange-500',
  },
]

export default function ProcessStep() {
  return (
    <motion.div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16" initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariants}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {steps.map((step) => (
          <motion.div key={step.id} className="text-center" variants={slideLeftVariant}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 relative flex flex-col h-full">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center absolute -top-3 -left-3 text-sm font-bold">{step.id}</div>
              <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
