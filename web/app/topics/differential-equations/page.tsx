import TopicLayout from "@/components/topic-layout"
import MethodCard from "@/components/method-card"

export default function DifferentialEquationsPage() {
  return (
    <TopicLayout
      title="Differential Equations"
      breadcrumb="Differential Equations"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Ordinary Differential Equations (ODEs) are fundamental to modeling physical systems in physics, engineering, and biology. Numerical methods solve initial value problems: dy/dx = f(x,y), y(x₀) = y₀ by stepping forward from the initial condition.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The repository provides three classical ODE solvers: Euler&apos;s simple method, Taylor Series for higher accuracy, and Runge-Kutta 4th order (RK4) which offers excellent accuracy without computing derivatives.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MethodCard
          slug="euler-method"
          title="Euler's Method"
          description="Simplest ODE solver. Uses forward difference approximation: yₙ₊₁ = yₙ + h·f(xₙ, yₙ). Good for understanding but limited accuracy."
          complexity="O(steps)"
        />

        <MethodCard
          slug="taylor-series-method"
          title="Taylor Series Method (2nd Order)"
          description="Includes second derivative term for better accuracy: yₙ₊₁ = yₙ + h·y'ₙ + (h²/2)·y''ₙ. Requires computing derivatives."
          complexity="O(steps)"
        />

        <MethodCard
          slug="runge-kutta-method"
          title="Runge-Kutta 4th Order (RK4)"
          description="Industry-standard method combining accuracy and simplicity. Evaluates function at 4 points per step. No derivative computation needed."
          complexity="O(steps)"
        />
      </div>

      <div className="mt-12 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Method Details</h2>
        
        <div className="space-y-6">
          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Euler's Method Formula</h3>
            <div className="bg-gray-100 border border-gray-300 rounded p-4 text-xs font-mono mb-3">
              yₙ₊₁ = yₙ + h·f(xₙ, yₙ)
            </div>
            <p className="text-sm text-gray-700">
              where h is the step size. Error order: O(h) (first-order accurate)
            </p>
          </div>

          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Taylor Series Method Formula</h3>
            <div className="bg-gray-100 border border-gray-300 rounded p-4 text-xs font-mono mb-3">
              yₙ₊₁ = yₙ + h·y&apos;ₙ + (h²/2)·y&apos;&apos;ₙ
            </div>
            <p className="text-sm text-gray-700 mb-2">
              where y&apos;ₙ = f(xₙ, yₙ) and y&apos;&apos;ₙ = ∂f/∂x + (∂f/∂y)·f(xₙ, yₙ)
            </p>
            <p className="text-sm text-gray-700">
              Error order: O(h²) (second-order accurate)
            </p>
          </div>

          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Runge-Kutta 4th Order Formula</h3>
            <div className="bg-gray-100 border border-gray-300 rounded p-4 text-xs font-mono space-y-1 mb-3">
              <div>k₁ = h·f(xₙ, yₙ)</div>
              <div>k₂ = h·f(xₙ + h/2, yₙ + k₁/2)</div>
              <div>k₃ = h·f(xₙ + h/2, yₙ + k₂/2)</div>
              <div>k₄ = h·f(xₙ + h, yₙ + k₃)</div>
              <div>yₙ₊₁ = yₙ + (k₁ + 2k₂ + 2k₃ + k₄)/6</div>
            </div>
            <p className="text-sm text-gray-700">
              Error order: O(h⁴) (fourth-order accurate, very accurate)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Accuracy & Convergence</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left font-black py-3">Method</th>
                <th className="text-left font-black py-3">Error Order</th>
                <th className="text-left font-black py-3">Evaluations/Step</th>
                <th className="text-left font-black py-3">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black">
                <td className="font-bold py-3">Euler</td>
                <td>O(h)</td>
                <td>1</td>
                <td>Learning, quick estimates</td>
              </tr>
              <tr className="border-b border-black">
                <td className="font-bold py-3">Taylor 2nd</td>
                <td>O(h²)</td>
                <td>1 + derivatives</td>
                <td>Medium accuracy, smooth functions</td>
              </tr>
              <tr>
                <td className="font-bold py-3">RK4</td>
                <td>O(h⁴)</td>
                <td>4</td>
                <td>High accuracy, general purpose</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Step Size Selection</h2>
        <div className="space-y-4">
          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <p className="text-sm text-gray-700">
              <strong>Smaller h:</strong> More accurate but more computation and potential round-off errors
            </p>
          </div>
          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <p className="text-sm text-gray-700">
              <strong>Larger h:</strong> Faster but less accurate, may miss rapid changes
            </p>
          </div>
          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <p className="text-sm text-gray-700">
              <strong>Adaptive step size:</strong> Automatically adjusts h based on error estimates (not in this repository)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Example Problem</h2>
        <div className="bg-white/50 border-2 border-black rounded-2xl p-6">
          <p className="text-sm font-bold text-gray-800 mb-3">
            Problem: Solve dy/dx = x + y with y(0) = 1
          </p>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>Initial Condition:</strong> y(0) = 1</p>
            <p><strong>Integration Range:</strong> x from 0 to some final value</p>
            <p><strong>Step Size:</strong> h (determines accuracy and computation)</p>
            <p className="pt-2 text-xs text-gray-600">
              RK4 with small h would give much more accurate results than Euler with the same h
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Stability Considerations</h2>
        <div className="bg-white/50 border-2 border-black rounded-2xl p-6">
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong className="font-black">Stability Region:</strong> Different methods have different ranges of h where they remain stable. Too large h can cause oscillations or divergence.
            </p>
            <p>
              <strong className="font-black">Stiff Equations:</strong> Equations with rapidly changing components may need smaller h for stability. Specialized methods (implicit schemes) are better for stiff problems.
            </p>
            <p>
              <strong className="font-black">Initial Transients:</strong> Some solutions have rapid changes near the initial point. Start with smaller h there.
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
