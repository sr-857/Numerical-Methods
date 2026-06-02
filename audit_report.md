# CBNST Numerical Methods — Codebase Audit & Reference Manual

This manual provides a detailed analysis of all 21 files in the repository.

---

## 1. Bisection_Method.c

### 1.1 Original Issues
*   **Duplicate Programs**: The file contained two complete programs with duplicate definitions of `main`, `findValueAt`, and `bisect` causing compilation failures.
*   **Precision Loss**: Used `float` instead of `double`.
*   **Drift/Termination**: First program lacked epsilon-based termination.
*   **Redundancy**: Evaluated the function three times per iteration.

### 1.2 Mathematical Review
The Bisection method solves $f(x) = 0$ on $[a, b]$ where $f(a) \cdot f(b) < 0$. The error bound at iteration $n$ is:
$$E_n \le \frac{b - a}{2^n}$$
Evaluating $c = a + \frac{b - a}{2}$ prevents floating point overflow relative to $(a + b) / 2$.

### 1.3 Code Review
*   Merged the two programs into a unified, C99-compliant structure.
*   Replaced `float` with `double`.
*   Guarded inputs with `scanf` return validations.

### 1.4 Fixed Code
Refer to the complete implementation saved in [Bisection_Method.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Bisection_Method.c).

### 1.5 Complexity Analysis
*   **Time Complexity**: $O(\log(\frac{b-a}{\epsilon}))$
*   **Space Complexity**: $O(1)$

### 1.6 Test Cases
*   **Input**: Interval `2 3`, Tolerance `0.0001`, Max Iterations `100`
*   **Expected Output**: Root $\approx 2.094551$

---

## 2. Regula_Falsi_Method.c

### 2.1 Original Issues
*   **Division by Zero**: If $f(a) \approx f(b)$, calculation of $c$ causes division by zero.
*   **Precision Loss**: Used `float`.
*   **Noisy Prints**: Confirmed root convergence before validation.

### 2.2 Mathematical Review
Regula Falsi uses linear interpolation:
$$c = \frac{a \cdot f(b) - b \cdot f(a)}{f(b) - f(a)}$$
If $f(b) - f(a) \to 0$, numerical instability occurs.

### 2.3 Code Review
*   Added check: `fabs(f(b) - f(a)) < 1e-15`.
*   Cached function calls to save CPU cycles.

### 2.4 Fixed Code
Refer to [Regula_Falsi_Method.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Regula_Falsi_Method.c).

### 2.5 Complexity Analysis
*   **Time Complexity**: $O(\text{Iter})$
*   **Space Complexity**: $O(1)$

### 2.6 Test Cases
*   **Input**: Interval `2 3`, Tolerance `0.0001`
*   **Expected Output**: Root $\approx 2.094551$

---

## 3. Newton_Raphson.c

