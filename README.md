# Computer Based Numerical & Statistical Techniques (CBNST)

[![Language](https://img.shields.io/badge/Language-C99-00599C.svg?style=flat&logo=c&logoColor=white)](https://en.cppreference.com/w/c/99)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build](https://img.shields.io/badge/Build-Makefile-orange.svg?logo=gnu-make&logoColor=white)](Makefile)
[![Stability](https://img.shields.io/badge/Numerical_Stability-Double_Precision-brightgreen.svg)](#features)
[![Syllabus](https://img.shields.io/badge/Syllabus-University_Labs-blue.svg)](#introduction)

This repository contains clean, modern, mathematically verified, and numerically stable C99 implementations of standard Numerical Methods. Every program is optimized to prevent rounding errors, division-by-zero, infinite loops, and floating-point drift, ensuring robust, university-grade quality suitable for BSc, BCA, MCA, BTech, and portfolio showcases.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Algorithms Included](#algorithms-included)
  - [Root-Finding Methods](#root-finding-methods)
  - [Interpolation Methods](#interpolation-methods)
  - [Systems of Linear Equations](#systems-of-linear-equations)
  - [Numerical Integration](#numerical-integration)
  - [Curve Fitting](#curve-fitting)
  - [Differential Equations](#differential-equations)
- [Complexity and Convergence Summary](#complexity-and-convergence-summary)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Compilation Instructions](#compilation-instructions)
- [Sample Inputs and Expected Outputs](#sample-inputs-and-expected-outputs)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Introduction

Numerical methods are the cornerstone of scientific computing, engineering, and data analysis. This repository serves as a comprehensive reference for university practical examinations and self-study, standardizing classical algorithms to modern standards. All global variables have been removed to encourage reusability, and dynamic array handling has been modernized to comply with GCC/Clang standard environments.

[↑ Back to Top](#table-of-contents)

---

## Features

- **Double Precision Floating-Point**: Replaced all `float` variables with `double` to provide maximum computational accuracy and prevent precision loss.
- **Robust Input Validation**: Includes active boundary verification, division-by-zero prevention, matrix singularity detection, and diagonal dominance checks.
- **Iterative Safety Guards**: All loop structures use strict maximum iteration parameters to prevent infinite run times in divergent scenarios.
- **Standards Compliant C99**: Zero compiler warnings with standard flags (`-Wall -Wextra -Werror`).
- **Comprehensive Lab Manual**: Includes a dedicated [Lab_Manual.md](./Lab_Manual.md) containing Aim, Algorithm, Code, Viva Questions, and Outputs.

[↑ Back to Top](#table-of-contents)

---

## Algorithms Included

### Root-Finding Methods

*   **Bisection Method**: Finds a root of $f(x) = 0$ in $[a, b]$ where $f(a) \cdot f(b) < 0$.
    $$c = a + \frac{b - a}{2}$$
    *Order of Convergence*: $1$ (Linear).
*   **Regula Falsi (False Position) Method**: Finds root via the secant line intercept.
    $$c = \frac{a \cdot f(b) - b \cdot f(a)}{f(b) - f(a)}$$
    *Order of Convergence*: $1$ (Linear).
*   **Newton-Raphson Method**: Uses tangent slope approximations.
    $$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
    *Order of Convergence*: $2$ (Quadratic).
*   **Secant Method**: Approximates the derivative using two historical points.
    $$x_{n+1} = \frac{x_{n-1} \cdot f(x_n) - x_n \cdot f(x_{n-1})}{f(x_n) - f(x_{n-1})}$$
    *Order of Convergence*: $\approx 1.618$ (Superlinear).
*   **Fixed-Point Iteration Method**: Rewrites $f(x) = 0$ as $x = g(x)$ and iterates.
    $$x_{n+1} = g(x_n)$$
    *Convergence Condition*: $|g'(x)| < 1$ (Contraction Mapping Theorem).

### Interpolation Methods

*   **Newton Forward Interpolation**: Used when target value is near the beginning of equally spaced data.
    $$y(x) = y_0 + u \Delta y_0 + \frac{u(u-1)}{2!} \Delta^2 y_0 + \dots + \frac{u(u-1)\dots(u-n+1)}{n!} \Delta^n y_0$$
    where $u = \frac{x - x_0}{h}$.
*   **Newton Backward Interpolation**: Used when target value is near the end of equally spaced data.
    $$y(x) = y_n + u \nabla y_n + \frac{u(u+1)}{2!} \nabla^2 y_n + \dots + \frac{u(u+1)\dots(u+n-1)}{n!} \nabla^n y_n$$
    where $u = \frac{x - x_n}{h}$.
*   **Lagrange Interpolation**: For arbitrarily spaced data points.
    $$y(x) = \sum_{i=0}^{n-1} y_i \prod_{j \neq i} \frac{x - x_j}{x_i - x_j}$$

### Systems of Linear Equations

*   **Gauss Elimination (with Partial Pivoting)**: Converts augmented matrix $[A|B]$ to upper triangular form, then solves via back substitution.
*   **Gauss Jordan (with Partial Pivoting)**: Converts augmented matrix $[A|B]$ to diagonal form, solving the variables directly.
*   **Gauss Jacobi Method (Iterative)**: Iterates to solve linear systems. Requires diagonal dominance.
    $$x_i^{(k+1)} = \frac{b_i - \sum_{j \neq i} a_{ij} x_j^{(k)}}{a_{ii}}$$
*   **Gauss Seidel Method (Iterative)**: Uses updated values immediately for faster convergence.
    $$x_i^{(k+1)} = \frac{b_i - \sum_{j < i} a_{ij} x_j^{(k+1)} - \sum_{j > i} a_{ij} x_j^{(k)}}{a_{ii}}$$
*   **Matrix Inversion (Gauss-Jordan)**: Converts $[A|I]$ to $[I|A^{-1}]$ using elementary row operations.

### Numerical Integration

*   **Trapezoidal Rule**: Fits linear segments.
    $$\int_a^b f(x) \,dx \approx \frac{h}{2} \left[ f(a) + f(b) + 2 \sum_{i=1}^{n-1} f(a + ih) \right]$$
*   **Simpson's 1/3 Rule**: Fits quadratic segments (requires $n$ to be even).
    $$\int_a^b f(x) \,dx \approx \frac{h}{3} \left[ f(a) + f(b) + 4 \sum_{i \text{ odd}} f(a + ih) + 2 \sum_{i \text{ even}} f(a + ih) \right]$$
*   **Simpson's 3/8 Rule**: Fits cubic segments (requires $n$ to be divisible by 3).
    $$\int_a^b f(x) \,dx \approx \frac{3h}{8} \left[ f(a) + f(b) + 2 \sum_{i \text{ mult of 3}} f(a + ih) + 3 \sum_{i \text{ other}} f(a + ih) \right]$$

### Curve Fitting

*   **Straight Line Fitting ($y = a + bx$)**: Fits a straight line to data points. Normal Equations:
    $$\begin{aligned}
    n \cdot a + b \sum x &= \sum y \\
    a \sum x + b \sum x^2 &= \sum xy
    \end{aligned}$$
*   **Parabola Fitting ($y = a + bx + cx^2$)**: Fits a second-degree polynomial. Normal Equations:
    $$\begin{aligned}
    n \cdot a + b \sum x + c \sum x^2 &= \sum y \\
    a \sum x + b \sum x^2 + c \sum x^3 &= \sum xy \\
    a \sum x^2 + b \sum x^3 + c \sum x^4 &= \sum x^2y
    \end{aligned}$$

### Differential Equations

*   **Euler's Method**: Solve $dy/dx = f(x, y)$, $y(x_0) = y_0$.
    $$y_{n+1} = y_n + h \cdot f(x_n, y_n)$$
*   **Taylor Series Method (2nd Order)**: Solves ODEs using derivatives.
    $$y_{n+1} = y_n + h \cdot y'_n + \frac{h^2}{2} \cdot y''_n$$
    where $y'_n = f(x_n, y_n)$ and $y''_n = \frac{\partial f}{\partial x} + \frac{\partial f}{\partial y} f(x_n, y_n)$.
*   **Runge-Kutta 4th Order (RK4) Method**: Highly accurate classical ODE solver.
    $$\begin{aligned}
    k_1 &= h \cdot f(x_n, y_n) \\
    k_2 &= h \cdot f\left(x_n + \frac{h}{2}, y_n + \frac{k_1}{2}\right) \\
    k_3 &= h \cdot f\left(x_n + \frac{h}{2}, y_n + \frac{k_2}{2}\right) \\
    k_4 &= h \cdot f(x_n + h, y_n + k_3) \\
    y_{n+1} &= y_n + \frac{k_1 + 2k_2 + 2k_3 + k_4}{6}
    \end{aligned}$$

[↑ Back to Top](#table-of-contents)

---

## Complexity and Convergence Summary

| Method | Time Complexity | Space Complexity | Order of Convergence | Requirements / Guards |
| :--- | :--- | :--- | :--- | :--- |
| **Bisection** | $O(\log((b-a)/\epsilon))$ | $O(1)$ | $1$ (Linear) | $f(a) \cdot f(b) < 0$ bracket check |
| **Regula Falsi** | $O(\text{Iter})$ | $O(1)$ | $1$ (Linear) | $f(a) \cdot f(b) < 0$, Denominator $\neq 0$ check |
| **Newton-Raphson**| $O(\text{Iter})$ | $O(1)$ | $2$ (Quadratic) | $f'(x_n) \neq 0$ check |
| **Secant** | $O(\text{Iter})$ | $O(1)$ | $1.618$ | $f(x_n) \neq f(x_{n-1})$ denominator check |
| **Iteration** | $O(\text{Iter})$ | $O(1)$ | $1$ (Linear) | $|g'(x)| < 1$ convergence condition |
| **Newton Forward**| $O(n^2)$ | $O(n^2)$ | - | Equal interval spacing constraint |
| **Newton Backward**| $O(n^2)$ | $O(n^2)$ | - | Equal interval spacing constraint |
| **Lagrange** | $O(n^2)$ | $O(n)$ | - | Unique $x_i$ values check |
| **Gauss Elimination**| $O(n^3)$ | $O(n^2)$ | - | Partial pivoting, Singularity checks |
| **Gauss Jordan** | $O(n^3)$ | $O(n^2)$ | - | Partial pivoting, Singularity checks |
| **Gauss Jacobi** | $O(\text{Iter} \cdot n^2)$| $O(n^2)$ | - | Diagonal dominance validation/warning |
| **Gauss Seidel** | $O(\text{Iter} \cdot n^2)$| $O(n^2)$ | - | Diagonal dominance validation/warning |
| **Matrix Inversion**| $O(n^3)$ | $O(n^2)$ | - | Singularity validation |
| **Trapezoidal** | $O(n)$ | $O(1)$ | $O(h^2)$ | Integer loop index, positive $n$ |
| **Simpson 1/3** | $O(n)$ | $O(1)$ | $O(h^4)$ | $n$ must be EVEN |
| **Simpson 3/8** | $O(n)$ | $O(1)$ | $O(h^4)$ | $n$ must be DIVISIBLE BY 3 |
| **Fit Line** | $O(n)$ | $O(n)$ | - | $n \ge 2$, Determinant $\neq 0$ check |
| **Fit Parabola** | $O(n)$ | $O(n)$ | - | $n \ge 3$, Singular normal equations check |
| **Euler ODE** | $O(\text{Steps})$ | $O(1)$ | $O(h)$ | Step size $h > 0$ |
| **Taylor ODE** | $O(\text{Steps})$ | $O(1)$ | $O(h^2)$ | Step size $h > 0$ |
| **RK4 ODE** | $O(\text{Steps})$ | $O(1)$ | $O(h^4)$ | Step size $h > 0$ |

[↑ Back to Top](#table-of-contents)

---

## Installation and Setup

To copy and run this codebase locally:

```bash
# Clone the repository
git clone https://github.com/sr-857/Numerical-Methods.git

# Navigate to the project directory
cd Numerical-Methods
```

[↑ Back to Top](#table-of-contents)

---

## Usage

This project includes a standard `Makefile` that handles target generation automatically:

```bash
# Compile all programs at once
make

# Clean all generated binary executables
make clean
```

Once compiled, you can run any individual method:
```bash
./bisection
./gauss_elimination
./rk4
```

[↑ Back to Top](#table-of-contents)

---

## Compilation Instructions

If you prefer to compile files manually using `gcc`, run:

```bash
# Root-Finding Methods
gcc -std=c99 -Wall -Wextra -Werror -o bisection Bisection_Method.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o regula_falsi Regula_Falsi_Method.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o newton_raphson Newton_Raphson.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o secant Secant_Method.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o iteration Iteration_Method.c -lm

# Interpolation Methods
gcc -std=c99 -Wall -Wextra -Werror -o newton_forward Newton_Forward_Interpolation_Method.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o newton_backward Newton_Backward_Interpolation_Method.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o lagrange Lagrange_Interpolation_Method.c -lm

# Linear Systems
gcc -std=c99 -Wall -Wextra -Werror -o gauss_elimination Gauss_Elimination.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o gauss_jordan Gauss_Jordan.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o gauss_jacobi Gauss_Jacobi.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o gauss_seidel Gauss_Seidel.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o matrix_inversion Matrix_Inversion.c -lm

# Integration
gcc -std=c99 -Wall -Wextra -Werror -o trapezoidal Trapezoidal_Rule.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o simpson_1_3 Simpson_1_by_3_Rule.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o simpson_3_8 Simpson_3_by_8_Rule.c -lm

# Fitting & ODEs
gcc -std=c99 -Wall -Wextra -Werror -o fit_line Fit_Straight_Line_Curve_Fitting.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o fit_parabola Fit_Parabola_Curve_Fitting.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o euler Euler_Method.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o taylor Taylor_Series_Method.c -lm
gcc -std=c99 -Wall -Wextra -Werror -o rk4 Runge_Kutta_Method.c -lm
```

[↑ Back to Top](#table-of-contents)

---

## Sample Inputs and Expected Outputs

### 1. Root-finding Methods
*   **Bisection / Regula Falsi / Newton-Raphson / Secant** (Target: $f(x) = x^3 - 2x - 5 = 0$)
    *   *Sample Interval / Guess*: `2 3` (or `2.0` guess for Newton)
    *   *Tolerance*: `0.0001`
    *   *Max Iterations*: `100`
    *   *Expected Output*: Root $\approx 2.094551$
*   **Fixed-Point Iteration** (Target: $x = \frac{1}{\sqrt{1+x}}$ derived from $x^3+x^2-1=0$)
    *   *Sample Interval*: `0 1`
    *   *Tolerance*: `0.0001`
    *   *Expected Output*: Root $\approx 0.75488$

### 2. Linear Systems
*   **Gauss Elimination / Jordan / Jacobi / Seidel**
    *   *System*:
        $$\begin{aligned}
        20x + y - 2z &= 17 \\
        3x + 20y - z &= -18 \\
        2x - 3y + 20z &= 25
        \end{aligned}$$
    *   *Expected Output*: $x = 1.000000$, $y = -1.000000$, $z = 1.000000$

### 3. Integration
*   **Simpson's 1/3 Rule & 3/8 Rule** (Integrate $f(x) = 1/(1+x^2)$ from $0$ to $6$)
    *   *Bounds*: `0 6`
    *   *Intervals*: `6`
    *   *Expected (1/3)*: $\approx 1.366174$
    *   *Expected (3/8)*: $\approx 1.357081$

[↑ Back to Top](#table-of-contents)

---

## Project Structure

```
.
├── audit_report.md                         # Numerical analysis code review audit
├── Lab_Manual.md                           # University-style C practical guide
├── Makefile                                # GNU Make automation script
├── README.md                               # Repository overview & manual
├── test_runner.py                          # Python automated local static testing runner
│
├── Bisection_Method.c
├── Regula_Falsi_Method.c
├── Newton_Raphson.c
├── Secant_Method.c
├── Iteration_Method.c
│
├── Newton_Forward_Interpolation_Method.c
├── Newton_Backward_Interpolation_Method.c
├── Lagrange_Interpolation_Method.c
│
├── Gauss_Elimination.c
├── Gauss_Jordan.c
├── Gauss_Jacobi.c
├── Gauss_Seidel.c
├── Matrix_Inversion.c
│
├── Trapezoidal_Rule.c
├── Simpson_1_by_3_Rule.c
├── Simpson_3_by_8_Rule.c
│
├── Fit_Straight_Line_Curve_Fitting.c
├── Fit_Parabola_Curve_Fitting.c
│
├── Euler_Method.c
├── Taylor_Series_Method.c
└── Runge_Kutta_Method.c
```

[↑ Back to Top](#table-of-contents)

---

## Contributing

Contributions to fix algorithms or add numerical routines are welcome.
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

[↑ Back to Top](#table-of-contents)

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

[↑ Back to Top](#table-of-contents)

---

## Author

**Subhajit Roy (sr-857)**
- GitHub: [@sr-857](https://github.com/sr-857)

[↑ Back to Top](#table-of-contents)
