import TopicLayout from "@/components/topic-layout"
import MethodCard from "@/components/method-card"

export default function CurveFittingPage() {
  return (
    <TopicLayout
      title="Curve Fitting"
      breadcrumb="Curve Fitting"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Curve fitting finds the best-fit function that represents experimental or observed data. Unlike interpolation which passes through all points, curve fitting minimizes the total error according to a criterion (usually least squares).
        </p>
        <p className="text-gray-700 leading-relaxed">
          The repository provides two classical curve fitting methods: straight line fitting for linear relationships and parabolic fitting for quadratic relationships. Both use the least squares criterion to minimize error.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MethodCard
          slug="straight-line-fitting"
          title="Straight Line Fitting"
          description="Fits data to y = a + bx using least squares method. Solves normal equations to find optimal a and b coefficients."
          complexity="O(n)"
        />

        <MethodCard
          slug="parabola-fitting"
          title="Parabola Fitting"
          description="Fits data to y = a + bx + cx² using least squares. Solves system of three normal equations for optimal coefficients."
          complexity="O(n)"
        />
      </div>

      <div className="mt-12 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Least Squares Method</h2>
        
        <div className="space-y-6">
          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Principle</h3>
            <p className="text-sm text-gray-700 mb-3">
              The least squares method minimizes the sum of squared residuals:
            </p>
            <div className="bg-gray-100 border border-gray-300 rounded p-3 text-xs font-mono">
              S = ∑ᵢ₌₁ⁿ (yᵢ - ŷᵢ)² → minimum
            </div>
            <p className="text-xs text-gray-600 mt-2">
              where yᵢ are observed values and ŷᵢ are predicted values
            </p>
          </div>

          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Straight Line (y = a + bx)</h3>
            <p className="text-sm text-gray-700 mb-2">Normal Equations:</p>
            <div className="bg-gray-100 border border-gray-300 rounded p-3 text-xs font-mono space-y-1">
              <div>n·a + b·∑x = ∑y</div>
              <div>a·∑x + b·∑x² = ∑xy</div>
            </div>
            <p className="text-xs text-gray-600 mt-2">Requires: n ≥ 2 data points</p>
          </div>

          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Parabola (y = a + bx + cx²)</h3>
            <p className="text-sm text-gray-700 mb-2">Normal Equations:</p>
            <div className="bg-gray-100 border border-gray-300 rounded p-3 text-xs font-mono space-y-1">
              <div>n·a + b·∑x + c·∑x² = ∑y</div>
              <div>a·∑x + b·∑x² + c·∑x³ = ∑xy</div>
              <div>a·∑x² + b·∑x³ + c·∑x⁴ = ∑x²y</div>
            </div>
            <p className="text-xs text-gray-600 mt-2">Requires: n ≥ 3 data points, determinant ≠ 0</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Comparison & Selection</h2>
        <div className="bg-white/50 border-2 border-black rounded-2xl p-6">
          <div className="space-y-4 text-sm">
            <div>
              <strong className="font-black block mb-1">Linear Fit (y = a + bx)</strong>
              <div className="text-gray-700 space-y-1">
                <p>✓ Use when: Data shows linear trend</p>
                <p>✓ Advantages: Simple, fast, easy to interpret</p>
                <p>✓ Disadvantages: Cannot fit curved patterns</p>
              </div>
            </div>
            <div className="border-t-2 border-black pt-4">
              <strong className="font-black block mb-1">Parabolic Fit (y = a + bx + cx²)</strong>
              <div className="text-gray-700 space-y-1">
                <p>✓ Use when: Data shows quadratic/curved pattern</p>
                <p>✓ Advantages: Captures curved trends, better fit for parabolic data</p>
                <p>✓ Disadvantages: More computation, more coefficients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Quality Measures</h2>
        <div className="space-y-4">
          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-2">R² (Coefficient of Determination)</h3>
            <p className="text-sm text-gray-700">
              Measures goodness of fit. R² = 1 indicates perfect fit, R² = 0 indicates poor fit.
            </p>
          </div>
          
          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-2">Residual Sum of Squares</h3>
            <p className="text-sm text-gray-700">
              SS = ∑(yᵢ - ŷᵢ)². Lower values indicate better fit.
            </p>
          </div>

          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-2">Standard Error</h3>
            <p className="text-sm text-gray-700">
              SE = √(SS/(n-p)). Estimates typical prediction error (n=points, p=parameters).
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-100 border-2 border-black rounded-2xl">
        <p className="text-sm text-gray-800">
          <strong>GitHub Repository:</strong> All source code and implementations are available at{" "}
          <a
            href="https://github.com/sr-857/Numerical-Methods"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-bold underline"
          >
            sr-857/Numerical-Methods
          </a>
        </p>
      </div>
    </TopicLayout>
  )
}