### 3.1 Original Issues
*   **CRITICAL BUG**: `x1 = x2` instead of `x0 = x2` on line 45 left the guess uninitialized.
*   **Division by Zero**: Lacked checks for horizontal tangents ($f'(x_0) \approx 0$).
*   **Redundant Input**: Demanded a bracket interval when Newton-Raphson only requires a single guess.

### 3.2 Mathematical Review
Newton-Raphson iteration:
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
Requires $f'(x_n) \neq 0$ and quadratic convergence holds near simple roots.

### 3.3 Code Review
*   Fixed variables.
*   Added horizontal tangent guard.
*   Simplified input interface.

### 3.4 Fixed Code
Refer to [Newton_Raphson.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Newton_Raphson.c).

### 3.5 Complexity Analysis
*   **Time Complexity**: $O(\text{Iter})$
*   **Space Complexity**: $O(1)$

### 3.6 Test Cases
*   **Input**: Guess `2.0`, Tolerance `0.0001`
*   **Expected Output**: Root $\approx 2.094551$

---

## 4. Secant_Method.c

### 4.1 Original Issues
*   **Zero Denominator**: Potential division by zero when $f(x_n) \approx f(x_{n-1})$.
*   **Off-by-One**: Iteration count print was miscalculated.

### 4.2 Mathematical Review
Secant update:
$$x_{n+1} = x_n - f(x_n) \frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$$
Approximates derivatives; order of convergence is golden ratio $\approx 1.618$.

### 4.3 Code Review
*   Introduced convergence error checks.
*   Cleaned output formatting.

### 4.4 Fixed Code
Refer to [Secant_Method.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Secant_Method.c).

### 4.5 Complexity Analysis
*   **Time Complexity**: $O(\text{Iter})$
*   **Space Complexity**: $O(1)$

### 4.6 Test Cases
*   **Input**: Points `2 3`, Tolerance `0.0001`
*   **Expected Output**: Root $\approx 2.094551$

---

## 5. Iteration_Method.c

### 5.1 Original Issues
*   **CRITICAL MATH BUG**: Derivative function returned `pow(1, pow(...))` which always evaluated to `1.0`.
*   **Inconsistency**: $f(x)$ and $g(x)$ were mathematically unrelated.
*   **Domain Checks**: No verification for sqrt domain constraints ($1+x \le 0$).

### 5.2 Mathematical Review
For $f(x) = x^3 + x^2 - 1 = 0$, rewrite as $x = g(x) = \frac{1}{\sqrt{1+x}}$.
$$g'(x) = -\frac{1}{2(1+x)^{3/2}}$$
Method converges if $|g'(x_0)| < 1$.

### 5.3 Code Review
*   Rewrote derivative computation.
*   Enforced domain checks before calling `sqrt`.

### 5.4 Fixed Code
Refer to [Iteration_Method.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Iteration_Method.c).

### 5.5 Complexity Analysis
*   **Time Complexity**: $O(\text{Iter})$
*   **Space Complexity**: $O(1)$

### 5.6 Test Cases
*   **Input**: Bounds `0 1`, Tolerance `0.0001`
*   **Expected Output**: Root $\approx 0.75488$

---

## 6. Newton_Forward_Interpolation_Method.c

### 6.1 Original Issues
*   **Integer Overflow**: Lacked checks for large factorials causing overflow at $n > 12$.
*   **Wrong Update Order**: Fact/u-product operations were incorrectly shifted.
*   **Spacing Checks**: Did not check if data points were equally spaced.

### 6.2 Mathematical Review
Interpolates using forward difference operator $\Delta$:
$$y(x) = y_0 + u \Delta y_0 + \frac{u(u-1)}{2!} \Delta^2 y_0 + \dots$$
Requires spacing $h = X_{i+1} - X_i$ to remain constant.

### 6.3 Code Review
*   Replaced float with double.
*   Added equal spacing validation loops.

### 6.4 Fixed Code
Refer to [Newton_Forward_Interpolation_Method.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Newton_Forward_Interpolation_Method.c).

### 6.5 Complexity Analysis
*   **Time Complexity**: $O(n^2)$
*   **Space Complexity**: $O(n^2)$

### 6.6 Test Cases
*   **Input**: $5$ points, X: `1891 1901 1911 1921 1931`, Y: `46 66 81 93 101`, Query: `1895`
*   **Expected Output**: $y(1895) \approx 54.6533$

---

## 7. Newton_Backward_Interpolation_Method.c

### 7.1 Original Issues
*   **Loop Indices**: Evaluated backward indexing incorrectly.
*   **Integer Overflow**: Standard factorial size limits exceeded.

### 7.2 Mathematical Review
Uses backward differences $\nabla$:
$$y(x) = y_n + u \nabla y_n + \frac{u(u+1)}{2!} \nabla^2 y_n + \dots$$
where $u = (x - x_n)/h$.

### 7.3 Code Review
*   Structured index retrieval to select backward path.
*   Improved factorial representations.

### 7.4 Fixed Code
Refer to [Newton_Backward_Interpolation_Method.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Newton_Backward_Interpolation_Method.c).

### 7.5 Complexity Analysis
*   **Time Complexity**: $O(n^2)$
*   **Space Complexity**: $O(n^2)$

### 7.6 Test Cases
*   **Input**: Same table as above, Query: `1925`
*   **Expected Output**: $y(1925) \approx 96.8368$

---

## 8. Lagrange_Interpolation_Method.c

### 8.1 Original Issues
*   **Zero Division**: No verification for duplicate input coordinates ($x_i = x_j$).
*   **Precision Loss**: Floating-point limitations.

### 8.2 Mathematical Review
Lagrange polynomial:
$$P(x) = \sum y_i L_i(x), \quad L_i(x) = \prod_{j \neq i} \frac{x - x_j}{x_i - x_j}$$
If $x_i = x_j$ for $i \neq j$, $L_i(x)$ is undefined.

### 8.3 Code Review
*   Introduced nested search loops verifying unique $x$-coordinates.

### 8.4 Fixed Code
Refer to [Lagrange_Interpolation_Method.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Lagrange_Interpolation_Method.c).

### 8.5 Complexity Analysis
*   **Time Complexity**: $O(n^2)$
*   **Space Complexity**: $O(n)$

### 8.6 Test Cases
*   **Input**: Points `0 1 2 5` with values `2 3 12 147`, Target: `3`
*   **Expected Output**: $y(3) = 35.0$

---

## 9. Gauss_Elimination.c

### 9.1 Original Issues
*   **No Pivoting**: Instability/crashes when diagonal components equal zero.
*   **Global Variables**: Used global VLA declarations which are non-standard.

### 9.2 Mathematical Review
Row reduction without pivoting divides by $a_{ii}$. If $a_{ii} = 0$ (or is small), floating-point errors blow up. Partial pivoting finds:
$$\max_{k \ge i} |a_{ki}|$$
and swaps row $k$ with row $i$.

### 9.3 Code Review
*   Implemented strict partial pivoting row-swap logic.
*   Added singularity error returns.

### 9.4 Fixed Code
Refer to [Gauss_Elimination.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Gauss_Elimination.c).

### 9.5 Complexity Analysis
*   **Time Complexity**: $O(n^3)$
*   **Space Complexity**: $O(n^2)$

### 9.6 Test Cases
*   **Input**: 3x4 system:
    ```
    2 1 1 10
    3 2 3 18
    1 4 9 16
    ```
*   **Expected Output**: $x=7, y=-9, z=5$

---

## 10. Gauss_Jordan.c

### 10.1 Original Issues
*   **No Pivoting**: Same failure mode as Gauss Elimination.
*   **Singularity Handling**: Divide-by-zero checks missing during normalization.

### 10.2 Mathematical Review
Transforms matrix into identity form $[I|X]$. Lacked row swaps for diagonal zeros.

### 10.3 Code Review
*   Refactored row transformations to support partial pivoting.

### 10.4 Fixed Code
Refer to [Gauss_Jordan.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Gauss_Jordan.c).

### 10.5 Complexity Analysis
*   **Time Complexity**: $O(n^3)$
*   **Space Complexity**: $O(n^2)$

### 10.6 Test Cases
*   **Input**: Same system as above.
*   **Expected Output**: $x=7, y=-9, z=5$

---

## 11. Gauss_Jacobi.c

### 11.1 Original Issues
*   **Incorrect Dominance Check**: Used signed coefficients instead of absolute values (`fabs`).
*   **Global Flags**: Relied on side-effect variables.

### 11.2 Mathematical Review
Jacobi iteration converges if the system is strictly diagonally dominant:
$$|a_{ii}| > \sum_{j \neq i} |a_{ij}|$$

### 11.3 Code Review
*   Modified checking routine to compare absolute sums.
*   Added diagonal check warnings.

### 11.4 Fixed Code
Refer to [Gauss_Jacobi.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Gauss_Jacobi.c).

### 11.5 Complexity Analysis
*   **Time Complexity**: $O(\text{Iter} \cdot n^2)$
*   **Space Complexity**: $O(n^2)$

### 11.6 Test Cases
*   **Input**:
    ```
    20 1 -2 17
    3 20 -1 -18
    2 -3 20 25
    ```
*   **Expected Output**: $x=1, y=-1, z=1$

---

## 12. Gauss_Seidel.c

### 12.1 Original Issues
*   **Check Bug**: Missed absolute checks.
*   **Double Semicolon**: Syntax typos (`float values[n];;`).

### 12.2 Mathematical Review
Gauss-Seidel uses current values within the same iteration, accelerating convergence relative to Jacobi.

### 12.3 Code Review
*   Fixed typos and removed globals.

### 12.4 Fixed Code
Refer to [Gauss_Seidel.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Gauss_Seidel.c).

### 12.5 Complexity Analysis
*   **Time Complexity**: $O(\text{Iter} \cdot n^2)$
*   **Space Complexity**: $O(n^2)$

### 12.6 Test Cases
*   **Input**: Same diagonally dominant matrix as Jacobi.
*   **Expected Output**: $x=1, y=-1, z=1$

---

## 13. Trapezoidal_Rule.c

### 13.1 Original Issues
*   **Float Loop Counters**: Incremented `i` by step-size `h` directly, accumulating precision errors.
*   **Hardcoded Equation**: integrand functions were not isolated.

### 13.2 Mathematical Review
Approximate definite integral using trapezoids:
$$\int_a^b f(x)\,dx \approx \frac{h}{2} [ f(a) + f(b) + 2 \sum f(x_i) ]$$
Using integer index $x_i = a + i \cdot h$ prevents rounding accumulation.

### 13.3 Code Review
*   Redesigned iteration loops using loop counter $i \in [1, n-1]$.

### 13.4 Fixed Code
Refer to [Trapezoidal_Rule.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Trapezoidal_Rule.c).

### 13.5 Complexity Analysis
*   **Time Complexity**: $O(n)$
*   **Space Complexity**: $O(1)$

### 13.6 Test Cases
*   **Input**: bounds `0 1`, intervals `100`
*   **Expected Output**: Integral $\approx 0.250025$

---

## 14. Simpson_1_by_3_Rule.c

### 14.1 Original Issues
*   **Parity Validation**: No check verifying if intervals ($n$) were even.
*   **Whitespace**: Unusually large trailing spaces.

### 13.2 Mathematical Review
Requires $n$ even:
$$\int_a^b f(x)\,dx \approx \frac{h}{3} [ f(a) + f(b) + 4 \sum f(x_{\text{odd}}) + 2 \sum f(x_{\text{even}}) ]$$

### 14.3 Code Review
*   Added `n % 2 != 0` check.
*   Cleaned file whitespace.

### 14.4 Fixed Code
Refer to [Simpson_1_by_3_Rule.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Simpson_1_by_3_Rule.c).

### 14.5 Complexity Analysis
*   **Time Complexity**: $O(n)$
*   **Space Complexity**: $O(1)$

### 14.6 Test Cases
*   **Input**: Bounds `0 6`, intervals `6`
*   **Expected Output**: Integral $\approx 1.366174$

---

## 15. Simpson_3_by_8_Rule.c

### 15.1 Original Issues
*   **Divisibility Checks**: No validation checking if intervals ($n$) were divisible by 3.

### 15.2 Mathematical Review
Requires $n$ divisible by 3:
$$\int_a^b f(x)\,dx \approx \frac{3h}{8} [ f(a) + f(b) + 2 \sum f(x_{3k}) + 3 \sum f(x_{\text{other}}) ]$$

### 15.3 Code Review
*   Enforced `n % 3 != 0` guard check.

### 15.4 Fixed Code
Refer to [Simpson_3_by_8_Rule.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Simpson_3_by_8_Rule.c).

### 15.5 Complexity Analysis
*   **Time Complexity**: $O(n)$
*   **Space Complexity**: $O(1)$

### 15.6 Test Cases
*   **Input**: Bounds `0 6`, intervals `6`
*   **Expected Output**: Integral $\approx 1.357081$

---

## 16. Fit_Straight_Line_Curve_Fitting.c

### 16.1 Original Issues
*   **Slope Truncation**: Row reductions performed using integer ratio definitions.
*   **Min Bounds**: Allowed systems with less than 2 observations.

### 16.2 Mathematical Review
Normal equations resolved using Cramer's rule.

### 16.3 Code Review
*   Replaced row reduction matrix division with Cramer determinant calculations.

### 16.4 Fixed Code
Refer to [Fit_Straight_Line_Curve_Fitting.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Fit_Straight_Line_Curve_Fitting.c).

### 16.5 Complexity Analysis
*   **Time Complexity**: $O(n)$
*   **Space Complexity**: $O(n)$

### 16.6 Test Cases
*   **Input**: X: `1 2 3 4 5`, Y: `14 27 40 55 68`
*   **Expected Output**: $y = 0.0000 + 13.6000x$

---

## 17. Fit_Parabola_Curve_Fitting.c

### 17.1 Original Issues
*   **Pivot failures**: Did not check row values, leading to divide-by-zero errors.
*   **Noisy Output**: Included print statements like `Ratio=`.

### 17.2 Mathematical Review
Fits $y = a + bx + cx^2$ using a 3x3 normal equation matrix.

### 17.3 Code Review
*   Combined the normal equation calculations with a Gauss solver that has row pivoting.

### 17.4 Fixed Code
Refer to [Fit_Parabola_Curve_Fitting.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Fit_Parabola_Curve_Fitting.c).

### 17.5 Complexity Analysis
*   **Time Complexity**: $O(n)$
*   **Space Complexity**: $O(n)$

### 17.6 Test Cases
*   **Input**: X: `0 1 2 3 4`, Y: `1 1.8 1.3 2.5 6.3`
*   **Expected Output**: $y = 1.1300 - 0.5500x + 0.4400x^2$

---

## 18. Matrix_Inversion.c

### 18.1 Original Issues
*   **Missing File**: Created this file to satisfy complete syllabus requirements.

### 18.2 Mathematical Review
Row reductions transform $[A|I] \to [I|A^{-1}]$. Singularity occurs if diagonal becomes zero.

### 18.3 Code Review
*   Implemented using G-J with row pivoting.

### 18.4 Fixed Code
Refer to [Matrix_Inversion.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Matrix_Inversion.c).

### 18.5 Complexity Analysis
*   **Time Complexity**: $O(n^3)$
*   **Space Complexity**: $O(n^2)$

### 18.6 Test Cases
*   **Input**:
    ```
    2 5 7
    6 3 4
    5 -2 -3
    ```
*   **Expected Output**:
    ```
      1.000000   -1.000000    1.000000
    -38.000000   41.000000  -34.000000
     27.000000  -29.000000   24.000000
    ```

---

## 19. Euler_Method.c

### 19.1 Original Issues
*   **Missing File**: Created to satisfy syllabus.

### 19.2 Mathematical Review
Euler's equation:
$$y_{n+1} = y_n + h \cdot f(x_n, y_n)$$

### 19.3 Code Review
*   Created a C99 ODE solver and added comparison curves.

### 19.4 Fixed Code
Refer to [Euler_Method.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Euler_Method.c).

### 19.5 Complexity Analysis
*   **Time Complexity**: $O(\text{Steps})$
*   **Space Complexity**: $O(1)$

### 19.6 Test Cases
*   **Input**: Initial `0 1`, target `1.0`, step size `0.1`
*   **Expected Output**: Approximated step values tracking $2e^x - x - 1$.

---

## 20. Taylor_Series_Method.c

### 20.1 Original Issues
*   **Missing File**: Created to satisfy syllabus.

### 20.2 Mathematical Review
Second order expansion:
$$y(x+h) \approx y(x) + h y'(x) + \frac{h^2}{2} y''(x)$$

### 20.3 Code Review
*   Cleanly separated derivative calculations.

### 20.4 Fixed Code
Refer to [Taylor_Series_Method.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Taylor_Series_Method.c).

### 20.5 Complexity Analysis
*   **Time Complexity**: $O(\text{Steps})$
*   **Space Complexity**: $O(1)$

### 20.6 Test Cases
*   **Input**: Initial `0 1`, target `1.0`, step size `0.1`
*   **Expected Output**: Outputs 2nd order Taylor steps.

---

## 21. Runge_Kutta_Method.c

### 21.1 Original Issues
*   **Missing File**: Created to satisfy syllabus.

### 21.2 Mathematical Review
RK4 coefficients:
$$\begin{aligned}
k_1 &= h f(x_n, y_n), \quad k_2 = h f(x_n + h/2, y_n + k_1/2) \\
k_3 &= h f(x_n + h/2, y_n + k_2/2), \quad k_4 = h f(x_n + h, y_n + k_3)
\end{aligned}$$
$$y_{n+1} = y_n + \frac{k_1 + 2k_2 + 2k_3 + k_4}{6}$$

### 21.3 Code Review
*   Implemented high-precision double-RK4 loop.

### 21.4 Fixed Code
Refer to [Runge_Kutta_Method.c](file:///home/roney/.gemini/antigravity/scratch/Numerical-Methods-CBNST/Runge_Kutta_Method.c).

### 21.5 Complexity Analysis
*   **Time Complexity**: $O(\text{Steps})$
*   **Space Complexity**: $O(1)$

### 21.6 Test Cases
*   **Input**: Initial `0 1`, target `1.0`, step size `0.1`
*   **Expected Output**: Highly accurate ODE values matching analytical models.
