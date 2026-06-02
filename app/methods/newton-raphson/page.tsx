import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github } from "lucide-react"
import CodeBlock from "@/components/code-block"

export default function NewtonRaphsonMethodPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-2 xs:p-3 sm:p-4 md:p-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2">
          <Link href="/topics/root-finding">
            <Button
              variant="outline"
              className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Root-Finding</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 md:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-2 tracking-tight leading-tight">NEWTON-RAPHSON METHOD</h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">Fast convergence using derivative slope approximations</p>

          {/* Overview */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Overview</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
              The Newton-Raphson Method is one of the most powerful root-finding algorithms. It uses the derivative (tangent slope) to make rapid approximations toward the root. It offers quadratic convergence—much faster than bisection—but requires derivative computation and an initial guess near the root.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              This method is the foundation for many advanced numerical algorithms and is widely used in engineering, physics, and machine learning optimization.
            </p>
          </div>

          {/* Algorithm */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Algorithm</h2>
            <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
              <ol className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li><strong>1. Initial Guess:</strong> Start with x₀ near the root</li>
                <li><strong>2. Compute Derivative:</strong> Calculate f&apos;(xₙ)</li>
                <li><strong>3. Check Validity:</strong> Verify f&apos;(xₙ) ≠ 0 (avoid division by zero)</li>
                <li><strong>4. Newton Step:</strong> xₙ₊₁ = xₙ - f(xₙ) / f&apos;(xₙ)</li>
                <li><strong>5. Check Convergence:</strong> If |xₙ₊₁ - xₙ| {'<'} tolerance, stop</li>
                <li><strong>6. Iterate:</strong> Repeat steps 2-5 until convergence</li>
              </ol>
            </div>
          </div>

          {/* Mathematical Formula */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Mathematical Formula</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Newton-Raphson Iteration:</p>
                <div className="bg-gray-100 border border-gray-300 rounded p-3 sm:p-4 text-center text-base sm:text-lg font-mono">
                  xₙ₊₁ = xₙ - f(xₙ) / f&apos;(xₙ)
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mt-2 sm:mt-3">
                  Each iteration uses the tangent line at the current point to find the next approximation
                </p>
              </div>

              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Convergence Criterion:</p>
                <div className="bg-gray-100 border border-gray-300 rounded p-3 sm:p-4 text-center text-base sm:text-lg font-mono">
                  |xₙ₊₁ - xₙ| {'<'} ε
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mt-2 sm:mt-3">where ε is the desired tolerance</p>
              </div>

              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Order of Convergence:</p>
                <div className="bg-gray-100 border border-gray-300 rounded p-3 sm:p-4 text-center text-base sm:text-lg font-mono">
                  eₙ₊₁ ≈ C·eₙ²
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mt-2 sm:mt-3">Quadratic convergence: error squares each iteration</p>
              </div>
            </div>
          </div>

          {/* Geometric Interpretation */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Geometric Interpretation</h2>
            <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
              <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
                At each iteration, the method draws the tangent line to f(x) at the current point (xₙ, f(xₙ)). The x-intercept of this tangent line becomes the next approximation xₙ₊₁. This geometric approach leads to the formula above.
              </p>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-700">
                <strong>Key Insight:</strong> The tangent line has slope f&apos;(xₙ). Using point-slope form and setting y=0, we derive the Newton-Raphson formula.
              </div>
            </div>
          </div>

          {/* Full Source Code */}
          <div className="mb-10 pt-8 border-t-4 border-black">
            <h2 className="text-2xl font-black mb-4">C Source Code</h2>
            <CodeBlock code={`#include <stdio.h>
#include <math.h>

double f(double x)
{
    return x * x * x - 2.0 * x - 5.0;
}

double f_prime(double x)
{
    return 3.0 * x * x - 2.0;
}

int main(void)
{
    double x0, x1;
    double fx, fpx;
    double tolerance;
    int max_iter, iter;

    printf("Enter initial guess x0: ");
    if (scanf("%lf", &x0) != 1) {
        fprintf(stderr, "Error: Invalid input.\\n");
        return 1;
    }

    printf("Enter tolerance (e.g. 0.0001): ");
    if (scanf("%lf", &tolerance) != 1 || tolerance <= 0.0) {
        fprintf(stderr, "Error: Tolerance must be positive.\\n");
        return 1;
    }

    printf("Enter max iterations: ");
    if (scanf("%d", &max_iter) != 1 || max_iter <= 0) {
        fprintf(stderr, "Error: Max iterations must be positive.\\n");
        return 1;
    }

    printf("\\n%-10s %-18s %-18s %-18s\\n",
           "Iter", "x_n", "f(x_n)", "f'(x_n)");
    printf("----------------------------------------------------------\\n");

    for (iter = 1; iter <= max_iter; iter++) {
        fx = f(x0);
        fpx = f_prime(x0);

        if (fabs(fpx) < 1e-15) {
            fprintf(stderr, "\\nError: f'(%.10f) ≈ 0. Method fails.\\n", x0);
            fprintf(stderr, "Try a different starting point.\\n");
            return 1;
        }

        x1 = x0 - fx / fpx;

        printf("%-10d %-18.10f %-18.10f %-18.10f\\n",
               iter, x0, fx, fpx);

        if (fabs(x1 - x0) < tolerance) {
            printf("\\nRoot = %.10f\\n", x1);
            printf("f(root) = %.2e\\n", f(x1));
            return 0;
        }

        x0 = x1;
    }

    printf("\\nLast approximation = %.10f\\n", x1);
    printf("f(approx) = %.2e\\n", f(x1));
    return 0;
}`} language="c" className="mb-4" />
          </div>

          {/* Advantages & Disadvantages */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Advantages & Disadvantages</h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-green-50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <h3 className="font-black text-base sm:text-lg mb-3 text-green-800">✓ Advantages</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                  <li>• Very fast convergence (quadratic)</li>
                  <li>• Superb for well-behaved functions</li>
                  <li>• No bracket needed</li>
                  <li>• Widely applicable</li>
                  <li>• Foundation for optimization</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <h3 className="font-black text-base sm:text-lg mb-3 text-red-800">✗ Disadvantages</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                  <li>• Requires derivative computation</li>
                  <li>• Needs good initial guess</li>
                  <li>• Can diverge if guess is poor</li>
                  <li>• f&apos;(x) must be ≠ 0</li>
                  <li>• May converge to wrong root</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Convergence Analysis */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Convergence Analysis</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Order of Convergence: Quadratic (Order 2)</p>
                <p className="text-xs sm:text-sm text-gray-700">
                  Error reduces quadratically: eₙ₊₁ {'≈'} C·eₙ². Roughly doubles the number of correct digits each iteration when near the root.
                </p>
              </div>

              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Basins of Attraction</p>
                <p className="text-xs sm:text-sm text-gray-700">
                  For polynomial roots, Newton-Raphson converges from most initial guesses in the vicinity of a root. However, basins of attraction can be complex for multiple roots.
                </p>
              </div>

              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Condition for Convergence</p>
                <p className="text-xs sm:text-sm text-gray-700">
                  Guaranteed local convergence if f&apos;(r) ≠ 0 and f&apos;&apos;(r) exists, where r is the root. Start sufficiently close to r.
                </p>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Example Problem</h2>
            <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div>
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Problem: Find root of f(x) = x³ - 2x - 5 = 0</p>
                <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">
                  f&apos;(x) = 3x² - 2
                </p>
                <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">Initial guess: x₀ = 2.0</p>
              </div>

              <div className="bg-gray-100 rounded p-3 sm:p-4 overflow-x-auto">
                <table className="text-xs w-full">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left font-bold py-2">Iter</th>
                      <th className="text-left font-bold py-2">xₙ</th>
                      <th className="text-left font-bold py-2">f(xₙ)</th>
                      <th className="text-left font-bold py-2">f&apos;(xₙ)</th>
                      <th className="text-left font-bold py-2">xₙ₊₁</th>
                      <th className="text-left font-bold py-2">Error</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b border-gray-300">
                      <td className="py-1">0</td>
                      <td>2.0000</td>
                      <td>-1.0000</td>
                      <td>10.0000</td>
                      <td>2.1000</td>
                      <td>0.1000</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-1">1</td>
                      <td>2.1000</td>
                      <td>0.0610</td>
                      <td>11.2300</td>
                      <td>2.0946</td>
                      <td>0.0054</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-1">2</td>
                      <td>2.0946</td>
                      <td>0.0000</td>
                      <td>11.1851</td>
                      <td>2.0945</td>
                      <td>0.0000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs sm:text-sm text-gray-700">
                <strong>Remarkable Speed:</strong> Only 2 iterations to machine precision! Compare this to bisection which needed ~13 iterations.
              </p>
            </div>
          </div>

          {/* Source Code Link */}
          <div className="pt-6 sm:pt-8 border-t-4 border-black">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <a
                href="https://github.com/sr-857/Numerical-Methods/blob/main/Newton_Raphson.c"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 text-xs sm:text-sm">
                  <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                  View C Source
                </Button>
              </a>
              <a
                href="https://github.com/sr-857/Numerical-Methods"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm"
                >
                  Full Repository
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
