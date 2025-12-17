'use client'

import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Calendar, Eye, Download } from 'lucide-react'

import NoRecordsFound from '@/components/noRecordsFound/NoRecordFound.component'
import HowToCompareReports from '../howToCompareReports/HowToCompareReports.component'
import { paths } from '@/navigate/paths'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useGetReportsQuery } from '@/redux/services/health-report.api'
import { FileTypeStatusBadge } from '@/components/statusBadge/FileTypeStatusBadge.component'
import { pollingIntervalTime, truncateString } from '@/utils'
import { useRouterTransition } from '@/hooks/useRouterTransition.hook'
import { motion } from 'framer-motion'

export default function ReportHistoryLayout() {
  const { navigate, isPending } = useRouterTransition()
  const [pollingInterval, setPollingInterval] = useState(0)

  const { data, isFetching, isSuccess } = useGetReportsQuery(undefined, {
    pollingInterval,
  })

  // Poll only when there are pending reports
  useEffect(() => {
    if (!data?.reports) return
    const hasPending = data.reports.some((r: any) => r.status === 'pending')
    setPollingInterval(hasPending ? pollingIntervalTime : 0)
  }, [data?.reports])

  return (
    <div className="w-full p-3 md:py-4 md:px-0">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Report History</h1>
        <p className="text-gray-600">Access and manage all your uploaded health reports.</p>
      </motion.div>

      {/* Loading */}
      {isFetching && <div className="text-center text-gray-500">Loading reports...</div>}

      {isSuccess && data?.reports?.length === 0 && <NoRecordsFound title="No Reports Found" description="You don't have any health reports yet." />}

      {/* Desktop Table */}
      {isSuccess && data?.reports?.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <Table className="border rounded-lg">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-gray-700">Report Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Category</TableHead>
                <TableHead className="font-semibold text-gray-700">Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="text-center font-semibold text-gray-700">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.reports.map((report: any) => (
                <TableRow
                  key={report.id}
                  className="odd:bg-gray-50 hover:bg-gray-50 transition"
                >
                  {/* Report Name */}
                  <TableCell className="font-medium">{truncateString(report.report_title, 60) || 'N/A'}</TableCell>

                  {/* Category */}
                  <TableCell className="text-gray-600 capitalize">{report.category || 'N/A'}</TableCell>

                  {/* Date */}
                  <TableCell className="text-gray-600">{moment(report.processed_at).format('MMM DD, YYYY')}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <FileTypeStatusBadge status={report.status} />
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-center">
                    <Button size="icon" variant="ghost" onClick={() => navigate(paths.customerReportDetail(report.id))} disabled={isPending}>
                      <Eye className="w-4 h-4 text-black" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Download className="w-4 h-4 text-black" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Mobile Cards (sm) */}

      {isSuccess && data?.reports?.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {data.reports.map((report: any) => (
            <div key={report.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Image src="/assets/icons/file.gif" alt="Health Report" width={56} height={56} unoptimized />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{truncateString(report.report_title, 60) || 'N/A'}</h3>

                  <p className="text-sm text-gray-600 mt-1 capitalize">{report.category || 'N/A'}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {moment(report.processed_at).format('DD MMM YYYY')}
                    </div>
                    <FileTypeStatusBadge status={report.status} />
                  </div>

                  <Button variant="outline" className="mt-4 w-full" onClick={() => navigate(paths.customerReportDetail(report.id))} disabled={isPending}>
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Section */}
      {/* <HowToCompareReports /> */}
    </div>
  )
}
