import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-2 xs:p-3 sm:p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <div className="backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 md:p-12">
            <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
              <BookOpen className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12" />
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight">NUMERICAL METHODS</h1>
            </div>
            <p className="text-sm sm:text-base md:text-lg max-w-2xl text-gray-700 mb-4 sm:mb-6">
              A comprehensive educational guide to classical numerical methods and algorithms. Learn root-finding, interpolation, linear systems, integration, curve fitting, and differential equation solvers.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="https://github.com/sr-857/Numerical-Methods"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 text-xs sm:text-sm">
                  View Repository
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </a>
              <Button
                variant="outline"
                className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm"
              >
                Browse Topics
              </Button>
            </div>
          </div>
        </header>

        {/* Main Categories Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Root-Finding Methods */}
          <Link href="/topics/root-finding">
            <div className="backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 md:p-8 hover:bg-white/40 transition cursor-pointer h-full">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3">ROOT-FINDING</h2>
              <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
                Discover methods to find roots of equations: Bisection, Regula Falsi, Newton-Raphson, Secant, and Fixed-Point Iteration.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold">Bisection</span>
                <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold">Newton-Raphson</span>
                <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold">Secant</span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-600">5 Methods →</span>
            </div>
          </Link>

          {/* Interpolation Methods */}
          <Link href="/topics/interpolation">
            <div className="backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:bg-white/40 transition cursor-pointer h-full">
              <h2 className="text-2xl font-black mb-3">INTERPOLATION</h2>
              <p className="text-gray-700 mb-4">
                Master interpolation techniques: Newton Forward, Newton Backward, and Lagrange methods for equally and arbitrarily spaced data.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">Newton Forward</span>
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">Lagrange</span>
              </div>
              <span className="text-sm font-bold text-gray-600">3 Methods →</span>
            </div>
          </Link>

          {/* Linear Systems */}
          <Link href="/topics/linear-systems">
            <div className="backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:bg-white/40 transition cursor-pointer h-full">
              <h2 className="text-2xl font-black mb-3">LINEAR SYSTEMS</h2>
              <p className="text-gray-700 mb-4">
                Solve systems of linear equations: Gauss Elimination, Gauss-Jordan, Jacobi, Seidel methods, and Matrix Inversion.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">Gauss Elimination</span>
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">Jacobi</span>
              </div>
              <span className="text-sm font-bold text-gray-600">5 Methods →</span>
            </div>
          </Link>

          {/* Numerical Integration */}
          <Link href="/topics/integration">
            <div className="backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:bg-white/40 transition cursor-pointer h-full">
              <h2 className="text-2xl font-black mb-3">INTEGRATION</h2>
              <p className="text-gray-700 mb-4">
                Approximate definite integrals: Trapezoidal Rule, Simpson&apos;s 1/3 Rule, and Simpson&apos;s 3/8 Rule methods.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">Trapezoidal</span>
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">Simpson 1/3</span>
              </div>
              <span className="text-sm font-bold text-gray-600">3 Methods →</span>
            </div>
          </Link>

          {/* Curve Fitting */}
          <Link href="/topics/curve-fitting">
            <div className="backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:bg-white/40 transition cursor-pointer h-full">
              <h2 className="text-2xl font-black mb-3">CURVE FITTING</h2>
              <p className="text-gray-700 mb-4">
                Fit data to functions: Straight Line (Linear) and Parabola (Quadratic) fitting using least squares method.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">Linear Fit</span>
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">Parabola Fit</span>
              </div>
              <span className="text-sm font-bold text-gray-600">2 Methods →</span>
            </div>
          </Link>

          {/* Differential Equations */}
          <Link href="/topics/differential-equations">
            <div className="backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:bg-white/40 transition cursor-pointer h-full">
              <h2 className="text-2xl font-black mb-3">DIFFERENTIAL EQUATIONS</h2>
              <p className="text-gray-700 mb-4">
                Solve ODEs numerically: Euler&apos;s Method, Taylor Series, and Runge-Kutta 4th Order methods.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">Euler Method</span>
                <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">RK4</span>
              </div>
              <span className="text-sm font-bold text-gray-600">3 Methods →</span>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12">
          <h2 className="text-3xl font-black mb-8">KEY FEATURES</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
              <h3 className="text-xl font-black mb-3">Mathematical Formulas</h3>
              <p className="text-gray-700">Each method includes detailed mathematical formulas and convergence analysis.</p>
            </div>
            <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
              <h3 className="text-xl font-black mb-3">C Code Implementation</h3>
              <p className="text-gray-700">View and study clean, optimized C99 implementations with error handling.</p>
            </div>
            <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
              <h3 className="text-xl font-black mb-3">Example Problems</h3>
              <p className="text-gray-700">Sample inputs and expected outputs to understand method behavior.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
