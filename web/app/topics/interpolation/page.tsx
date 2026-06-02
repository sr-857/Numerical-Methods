import TopicLayout from "@/components/topic-layout"
import MethodCard from "@/components/method-card"

export default function InterpolationPage() {
  return (
    <TopicLayout
      title="Interpolation Methods"
      breadcrumb="Interpolation Methods"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Interpolation methods are used to estimate values between known data points. They construct polynomial approximations through existing data and evaluate the polynomial at intermediate points.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The repository provides three classical interpolation techniques optimized for different data distributions and use cases. Each method trades off simplicity, computational cost, and accuracy based on data spacing and polynomial degree.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MethodCard
          slug="newton-forward-interpolation"
          title="Newton Forward Interpolation"
          description="Uses finite differences and forward difference table. Ideal when the target value is near the beginning of equally spaced data."
          complexity="O(n²)"
        />

        <MethodCard
          slug="newton-backward-interpolation"
          title="Newton Backward Interpolation"
          description="Uses backward difference table. Ideal when the target value is near the end of equally spaced data points."
          complexity="O(n²)"
        />

        <MethodCard
          slug="lagrange-interpolation"
          title="Lagrange Interpolation"
          description="Works with arbitrarily spaced data points. No need for equal intervals. Most flexible of the three methods."
          complexity="O(n²)"
        />
      </div>

      <div className="mt-12 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Key Concepts</h2>
        
        <div className="space-y-6">
          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-2">Equally Spaced Data</h3>
            <p className="text-gray-700 text-sm">
              Newton Forward and Backward methods require equally spaced data points. They build a difference table and perform polynomial evaluation on it.
            </p>
          </div>

          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-2">Arbitrary Spacing</h3>
            <p className="text-gray-700 text-sm">
              Lagrange interpolation works with any data distribution. It constructs basis polynomials for each point, making it ideal for non-uniform data.
            </p>
          </div>

          <div className="p-6 bg-white/50 border-2 border-black rounded-2xl">
            <h3 className="font-black text-lg mb-2">Polynomial Degree</h3>
            <p className="text-gray-700 text-sm">
              The interpolating polynomial degree equals n-1 where n is the number of data points. Higher degrees can lead to oscillations (Runge phenomenon) with certain data.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t-4 border-black">
        <h2 className="text-2xl font-black mb-4">Method Selection Guide</h2>
        <div className="bg-white/50 border-2 border-black rounded-2xl p-6 space-y-3 text-sm">
          <div>
            <strong className="block font-black mb-1">✓ Use Newton Forward if:</strong>
            <span className="text-gray-700">Data is equally spaced AND you need values near the beginning</span>
          </div>
          <div>
            <strong className="block font-black mb-1">✓ Use Newton Backward if:</strong>
            <span className="text-gray-700">Data is equally spaced AND you need values near the end</span>
          </div>
          <div>
            <strong className="block font-black mb-1">✓ Use Lagrange if:</strong>
            <span className="text-gray-700">Data is NOT equally spaced OR you need flexibility in any region</span>
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
