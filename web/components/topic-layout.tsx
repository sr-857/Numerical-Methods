import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import React from "react"

interface TopicLayoutProps {
  title: string
  breadcrumb: string
  children: React.ReactNode
}

export default function TopicLayout({ title, breadcrumb, children }: TopicLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-2 xs:p-3 sm:p-4 md:p-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 text-xs sm:text-sm"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Back to Home
            </Button>
          </Link>
          <span className="text-gray-600 font-bold text-xs sm:text-sm">{breadcrumb}</span>
        </div>

        {/* Main Content */}
        <div className="backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 md:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 sm:mb-8 tracking-tight leading-tight">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  )
}
