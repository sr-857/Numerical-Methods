import Link from "next/link"

interface MethodCardProps {
  slug: string
  title: string
  description: string
  convergence?: string
  complexity?: string
}

export default function MethodCard({ slug, title, description, convergence, complexity }: MethodCardProps) {
  return (
    <Link href={`/methods/${slug}`}>
      <div className="backdrop-blur-xl bg-white/50 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 hover:bg-white/70 transition cursor-pointer h-full">
        <h3 className="text-base sm:text-lg md:text-xl font-black mb-2">{title}</h3>
        <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">{description}</p>
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
          {convergence && (
            <div>
              <span className="font-bold text-gray-800">Convergence: </span>
              <span className="text-gray-600">{convergence}</span>
            </div>
          )}
          {complexity && (
            <div>
              <span className="font-bold text-gray-800">Complexity: </span>
              <span className="text-gray-600">{complexity}</span>
            </div>
          )}
        </div>
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-black">
          <span className="text-xs sm:text-sm font-black text-black">View Details →</span>
        </div>
      </div>
    </Link>
  )
}
