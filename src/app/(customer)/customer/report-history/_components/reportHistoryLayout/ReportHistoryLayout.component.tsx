'use client'

import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'

import NoRecordsFound from '@/components/noRecordsFound/NoRecordFound.component'
import HowToCompareReports from '../howToCompareReports/HowToCompareReports.component'
import { paths } from '@/navigate/paths'
import { Button } from '@/components/ui/button'
import { useGetReportsQuery } from '@/redux/services/health-report.api'
import { FileTypeStatusBadge } from '@/components/statusBadge/FileTypeStatusBadge.component'
import { pollingIntervalTime, truncateString } from '@/utils'
import { useRouterTransition } from '@/hooks/useRouterTransition.hook'

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
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Health History</h1>
        <p className="text-gray-600">
          View and manage your combined health analysis reports
        </p>
      </div>

      {/* Loading */}
      {isFetching && (
        <div className="text-center text-gray-500">Loading reports...</div>
      )}

      {isSuccess && data?.reports?.length === 0 && (
        <NoRecordsFound
          title="No Reports Found"
          description="You don't have any health reports yet."
        />
      )}

      
      {/* Desktop Table */}
      {isSuccess && data?.reports?.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">
                  Report Name
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Category
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Status
                </th>
                <th className="px-4 py-3 text-center font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.reports.map((report: any) => (
                <tr
                  key={report.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Report Name */}
                  <td className="px-4 py-3 font-medium">
                    {truncateString(report.report_title, 60) || 'N/A'}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-gray-600 capitalize">
                    {report.category || 'N/A'}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-gray-600">
                    {moment(report.processed_at).format('DD MMM YYYY')}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <FileTypeStatusBadge status={report.status} />
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(paths.customerReportDetail(report.id))
                      }
                      disabled={isPending}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Cards (sm) */}
  
      {isSuccess && data?.reports?.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {data.reports.map((report: any) => (
            <div
              key={report.id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Image
                    src="/assets/icons/file.gif"
                    alt="Health Report"
                    width={56}
                    height={56}
                    unoptimized
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {truncateString(report.report_title, 60) || 'N/A'}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1 capitalize">
                    {report.category || 'N/A'}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {moment(report.processed_at).format('DD MMM YYYY')}
                    </div>
                    <FileTypeStatusBadge status={report.status} />
                  </div>

                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() =>
                      navigate(paths.customerReportDetail(report.id))
                    }
                    disabled={isPending}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Section */}
      <HowToCompareReports />
    </div>
  )
}
