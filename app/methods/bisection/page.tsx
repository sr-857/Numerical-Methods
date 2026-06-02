import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github } from "lucide-react"
import CodeBlock from "@/components/code-block"

export default function BisectionMethodPage() {
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
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-2 tracking-tight leading-tight">BISECTION METHOD</h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">Finding roots through interval halving</p>

          {/* Overview */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Overview</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
              The Bisection Method is a simple and reliable root-finding algorithm that works by repeatedly halving an interval containing a root. It&apos;s guaranteed to converge if a root exists in the initial bracket.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              This method is ideal for beginners and cases where the function is continuous but derivatives are unavailable or problematic.
            </p>
          </div>

          {/* Algorithm */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Algorithm</h2>
            <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
              <ol className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li><strong>1. Check Bracket:</strong> Verify f(a)·f(b) {'<'} 0 (sign change)</li>
                <li><strong>2. Find Midpoint:</strong> c = (a + b) / 2</li>
                <li><strong>3. Evaluate:</strong> Compute f(c)</li>
                <li><strong>4. Narrow Interval:</strong> Replace interval based on f(c) sign</li>
                <li><strong>5. Check Convergence:</strong> If |b - a| {'<'} tolerance, stop. Root ≈ c</li>
                <li><strong>6. Iterate:</strong> Repeat steps 2-5 until convergence</li>
              </ol>
            </div>
          </div>

          {/* Mathematical Formula */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Mathematical Formula</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Midpoint Calculation:</p>
                <div className="bg-gray-100 border border-gray-300 rounded p-3 sm:p-4 text-center text-base sm:text-lg font-mono">
                  c = a + (b - a) / 2
                </div>
              </div>

              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Convergence Criterion:</p>
                <div className="bg-gray-100 border border-gray-300 rounded p-3 sm:p-4 text-center text-base sm:text-lg font-mono">
                  |b - a| {'<'} ε
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mt-2 sm:mt-3">where ε is the desired tolerance</p>
              </div>

              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Number of Iterations:</p>
                <div className="bg-gray-100 border border-gray-300 rounded p-3 sm:p-4 text-center text-xs sm:text-sm font-mono">
                  n = log₂((b - a) / ε)
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mt-2 sm:mt-3">Predictable iteration count based on tolerance</p>
              </div>
            </div>
          </div>

          {/* Full Source Code */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">C Source Code</h2>
            <CodeBlock code={`#include <stdio.h>
#include <math.h>

double f(double x)
{
    return x * x * x - 2.0 * x - 5.0;
}

int main(void)
{
    double a, b, c;
    double fa, fb, fc;
    double tolerance;
    int max_iter, iter;

    printf("Enter interval [a, b]: ");
    if (scanf("%lf %lf", &a, &b) != 2) {
        fprintf(stderr, "Error: Invalid input for interval.\\n");
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

    fa = f(a);
    fb = f(b);

    if (fa * fb > 0.0) {
        fprintf(stderr, "Error: f(a) and f(b) must have opposite signs.\\n");
        return 1;
    }

    if (fabs(fa) < 1e-15) {
        printf("Root = %.10f (exact at endpoint a)\\n", a);
        return 0;
    }

    if (fabs(fb) < 1e-15) {
        printf("Root = %.10f (exact at endpoint b)\\n", b);
        return 0;
    }

    printf("\\nRoots lie between %.6f and %.6f\\n", a, b);
    printf("%-10s %-15s %-15s %-15s %-15s\\n",
           "Iter", "a", "b", "c (midpoint)", "f(c)");
    printf("-----------------------------------------------------\\n");

    for (iter = 1; iter <= max_iter; iter++) {
        c = a + (b - a) / 2.0;
        fc = f(c);

        printf("%-10d %-15.10f %-15.10f %-15.10f %-15.10f\\n",
               iter, a, b, c, fc);

        if (fabs(fc) < 1e-15 || (b - a) / 2.0 < tolerance) {
            printf("\\nRoot = %.10f\\n", c);
            printf("f(root) = %.2e\\n", fc);
            return 0;
        }

        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }
    }

    c = a + (b - a) / 2.0;
    printf("\\nBest approximation = %.10f\\n", c);
    printf("f(approx) = %.2e\\n", f(c));
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
                  <li>• Always converges if root exists</li>
                  <li>• Guaranteed convergence rate</li>
                  <li>• No derivative needed</li>
                  <li>• Simple to implement</li>
                  <li>• Robust and reliable</li>
                  <li>• Predictable iteration count</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <h3 className="font-black text-base sm:text-lg mb-3 text-red-800">✗ Disadvantages</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                  <li>• Requires bracket (sign change)</li>
                  <li>• Slower than Newton-Raphson</li>
                  <li>• Cannot find multiple roots easily</li>
                  <li>• Linear convergence (slow)</li>
                  <li>• Doesn&apos;t use function smoothness</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Convergence Analysis */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Convergence Analysis</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Order of Convergence: Linear (Order 1)</p>
                <p className="text-xs sm:text-sm text-gray-700">
                  Error decreases by roughly half each iteration: eₙ₊₁ ≈ 0.5·eₙ
                </p>
              </div>

              <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Error After n Iterations</p>
                <div className="bg-gray-100 border border-gray-300 rounded p-3 sm:p-4 text-center font-mono text-sm sm:text-base">
                  eₙ ≤ (b - a) / 2ⁿ
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mt-2">Error reduces geometrically with base 0.5</p>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="mb-8 sm:mb-10 pt-6 sm:pt-8 border-t-4 border-black">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">Example Problem</h2>
            <div className="bg-white/50 border-2 border-black rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div>
                <p className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Problem: Find root of f(x) = x³ - 2x - 5 = 0</p>
                <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">Initial bracket: [2, 3] (f(2) = -1 {'<'} 0, f(3) = 16 {'>'} 0)</p>
              </div>

              <div className="bg-gray-100 rounded p-3 sm:p-4 overflow-x-auto">
                <table className="text-xs w-full">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left font-bold py-2">Iter</th>
                      <th className="text-left font-bold py-2">a</th>
                      <th className="text-left font-bold py-2">b</th>
                      <th className="text-left font-bold py-2">c</th>
                      <th className="text-left font-bold py-2">f(c)</th>
                      <th className="text-left font-bold py-2">|b-a|</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b border-gray-300">
                      <td className="py-1">0</td>
                      <td>2.0000</td>
                      <td>3.0000</td>
                      <td>2.5000</td>
                      <td>5.6250</td>
                      <td>1.0000</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-1">1</td>
                      <td>2.0000</td>
                      <td>2.5000</td>
                      <td>2.2500</td>
                      <td>2.1406</td>
                      <td>0.5000</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-1">2</td>
                      <td>2.0000</td>
                      <td>2.2500</td>
                      <td>2.1250</td>
                      <td>0.5957</td>
                      <td>0.2500</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-1">3</td>
                      <td>2.0000</td>
                      <td>2.1250</td>
                      <td>2.0625</td>
                      <td>-0.2156</td>
                      <td>0.1250</td>
                    </tr>
                    <tr>
                      <td className="py-1">...</td>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs sm:text-sm text-gray-700">
                Tolerance = 0.0001 is reached after ~13 iterations. Final root ≈ 2.0945 ✓
              </p>
            </div>
          </div>

          {/* Source Code Link */}
          <div className="pt-6 sm:pt-8 border-t-4 border-black">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <a
                href="https://github.com/sr-857/Numerical-Methods/blob/main/Bisection_Method.c"
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
