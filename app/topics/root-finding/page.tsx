import TopicLayout from "@/components/topic-layout"
import MethodCard from "@/components/method-card"

export default function RootFindingPage() {
  return (
    <TopicLayout
      title="Root-Finding Methods"
      breadcrumb="Root-Finding Methods"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Root-finding methods are used to find values of x where a function f(x) = 0. These methods are fundamental in numerical analysis and have applications in engineering, physics, and computational sciences.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The repository contains five classical root-finding algorithms, each with different convergence properties, computational complexity, and applicability.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MethodCard
          slug="bisection"
          title="Bisection Method"
          description="Finds a root by repeatedly halving an interval. Simple and reliable. Requires bracket: f(a)·f(b) < 0."
          convergence="Linear (Order 1)"
          complexity="O(log((b-a)/ε))"
        />

        <MethodCard
          slug="regula-falsi"
          title="Regula Falsi (False Position)"
          description="Uses linear interpolation to find the root intercept on a bracket. More efficient than bisection."
          convergence="Linear (Order 1)"
          complexity="O(iterations)"
        />

        <MethodCard
          slug="newton-raphson"
          title="Newton-Raphson Method"
          description="Uses tangent slope (derivative) approximations. Very fast convergence near the root. Requires derivative."
          convergence="Quadratic (Order 2)"
          complexity="O(iterations)"
        />

        <MethodCard
          slug="secant"
          title="Secant Method"
          description="Approximates derivative using two historical points. No derivative needed. Good balance of speed and simplicity."
          convergence="Superlinear (~1.618)"
          complexity="O(iterations)"
        />

        <MethodCard
          slug="fixed-point-iteration"
          title="Fixed-Point Iteration"
          description="Rewrites f(x)=0 as x=g(x) and iterates. Requires |g'(x)| < 1 for convergence (Contraction Mapping Theorem)."
          convergence="Linear (Order 1)"
          complexity="O(iterations)"
        />
      </div>

      <div className="mt-12 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Quick Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left font-black py-3">Method</th>
                <th className="text-left font-black py-3">Speed</th>
                <th className="text-left font-black py-3">Simplicity</th>
                <th className="text-left font-black py-3">Bracket Needed</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black">
                <td className="font-bold py-3">Bisection</td>
                <td>Slow</td>
                <td>Very High</td>
                <td>Yes</td>
              </tr>
              <tr className="border-b border-black">
                <td className="font-bold py-3">Regula Falsi</td>
                <td>Slow-Medium</td>
                <td>High</td>
                <td>Yes</td>
              </tr>
              <tr className="border-b border-black">
                <td className="font-bold py-3">Newton-Raphson</td>
                <td>Very Fast</td>
                <td>Medium</td>
                <td>No</td>
              </tr>
              <tr className="border-b border-black">
                <td className="font-bold py-3">Secant</td>
                <td>Fast</td>
                <td>Medium</td>
                <td>No</td>
              </tr>
              <tr>
                <td className="font-bold py-3">Fixed-Point</td>
                <td>Slow-Medium</td>
                <td>Medium</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
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
