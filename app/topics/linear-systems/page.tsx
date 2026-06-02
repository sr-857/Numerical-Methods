import TopicLayout from "@/components/topic-layout"
import MethodCard from "@/components/method-card"

export default function LinearSystemsPage() {
  return (
    <TopicLayout
      title="Systems of Linear Equations"
      breadcrumb="Linear Systems"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Systems of linear equations appear frequently in scientific and engineering applications. These methods solve systems of the form Ax = b, where A is a coefficient matrix, x is the unknown vector, and b is the result vector.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The repository provides both direct methods (Gauss Elimination, Gauss-Jordan) that transform the system and iterative methods (Jacobi, Gauss-Seidel) that gradually approximate the solution, plus matrix inversion capabilities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MethodCard
          slug="gauss-elimination"
          title="Gauss Elimination with Partial Pivoting"
          description="Converts augmented matrix to upper triangular form via row operations. Uses back substitution to solve. Direct method with partial pivoting for numerical stability."
          complexity="O(n³)"
        />

        <MethodCard
          slug="gauss-jordan"
          title="Gauss-Jordan Method"
          description="Converts augmented matrix directly to diagonal (reduced row echelon) form. Variables solved immediately without back substitution."
          complexity="O(n³)"
        />

        <MethodCard
          slug="gauss-jacobi"
          title="Gauss-Jacobi Method (Iterative)"
          description="Solves by iteration using current iteration values. Requires diagonal dominance for guaranteed convergence."
          complexity="O(iterations × n²)"
        />

        <MethodCard
          slug="gauss-seidel"
          title="Gauss-Seidel Method (Iterative)"
          description="Similar to Jacobi but uses updated values immediately in same iteration. Faster convergence than Jacobi."
          complexity="O(iterations × n²)"
        />

        <MethodCard
          slug="matrix-inversion"
          title="Matrix Inversion (Gauss-Jordan)"
          description="Computes A⁻¹ by transforming [A|I] to [I|A⁻¹]. Then solution x = A⁻¹·b. Useful when solving multiple systems with same matrix."
          complexity="O(n³)"
        />
      </div>

      <div className="mt-12 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Method Classifications</h2>
        
        <div className="space-y-6">
          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Direct Methods</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Gauss Elimination:</strong> Fast, reliable, requires O(n³) operations</p>
              <p><strong>Gauss-Jordan:</strong> Directly gives solution, also O(n³)</p>
              <p><strong>Matrix Inversion:</strong> Useful when solving multiple systems with same coefficient matrix</p>
            </div>
          </div>

          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-3">Iterative Methods</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Gauss-Jacobi:</strong> Parallel updates, slower but stable</p>
              <p><strong>Gauss-Seidel:</strong> Sequential updates, typically 2-3x faster than Jacobi</p>
              <p><strong>Requirement:</strong> Both need diagonal dominance: |aᵢᵢ| {'>'} Σ|aᵢⱼ| for convergence</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Convergence Considerations</h2>
        <div className="bg-white/50 border-2 border-black rounded-2xl p-6">
          <div className="space-y-4 text-sm">
            <div>
              <strong className="font-black block mb-1">Diagonal Dominance:</strong>
              <code className="text-xs bg-gray-100 p-2 block rounded border border-gray-300">
                |aᵢᵢ| &gt; Σⱼ≠ᵢ |aᵢⱼ| for all rows i
              </code>
              <p className="text-gray-700 mt-1">Guarantees convergence for Jacobi and Gauss-Seidel methods</p>
            </div>
            <div>
              <strong className="font-black block mb-1">Iteration Limit:</strong>
              <p className="text-gray-700">All iterative methods use maximum iteration count to prevent infinite loops</p>
            </div>
            <div>
              <strong className="font-black block mb-1">Tolerance:</strong>
              <p className="text-gray-700">Solution converges when error drops below specified tolerance threshold</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Example System</h2>
        <div className="bg-white/50 border-2 border-black rounded-2xl p-6">
          <div className="text-sm text-gray-700 space-y-2 mb-4">
            <p className="font-bold">Standard System:</p>
            <code className="text-xs bg-gray-100 p-3 block rounded border border-gray-300">
              20x + y - 2z = 17<br/>
              3x + 20y - z = -18<br/>
              2x - 3y + 20z = 25
            </code>
          </div>
          <p className="text-sm text-gray-700">
            <strong>Solution:</strong> x = 1.0, y = -1.0, z = 1.0 (This system is diagonally dominant ✓)
          </p>
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
