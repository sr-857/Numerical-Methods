import TopicLayout from "@/components/topic-layout"
import MethodCard from "@/components/method-card"

export default function IntegrationPage() {
  return (
    <TopicLayout
      title="Numerical Integration"
      breadcrumb="Numerical Integration"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Numerical integration approximates definite integrals when analytical solutions are difficult or impossible to obtain. These methods divide the integration interval into subintervals and approximate the curve with simple geometric shapes.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The repository provides three classical quadrature rules: Trapezoidal approximates with line segments, Simpson&apos;s 1/3 uses quadratic polynomials, and Simpson&apos;s 3/8 uses cubic polynomials for increasing accuracy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MethodCard
          slug="trapezoidal-rule"
          title="Trapezoidal Rule"
          description="Approximates curve with line segments connecting data points. Simplest method with linear accuracy. Works for any n."
          complexity="O(n)"
        />

        <MethodCard
          slug="simpson-1-3-rule"
          title="Simpson's 1/3 Rule"
          description="Approximates curve with parabolic segments. Higher accuracy than trapezoidal. Requires n to be EVEN."
          complexity="O(n)"
        />

        <MethodCard
          slug="simpson-3-8-rule"
          title="Simpson's 3/8 Rule"
          description="Approximates curve with cubic segments. Even higher accuracy. Requires n to be divisible by 3."
          complexity="O(n)"
        />
      </div>

      <div className="mt-12 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Mathematical Foundations</h2>
        
        <div className="space-y-6">
          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Trapezoidal Rule Formula</h3>
            <div className="bg-gray-100 border border-gray-300 rounded p-4 text-xs font-mono mb-3">
              ∫ₐᵇ f(x)dx ≈ (h/2)[f(a) + f(b) + 2∑ᵢ₌₁ⁿ⁻¹ f(a+ih)]
            </div>
            <p className="text-sm text-gray-700">
              where h = (b-a)/n and n is the number of subintervals
            </p>
          </div>

          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Simpson's 1/3 Rule Formula</h3>
            <div className="bg-gray-100 border border-gray-300 rounded p-4 text-xs font-mono mb-3">
              ∫ₐᵇ f(x)dx ≈ (h/3)[f(a) + f(b) + 4∑ᵢ₌odd + 2∑ᵢ₌even f(a+ih)]
            </div>
            <p className="text-sm text-gray-700">
              Requires n EVEN. Error order: O(h⁴)
            </p>
          </div>

          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Simpson's 3/8 Rule Formula</h3>
            <div className="bg-gray-100 border border-gray-300 rounded p-4 text-xs font-mono mb-3">
              ∫ₐᵇ f(x)dx ≈ (3h/8)[f(a) + f(b) + 3∑ᵢ₌non-mult-3 + 2∑ᵢ₌mult-3 f(a+ih)]
            </div>
            <p className="text-sm text-gray-700">
              Requires n divisible by 3. Error order: O(h⁴)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Accuracy Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left font-black py-3">Method</th>
                <th className="text-left font-black py-3">Error Order</th>
                <th className="text-left font-black py-3">Requirement</th>
                <th className="text-left font-black py-3">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black">
                <td className="font-bold py-3">Trapezoidal</td>
                <td>O(h²)</td>
                <td>None</td>
                <td>Smooth functions, quick estimate</td>
              </tr>
              <tr className="border-b border-black">
                <td className="font-bold py-3">Simpson 1/3</td>
                <td>O(h⁴)</td>
                <td>n even</td>
                <td>General purpose, good accuracy</td>
              </tr>
              <tr>
                <td className="font-bold py-3">Simpson 3/8</td>
                <td>O(h⁴)</td>
                <td>n ÷ 3</td>
                <td>When n divisible by 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Example Integration</h2>
        <div className="bg-white/50 border-2 border-black rounded-2xl p-6">
          <p className="text-sm font-bold text-gray-800 mb-3">
            Problem: Integrate 1/(1+x²) from 0 to 6
          </p>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Trapezoidal (n=6):</strong> ≈ 1.366174</p>
            <p><strong>Simpson 1/3 (n=6):</strong> ≈ 1.366174</p>
            <p><strong>Simpson 3/8 (n=6):</strong> ≈ 1.357081</p>
            <p className="pt-2 text-xs text-gray-600">
              (Note: Simpson&apos;s rules generally provide better accuracy for the same number of intervals)
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
