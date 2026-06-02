# Computer Based Numerical & Statistical Techniques (CBNST)
## Practical Lab Manual & Exam Reference Book
**Course: BSc / BCA / MCA / BTech (Numerical Methods Lab)**

---

## 1. Bisection Method

*   **Aim**: To find a real root of the equation $x^3 - 2x - 5 = 0$ using the Bisection Method.
*   **Algorithm**:
    1. Define function $f(x) = x^3 - 2x - 5$.
    2. Choose initial guesses $a$ and $b$ such that $f(a) \cdot f(b) < 0$.
    3. Calculate midpoint $c = \frac{a+b}{2}$.
    4. If $f(c) \approx 0$ or $|b-a| < \text{tolerance}$, then $c$ is the root. Stop.
    5. If $f(a) \cdot f(c) < 0$, set $b = c$. Else, set $a = c$.
    6. Repeat steps 3 to 5 until the convergence criteria is met.
*   **Flow of Program**:
    *   Initialize variables $\to$ Input intervals $a, b$, tolerance, max iterations $\to$ Check root interval bracket validity $\to$ Loop calculation of midpoints $\to$ Output iteration table $\to$ Print root.

### C Program
```c
#include <stdio.h>
#include <math.h>

/* Function definition */
double f(double x) {
    return x * x * x - 2 * x - 5;
}

int main() {
    double a, b, c, tol;
    int iter = 0, max_iter;

    printf("Enter interval bounds [a, b]: ");
    scanf("%lf %lf", &a, &b);

    printf("Enter tolerance and max iterations: ");
    scanf("%lf %d", &tol, &max_iter);

    /* Check bracket condition */
    if (f(a) * f(b) >= 0) {
        printf("Invalid interval! f(a) and f(b) must have opposite signs.\n");
        return 1;
    }

    printf("\nIteration\t      a\t\t      b\t\t      c\t\t    f(c)\n");
    printf("----------------------------------------------------------------------------\n");

    while (iter < max_iter) {
        c = (a + b) / 2.0;
        iter++;

        printf("%d\t\t%f\t%f\t%f\t%f\n", iter, a, b, c, f(c));

        if (fabs(f(c)) < tol || fabs(b - a) < tol) {
            printf("\nRoot found at: %f (after %d iterations)\n", c, iter);
            return 0;
        }

        if (f(a) * f(c) < 0) {
            b = c;
        } else {
            a = c;
        }
    }

    printf("\nRoot did not converge within %d iterations. Approximate root: %f\n", max_iter, c);
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter interval bounds [a, b]: 2 3
    Enter tolerance and max iterations: 0.0001 100
    ```
*   **Sample Output**:
    ```text
    Iteration             a               b               c             f(c)
    ----------------------------------------------------------------------------
    1           2.000000        3.000000        2.500000        5.625000
    ...
    14          2.094482        2.094604        2.094543        -0.000067

    Root found at: 2.094543 (after 14 iterations)
    ```
*   **Viva Questions**:
    1.  *What is the order of convergence of Bisection?*
        It is $1$ (linear convergence).
    2.  *What is the primary drawback of this method?*
        It converges slowly compared to other methods.
*   **Expected Result**: The program finds the root near $2.0945$.

---

## 2. Regula Falsi Method

*   **Aim**: To find a real root of the equation $x^3 - 2x - 5 = 0$ using the Regula Falsi Method.
*   **Algorithm**:
    1. Define function $f(x)$.
    2. Choose $a$ and $b$ such that $f(a) \cdot f(b) < 0$.
    3. Calculate the false position point:
       $$c = \frac{a \cdot f(b) - b \cdot f(a)}{f(b) - f(a)}$$
    4. If $f(c) \approx 0$, then $c$ is the root.
    5. If $f(a) \cdot f(c) < 0$, set $b = c$. Else, set $a = c$.
    6. Repeat until $|f(c)| < \text{tolerance}$.
*   **Flow of Program**:
    *   Read input variables $\to$ Validate root bracket $\to$ Loop calculation using linear interpolation formula $\to$ Check convergence $\to$ Print root.

### C Program
```c
#include <stdio.h>
#include <math.h>

double f(double x) {
    return x * x * x - 2 * x - 5;
}

int main() {
    double a, b, c, tol;
    int iter = 0, max_iter;

    printf("Enter interval bounds [a, b]: ");
    scanf("%lf %lf", &a, &b);

    printf("Enter tolerance and max iterations: ");
    scanf("%lf %d", &tol, &max_iter);

    if (f(a) * f(b) >= 0) {
        printf("Invalid interval!\n");
        return 1;
    }

    printf("\nIteration\t      a\t\t      b\t\t      c\t\t    f(c)\n");
    printf("----------------------------------------------------------------------------\n");

    while (iter < max_iter) {
        /* Denominator check */
        if (fabs(f(b) - f(a)) < 1e-15) {
            printf("Error: Division by zero!\n");
            return 1;
        }

        c = (a * f(b) - b * f(a)) / (f(b) - f(a));
        iter++;

        printf("%d\t\t%f\t%f\t%f\t%f\n", iter, a, b, c, f(c));

        if (fabs(f(c)) < tol) {
            printf("\nRoot found at: %f (after %d iterations)\n", c, iter);
            return 0;
        }

        if (f(a) * f(c) < 0) {
            b = c;
        } else {
            a = c;
        }
    }

    printf("\nMethod completed. Root: %f\n", c);
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter interval bounds [a, b]: 2 3
    Enter tolerance and max iterations: 0.0001 50
    ```
*   **Sample Output**:
    ```text
    Root found at: 2.094500 (after 7 iterations)
    ```
*   **Viva Questions**:
    1.  *Why is it called the False Position method?*
        Because it approximates the root using the chord line between two function values instead of cutting the interval directly in half.
*   **Expected Result**: Root converges near $2.0945$.

---

## 3. Newton Raphson Method

*   **Aim**: To find a real root of the equation $x^3 - 2x - 5 = 0$ using the Newton Raphson Method.
*   **Algorithm**:
    1. Define $f(x)$ and its derivative $f'(x)$.
    2. Choose an initial guess $x_0$.
    3. Update guess:
       $$x_1 = x_0 - \frac{f(x_0)}{f'(x_0)}$$
    4. If $|x_1 - x_0| < \text{tolerance}$, stop.
    5. Else, set $x_0 = x_1$ and repeat.
*   **Flow of Program**:
    *   Input $x_0$, tolerance, max iterations $\to$ Loop update step $\to$ Guard against $f'(x_0) = 0$ $\to$ Output trace table $\to$ Print root.

### C Program
```c
#include <stdio.h>
#include <math.h>

double f(double x) {
    return x * x * x - 2 * x - 5;
}

double df(double x) {
    return 3 * x * x - 2;
}

int main() {
    double x0, x1, tol;
    int iter = 0, max_iter;

    printf("Enter initial guess: ");
    scanf("%lf", &x0);

    printf("Enter tolerance and max iterations: ");
    scanf("%lf %d", &tol, &max_iter);

    printf("\nIteration\t     x0\t\t    f(x0)\t    f'(x0)\t     x1\n");
    printf("----------------------------------------------------------------------------\n");

    while (iter < max_iter) {
        if (fabs(df(x0)) < 1e-15) {
            printf("Error: Derivative is zero! Divergence.\n");
            return 1;
        }

        x1 = x0 - f(x0) / df(x0);
        iter++;

        printf("%d\t\t%f\t%f\t%f\t%f\n", iter, x0, f(x0), df(x0), x1);

        if (fabs(x1 - x0) < tol) {
            printf("\nRoot found at: %f (after %d iterations)\n", x1, iter);
            return 0;
        }

        x0 = x1;
    }

    printf("\nDid not converge. Approximate root: %f\n", x1);
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter initial guess: 2
    Enter tolerance and max iterations: 0.0001 50
    ```
*   **Sample Output**:
    ```text
    Root found at: 2.094551 (after 4 iterations)
    ```
*   **Viva Questions**:
    1.  *What is the order of convergence of Newton-Raphson?*
        It is $2$ (quadratic convergence).
*   **Expected Result**: Root matches $2.0945$ very rapidly.

---

## 4. Secant Method

*   **Aim**: To find a real root of $x^3 - 2x - 5 = 0$ using the Secant Method.
*   **Algorithm**:
    1. Choose two initial points $x_0$ and $x_1$.
    2. Compute the next approximation:
       $$x_2 = \frac{x_0 \cdot f(x_1) - x_1 \cdot f(x_0)}{f(x_1) - f(x_0)}$$
    3. Set $x_0 = x_1$ and $x_1 = x_2$.
    4. Repeat until $|x_1 - x_0| < \text{tolerance}$.
*   **Flow of Program**:
    *   Input $x_0, x_1$, tolerance, iterations $\to$ Check denominators $\to$ Loop calculation $\to$ Shift variables $\to$ Print root.

### C Program
```c
#include <stdio.h>
#include <math.h>

double f(double x) {
    return x * x * x - 2 * x - 5;
}

int main() {
    double x0, x1, x2, tol;
    int iter = 0, max_iter;

    printf("Enter two initial guesses: ");
    scanf("%lf %lf", &x0, &x1);

    printf("Enter tolerance and max iterations: ");
    scanf("%lf %d", &tol, &max_iter);

    printf("\nIteration\t     x0\t\t     x1\t\t     x2\t\t    f(x2)\n");
    printf("----------------------------------------------------------------------------\n");

    while (iter < max_iter) {
        double diff = f(x1) - f(x0);
        if (fabs(diff) < 1e-15) {
            printf("Error: Denominator is zero!\n");
            return 1;
        }

        x2 = (x0 * f(x1) - x1 * f(x0)) / diff;
        iter++;

        printf("%d\t\t%f\t%f\t%f\t%f\n", iter, x0, x1, x2, f(x2));

        if (fabs(x2 - x1) < tol) {
            printf("\nRoot found at: %f (after %d iterations)\n", x2, iter);
            return 0;
        }

        x0 = x1;
        x1 = x2;
    }

    printf("\nApproximate root: %f\n", x2);
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter two initial guesses: 2 3
    Enter tolerance and max iterations: 0.0001 50
    ```
*   **Sample Output**:
    ```text
    Root found at: 2.094551 (after 6 iterations)
    ```
*   **Viva Questions**:
    1.  *What is the advantage of Secant over Newton-Raphson?*
        It does not require finding the analytical derivative $f'(x)$.
*   **Expected Result**: Convergence occurs near $2.0945$.

---

## 5. Newton Forward Interpolation

*   **Aim**: To estimate the value of $y$ at a given $x$ from a table of equally spaced points using Newton's Forward Difference formula.
*   **Algorithm**:
    1. Read number of points $n$ and the target $x$.
    2. Input arrays $X[n]$ and $Y[n]$.
    3. Generate the forward difference table:
       $$D_{i, 0} = Y_i, \quad D_{i, j} = D_{i+1, j-1} - D_{i, j-1}$$
    4. Calculate $u = \frac{x - X_0}{h}$ where $h = X_1 - X_0$.
    5. Evaluate $y(x)$:
       $$y(x) = Y_0 + u D_{0, 1} + \frac{u(u-1)}{2!} D_{0, 2} + \dots$$
*   **Flow of Program**:
    *   Read dataset size and coordinate table $\to$ Validate spacing interval $h \neq 0$ $\to$ Populate forward difference 2D array $\to$ Evaluate product term terms $\to$ Print result.

### C Program
```c
#include <stdio.h>
#include <math.h>

int main() {
    int n;
    double x, h, u, term, sum;
    double X[20], Y[20][20];

    printf("Enter number of data points: ");
    scanf("%d", &n);

    printf("Enter table values (x and y):\n");
    for (int i = 0; i < n; i++) {
        scanf("%lf %lf", &X[i], &Y[i][0]);
    }

    printf("Enter query value x: ");
    scanf("%lf", &x);

    /* Construct Forward Difference Table */
    for (int j = 1; j < n; j++) {
        for (int i = 0; i < n - j; i++) {
            Y[i][j] = Y[i + 1][j - 1] - Y[i][j - 1];
        }
    }

    /* Print Difference Table */
    printf("\nDifference Table:\n");
    for (int i = 0; i < n; i++) {
        printf("%f\t", X[i]);
        for (int j = 0; j < n - i; j++) {
            printf("%f\t", Y[i][j]);
        }
        printf("\n");
    }

    h = X[1] - X[0];
    u = (x - X[0]) / h;
    sum = Y[0][0];
    term = 1.0;

    for (int i = 1; i < n; i++) {
        term = term * (u - i + 1) / i;
        sum = sum + term * Y[0][i];
    }

    printf("\nInterpolated value at x = %f is: %f\n", x, sum);
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter number of data points: 4
    Enter table values (x and y):
    0 1
    1 2
    2 9
    3 28
    Enter query value x: 1.5
    ```
*   **Sample Output**:
    ```text
    Interpolated value at x = 1.500000 is: 4.875000
    ```
*   **Viva Questions**:
    1.  *When is Newton's forward formula preferred?*
        When the query point $x$ lies near the beginning of the table.
*   **Expected Result**: Polynomial interpolation yields the correct output.

---

## 6. Newton Backward Interpolation

*   **Aim**: To estimate $y(x)$ when $x$ is near the end of equally spaced data points.
*   **Algorithm**:
    1. Read coordinates.
    2. Build difference table.
    3. Define $u = \frac{x - X_{n-1}}{h}$.
    4. Compute backward sum:
       $$y(x) = Y_{n-1} + u D_{n-2, 1} + \frac{u(u+1)}{2!} D_{n-3, 2} + \dots$$
*   **Flow of Program**:
    *   Input table data $\to$ Construct difference array $\to$ Set $u$ using the last row $\to$ Accumulate terms $\to$ Print interpolated value.

### C Program
```c
#include <stdio.h>
#include <math.h>

int main() {
    int n;
    double x, h, u, term, sum;
    double X[20], Y[20][20];

    printf("Enter number of data points: ");
    scanf("%d", &n);

    printf("Enter table values (x and y):\n");
    for (int i = 0; i < n; i++) {
        scanf("%lf %lf", &X[i], &Y[i][0]);
    }

    printf("Enter query value x: ");
    scanf("%lf", &x);

    /* Construct Difference Table */
    for (int j = 1; j < n; j++) {
        for (int i = n - 1; i >= j; i--) {
            Y[i][j] = Y[i][j - 1] - Y[i - 1][j - 1];
        }
    }

    /* Print Difference Table */
    printf("\nDifference Table:\n");
    for (int i = 0; i < n; i++) {
        printf("%f\t", X[i]);
        for (int j = 0; j <= i; j++) {
            printf("%f\t", Y[i][j]);
        }
        printf("\n");
    }

    h = X[1] - X[0];
    u = (x - X[n - 1]) / h;
    sum = Y[n - 1][0];
    term = 1.0;

    for (int i = 1; i < n; i++) {
        term = term * (u + i - 1) / i;
        sum = sum + term * Y[n - 1][i];
    }

    printf("\nInterpolated value at x = %f is: %f\n", x, sum);
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter number of data points: 4
    Enter table values (x and y):
    0 1
    1 2
    2 9
    3 28
    Enter query value x: 2.5
    ```
*   **Sample Output**:
    ```text
    Interpolated value at x = 2.500000 is: 16.625000
    ```
*   **Viva Questions**:
    1.  *What symbol represents the backward difference operator?*
        The inverted delta symbol, del ($\nabla$).
*   **Expected Result**: Correct interpolation at the bottom bound.

---

## 7. Lagrange Interpolation

*   **Aim**: To estimate $y(x)$ for unequally spaced data points using Lagrange's Interpolation.
*   **Algorithm**:
    1. Input coordinates $X_i, Y_i$ of size $n$.
    2. Input query point $x$.
    3. Loop $i$ from $0$ to $n-1$:
       *   Initialize term $P = 1.0$.
       *   Loop $j$ from $0$ to $n-1$:
           *   If $i \neq j$, $P = P \cdot \frac{x - X_j}{X_i - X_j}$.
       *   Add $P \cdot Y_i$ to sum.
    4. Print final sum.
*   **Flow of Program**:
    *   Read input variables $\to$ Run nested loops for product terms (skipping $i=j$) $\to$ Accumulate terms $\to$ Print output.

### C Program
```c
#include <stdio.h>
#include <math.h>

int main() {
    int n;
    double x, sum = 0.0, term;
    double X[20], Y[20];

    printf("Enter number of data points: ");
    scanf("%d", &n);

    printf("Enter data points (x and y):\n");
    for (int i = 0; i < n; i++) {
        scanf("%lf %lf", &X[i], &Y[i]);
    }

    /* Validate unique coordinates */
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (fabs(X[i] - X[j]) < 1e-15) {
                printf("Error: Duplicate X coordinates found!\n");
                return 1;
            }
        }
    }

    printf("Enter query value x: ");
    scanf("%lf", &x);

    for (int i = 0; i < n; i++) {
        term = 1.0;
        for (int j = 0; j < n; j++) {
            if (i != j) {
                term = term * (x - X[j]) / (X[i] - X[j]);
            }
        }
        sum = sum + term * Y[i];
    }

    printf("\nInterpolated value at x = %f is: %f\n", x, sum);
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter number of data points: 4
    Enter data points (x and y):
    0 2
    1 3
    2 12
    5 147
    Enter query value x: 3
    ```
*   **Sample Output**:
    ```text
    Interpolated value at x = 3.000000 is: 35.000000
    ```
*   **Viva Questions**:
    1.  *Does Lagrange's formula require equally spaced x values?*
        No, it can be applied to both equal and unequal spacing.
*   **Expected Result**: Finds the correct polynomial fit.

---

## 8. Gauss Elimination

*   **Aim**: To solve a system of linear equations using the Gauss Elimination Method.
*   **Algorithm**:
    1. Represent system as augmented matrix $A[n][n+1]$.
    2. Convert to upper triangular matrix:
       *   Find pivot and swap rows (Partial Pivoting).
       *   Eliminate column elements below pivot:
           $$\text{Row}_j = \text{Row}_j - \frac{A_{ji}}{A_{ii}} \text{Row}_i$$
    3. Perform back substitution to compute solutions $x_i$:
       $$x_i = \frac{A_{i,n} - \sum_{j=i+1}^{n-1} A_{i,j} x_j}{A_{i,i}}$$
*   **Flow of Program**:
    *   Input $n \to$ Populate augmented matrix $\to$ Perform pivot row swaps $\to$ Eliminate sub-diagonal values $\to$ Back substitute $\to$ Output solution list.

### C Program
```c
#include <stdio.h>
#include <math.h>

int main() {
    int n;
    double a[10][11], x[10], ratio, sum;

    printf("Enter number of unknowns: ");
    scanf("%d", &n);

    printf("Enter Augmented Matrix elements row-wise:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= n; j++) {
            scanf("%lf", &a[i][j]);
        }
    }

    /* Row elimination with partial pivoting */
    for (int i = 0; i < n; i++) {
        /* Pivot search */
        int max_row = i;
        for (int k = i + 1; k < n; k++) {
            if (fabs(a[k][i]) > fabs(a[max_row][i])) {
                max_row = k;
            }
        }
        /* Row swap */
        if (max_row != i) {
            for (int k = 0; k <= n; k++) {
                double temp = a[i][k];
                a[i][k] = a[max_row][k];
                a[max_row][k] = temp;
            }
        }

        if (fabs(a[i][i]) < 1e-15) {
            printf("Error: Matrix is singular!\n");
            return 1;
        }

        /* Forward elimination */
        for (int j = i + 1; j < n; j++) {
            ratio = a[j][i] / a[i][i];
            for (int k = i; k <= n; k++) {
                a[j][k] = a[j][k] - ratio * a[i][k];
            }
        }
    }

    /* Back substitution */
    x[n - 1] = a[n - 1][n] / a[n - 1][n - 1];
    for (int i = n - 2; i >= 0; i--) {
        sum = 0.0;
        for (int j = i + 1; j < n; j++) {
            sum = sum + a[i][j] * x[j];
        }
        x[i] = (a[i][n] - sum) / a[i][i];
    }

    printf("\nSolution:\n");
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %f\n", i + 1, x[i]);
    }
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter number of unknowns: 3
    Enter Augmented Matrix elements row-wise:
    2 1 1 10
    3 2 3 18
    1 4 9 16
    ```
*   **Sample Output**:
    ```text
    x[1] = 7.000000
    x[2] = -9.000000
    x[3] = 5.000000
    ```
*   **Viva Questions**:
    1.  *Why is partial pivoting used?*
        To avoid division by zero or division by very small numbers, which causes large rounding errors.
*   **Expected Result**: System solved correctly.

---

## 9. Gauss Jordan

*   **Aim**: To solve a system of linear equations using the Gauss Jordan Method.
*   **Algorithm**:
    1. Input augmented matrix.
    2. Convert augmented matrix to diagonal form:
       *   Swap rows for pivoting.
       *   Divide pivot row by $A_{ii}$.
       *   Eliminate column elements above and below pivot.
    3. Output solutions directly from $A_{i,n}$.
*   **Flow of Program**:
    *   Augmented array read $\to$ Apply row-swap pivot logic $\to$ Normalize active row $\to$ Eliminate non-pivot column items $\to$ Print solutions.

### C Program
```c
#include <stdio.h>
#include <math.h>

int main() {
    int n;
    double a[10][11], ratio;

    printf("Enter number of unknowns: ");
    scanf("%d", &n);

    printf("Enter Augmented Matrix elements row-wise:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= n; j++) {
            scanf("%lf", &a[i][j]);
        }
    }

    /* Convert to identity matrix shape */
    for (int i = 0; i < n; i++) {
        /* Pivot search */
        int max_row = i;
        for (int k = i + 1; k < n; k++) {
            if (fabs(a[k][i]) > fabs(a[max_row][i])) {
                max_row = k;
            }
        }
        /* Row swap */
        if (max_row != i) {
            for (int k = 0; k <= n; k++) {
                double temp = a[i][k];
                a[i][k] = a[max_row][k];
                a[max_row][k] = temp;
            }
        }

        if (fabs(a[i][i]) < 1e-15) {
            printf("Error: Matrix is singular!\n");
            return 1;
        }

        /* Normalize row i */
        double pivot = a[i][i];
        for (int k = 0; k <= n; k++) {
            a[i][k] /= pivot;
        }

        /* Eliminate all other values in column i */
        for (int j = 0; j < n; j++) {
            if (j != i) {
                ratio = a[j][i];
                for (int k = i; k <= n; k++) {
                    a[j][k] = a[j][k] - ratio * a[i][k];
                }
            }
        }
    }

    printf("\nSolution:\n");
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %f\n", i + 1, a[i][n]);
    }
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter number of unknowns: 3
    Enter Augmented Matrix elements row-wise:
    2 1 1 10
    3 2 3 18
    1 4 9 16
    ```
*   **Sample Output**:
    ```text
    x[1] = 7.000000
    x[2] = -9.000000
    x[3] = 5.000000
    ```
*   **Viva Questions**:
    1.  *What is the difference between Gauss Elimination and Gauss Jordan?*
        Gauss Elimination reduces the matrix to upper-triangular form, whereas Gauss Jordan reduces it to diagonal/identity form, removing the need for back-substitution.
*   **Expected Result**: Direct extraction of system solutions.

---

## 10. Gauss Jacobi

*   **Aim**: To solve a system of linear equations using the iterative Gauss Jacobi Method.
*   **Algorithm**:
    1. Represent system equations isolating variable diagonal terms:
       $$x_i^{(k+1)} = \frac{b_i - \sum_{j \neq i} a_{ij} x_j^{(k)}}{a_{ii}}$$
    2. Check diagonal dominance.
    3. Loop updates for all variables using old values.
    4. Stop when convergence criteria or max iterations is reached.
*   **Flow of Program**:
    *   Input variables $\to$ Verify dominance warnings $\to$ Loop calculation of $X_{\text{new}}$ using $X_{\text{old}}$ array values $\to$ Copy new array back $\to$ Output table trace.

### C Program
```c
#include <stdio.h>
#include <math.h>

int main() {
    int n, max_iter, iter = 0;
    double a[10][11], x_old[10], x_new[10], tol, sum;

    printf("Enter number of unknowns: ");
    scanf("%d", &n);

    printf("Enter tolerance and max iterations: ");
    scanf("%lf %d", &tol, &max_iter);

    printf("Enter Augmented Matrix elements row-wise:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= n; j++) {
            scanf("%lf", &a[i][j]);
        }
    }

    /* Initialize starting guesses to 0 */
    for (int i = 0; i < n; i++) {
        x_old[i] = 0.0;
    }

    printf("\nIteration traces:\n");
    while (iter < max_iter) {
        for (int i = 0; i < n; i++) {
            sum = 0.0;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    sum = sum + a[i][j] * x_old[j];
                }
            }
            if (fabs(a[i][i]) < 1e-15) {
                printf("Error: Diagonal element is zero!\n");
                return 1;
            }
            x_new[i] = (a[i][n] - sum) / a[i][i];
        }

        iter++;
        printf("Iter %d: ", iter);
        for (int i = 0; i < n; i++) printf("x%d=%f ", i+1, x_new[i]);
        printf("\n");

        /* Check Convergence */
        int converged = 1;
        for (int i = 0; i < n; i++) {
            if (fabs(x_new[i] - x_old[i]) >= tol) {
                converged = 0;
                break;
            }
        }

        if (converged) {
            printf("\nConverged!\n");
            return 0;
        }

        /* Update old values */
        for (int i = 0; i < n; i++) {
            x_old[i] = x_new[i];
        }
    }

    printf("\nMax iterations reached.\n");
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter number of unknowns: 3
    Enter tolerance and max iterations: 0.0001 50
    Enter Augmented Matrix:
    20 1 -2 17
    3 20 -1 -18
    2 -3 20 25
    ```
*   **Sample Output**:
    ```text
    Iter 5: x1=1.000000 x2=-1.000000 x3=1.000000
    ```
*   **Viva Questions**:
    1.  *What is the condition for convergence in Jacobi?*
        The matrix should be diagonally dominant: $|a_{ii}| > \sum_{j \neq i} |a_{ij}|$.
*   **Expected Result**: Program converges to the correct solution vector.

---

## 11. Gauss Seidel

*   **Aim**: To solve a system of linear equations using the Gauss Seidel Method.
*   **Algorithm**:
    1. Modify Jacobi to use variable updates immediately:
       $$x_i^{(k+1)} = \frac{b_i - \sum_{j < i} a_{ij} x_j^{(k+1)} - \sum_{j > i} a_{ij} x_j^{(k)}}{a_{ii}}$$
*   **Flow of Program**:
    *   Same as Jacobi, but variables are updated in-place inside the active solution array.

### C Program
```c
#include <stdio.h>
#include <math.h>

int main() {
    int n, max_iter, iter = 0;
    double a[10][11], x[10], x_old[10], tol, sum;

    printf("Enter number of unknowns: ");
    scanf("%d", &n);

    printf("Enter tolerance and max iterations: ");
    scanf("%lf %d", &tol, &max_iter);

    printf("Enter Augmented Matrix elements row-wise:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= n; j++) {
            scanf("%lf", &a[i][j]);
        }
    }

    for (int i = 0; i < n; i++) {
        x[i] = 0.0;
    }

    printf("\nIteration traces:\n");
    while (iter < max_iter) {
        /* Store historical states for convergence comparison */
        for (int i = 0; i < n; i++) {
            x_old[i] = x[i];
        }

        for (int i = 0; i < n; i++) {
            sum = 0.0;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    /* Gauss-Seidel uses the updated value of x[j] directly */
                    sum = sum + a[i][j] * x[j];
                }
            }
            if (fabs(a[i][i]) < 1e-15) {
                printf("Error: Diagonal element is zero!\n");
                return 1;
            }
            x[i] = (a[i][n] - sum) / a[i][i];
        }

        iter++;
        printf("Iter %d: ", iter);
        for (int i = 0; i < n; i++) printf("x%d=%f ", i+1, x[i]);
        printf("\n");

        int converged = 1;
        for (int i = 0; i < n; i++) {
            if (fabs(x[i] - x_old[i]) >= tol) {
                converged = 0;
                break;
            }
        }

        if (converged) {
            printf("\nConverged!\n");
            return 0;
        }
    }

    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter number of unknowns: 3
    Enter tolerance and max iterations: 0.0001 50
    Enter Augmented Matrix:
    20 1 -2 17
    3 20 -1 -18
    2 -3 20 25
    ```
*   **Sample Output**:
    ```text
    Iter 4: x1=1.000000 x2=-1.000000 x3=1.000000
    ```
*   **Viva Questions**:
    1.  *Why does Gauss-Seidel converge faster than Gauss-Jacobi?*
        Because it immediately utilizes the newly calculated values of variables within the current iteration.
*   **Expected Result**: Faster convergence to root vectors.

---

## 12. Matrix Inversion

*   **Aim**: To find the inverse of a square matrix using the Gauss-Jordan method.
*   **Algorithm**:
    1. Form augmented matrix $[A|I]$ where $I$ is identity.
    2. Apply Gauss-Jordan row operations to convert the left block to Identity.
    3. The right block contains $A^{-1}$.
*   **Flow of Program**:
    *   Input matrix size $n \to$ Populate augmented array with Identity values $\to$ Run pivot and normalization loops $\to$ Print right half.

### C Program
```c
#include <stdio.h>
#include <math.h>

int main() {
    int n;
    double a[10][20], ratio;

    printf("Enter matrix size (n): ");
    scanf("%d", &n);

    printf("Enter matrix elements row-wise:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%lf", &a[i][j]);
        }
    }

    /* Build Augmented Matrix [A | I] */
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            a[i][j + n] = (i == j) ? 1.0 : 0.0;
        }
    }

    /* Gauss Jordan Elimination */
    for (int i = 0; i < n; i++) {
        /* Pivot search */
        int max_row = i;
        for (int k = i + 1; k < n; k++) {
            if (fabs(a[k][i]) > fabs(a[max_row][i])) {
                max_row = k;
            }
        }
        /* Row swap */
        if (max_row != i) {
            for (int k = 0; k < 2 * n; k++) {
                double temp = a[i][k];
                a[i][k] = a[max_row][k];
                a[max_row][k] = temp;
            }
        }

        if (fabs(a[i][i]) < 1e-15) {
            printf("Error: Matrix is singular. Inverse does not exist!\n");
            return 1;
        }

        double pivot = a[i][i];
        for (int k = 0; k < 2 * n; k++) {
            a[i][k] /= pivot;
        }

        for (int j = 0; j < n; j++) {
            if (j != i) {
                ratio = a[j][i];
                for (int k = 0; k < 2 * n; k++) {
                    a[j][k] = a[j][k] - ratio * a[i][k];
                }
            }
        }
    }

    printf("\nInverse Matrix:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            printf("%f\t", a[i][j + n]);
        }
        printf("\n");
    }
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter matrix size (n): 3
    Enter matrix elements row-wise:
    2 5 7
    6 3 4
    5 -2 -3
    ```
*   **Sample Output**:
    ```text
    Inverse Matrix:
      1.000000   -1.000000    1.000000
    -38.000000   41.000000  -34.000000
     27.000000  -29.000000   24.000000
    ```
*   **Viva Questions**:
    1.  *What makes a matrix invertible?*
        It must be square, and its determinant must be non-zero (non-singular).
*   **Expected Result**: Inverse matrix successfully computed.

---

## 13. Trapezoidal Rule

*   **Aim**: To integrate a function $f(x) = x^3$ using the Trapezoidal Rule.
*   **Algorithm**:
    1. Define $f(x) = x^3$.
    2. Input intervals $a, b$, and number of divisions $n$.
    3. Set step size $h = \frac{b-a}{n}$.
    4. Compute integral approximation:
       $$\text{Integral} = \frac{h}{2} [ f(a) + f(b) + 2 \sum_{i=1}^{n-1} f(a + ih) ]$$
*   **Flow of Program**:
    *   Input interval and division count $\to$ Initialize sum to endpoints $\to$ Use integer counter loop to add intermediate steps $\to$ Divide by 2 $\to$ Multiply by $h$.

### C Program
```c
#include <stdio.h>
#include <math.h>

double f(double x) {
    return x * x * x; /* Function: x^3 */
}

int main() {
    int n;
    double a, b, h, sum, x_val;

    printf("Enter interval bounds [a, b]: ");
    scanf("%lf %lf", &a, &b);

    printf("Enter number of sub-intervals (n): ");
    scanf("%d", &n);

    h = (b - a) / n;
    sum = f(a) + f(b);

    for (int i = 1; i < n; i++) {
        x_val = a + i * h;
        sum = sum + 2.0 * f(x_val);
    }

    double result = (h * sum) / 2.0;
    printf("\nCalculated value of the integral = %f\n", result);
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter interval bounds [a, b]: 0 1
    Enter number of sub-intervals (n): 100
    ```
*   **Sample Output**:
    ```text
    Calculated value of the integral = 0.250025
    ```
*   **Viva Questions**:
    1.  *What is the order of error in the Trapezoidal Rule?*
        The global error is of order $O(h^2)$.
*   **Expected Result**: Output approximates the analytical integral $\int_0^1 x^3 \,dx = 0.25$.

---

## 14. Simpson's 1/3 Rule

*   **Aim**: To integrate $f(x) = 1/(1+x^2)$ using Simpson's 1/3 Rule.
*   **Algorithm**:
    1. Ensure $n$ is even.
    2. Set $h = \frac{b-a}{n}$.
    3. Evaluate:
       $$\text{Integral} = \frac{h}{3} [ f(a) + f(b) + 4 \sum_{i \text{ odd}} f(x_i) + 2 \sum_{i \text{ even}} f(x_i) ]$$
*   **Flow of Program**:
    *   Read input variables $\to$ Enforce even intervals guard $\to$ Loop calculation splitting odd/even sum loops $\to$ Compute final result.

### C Program
```c
#include <stdio.h>
#include <math.h>

double f(double x) {
    return 1.0 / (1.0 + x * x);
}

int main() {
    int n;
    double a, b, h, sum, x_val;

    printf("Enter interval bounds [a, b]: ");
    scanf("%lf %lf", &a, &b);

    printf("Enter number of sub-intervals (n) [MUST BE EVEN]: ");
    scanf("%d", &n);

    if (n % 2 != 0) {
        printf("Error: Intervals (n) must be even for Simpson's 1/3 Rule.\n");
        return 1;
    }

    h = (b - a) / n;
    sum = f(a) + f(b);

    for (int i = 1; i < n; i++) {
        x_val = a + i * h;
        if (i % 2 == 0) {
            sum = sum + 2.0 * f(x_val);
        } else {
            sum = sum + 4.0 * f(x_val);
        }
    }

    double result = (h * sum) / 3.0;
    printf("\nCalculated value of the integral = %f\n", result);
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter interval bounds [a, b]: 0 6
    Enter number of sub-intervals (n) [MUST BE EVEN]: 6
    ```
*   **Sample Output**:
    ```text
    Calculated value of the integral = 1.366174
    ```
*   **Viva Questions**:
    1.  *Why must n be even for Simpson's 1/3 Rule?*
        Because the method approximates the curve using quadratic parabolas, which requires pairs of subintervals (3 points per segment).
*   **Expected Result**: Output tracks the analytical limit $\arctan(6) \approx 1.4056$.

---

## 15. Simpson's 3/8 Rule

*   **Aim**: To integrate $f(x) = 1/(1+x^2)$ using Simpson's 3/8 Rule.
*   **Algorithm**:
    1. Ensure $n$ is divisible by 3.
    2. Set $h = \frac{b-a}{n}$.
    3. Evaluate:
       $$\text{Integral} = \frac{3h}{8} [ f(a) + f(b) + 2 \sum_{i \text{ mult of 3}} f(x_i) + 3 \sum_{i \text{ other}} f(x_i) ]$$
*   **Flow of Program**:
    *   Read variables $\to$ Check divisibility of $n$ by 3 $\to$ Accumulate terms $\to$ Multiply by $\frac{3h}{8}$.

### C Program
```c
#include <stdio.h>
#include <math.h>

double f(double x) {
    return 1.0 / (1.0 + x * x);
}

int main() {
    int n;
    double a, b, h, sum, x_val;

    printf("Enter interval bounds [a, b]: ");
    scanf("%lf %lf", &a, &b);

    printf("Enter number of sub-intervals (n) [MULTIPLE OF 3]: ");
    scanf("%d", &n);

    if (n % 3 != 0) {
        printf("Error: Intervals (n) must be a multiple of 3.\n");
        return 1;
    }

    h = (b - a) / n;
    sum = f(a) + f(b);

    for (int i = 1; i < n; i++) {
        x_val = a + i * h;
        if (i % 3 == 0) {
            sum = sum + 2.0 * f(x_val);
        } else {
            sum = sum + 3.0 * f(x_val);
        }
    }

    double result = (3.0 * h * sum) / 8.0;
    printf("\nCalculated value of the integral = %f\n", result);
    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter interval bounds [a, b]: 0 6
    Enter number of sub-intervals (n) [MULTIPLE OF 3]: 6
    ```
*   **Sample Output**:
    ```text
    Calculated value of the integral = 1.357081
    ```
*   **Viva Questions**:
    1.  *What is the order of local error in Simpson's 3/8 Rule?*
        $O(h^5)$.
*   **Expected Result**: Correct integration approximation.

---

## 16. Euler Method

*   **Aim**: To solve the ordinary differential equation $dy/dx = x + y$, with $y(0)=1$, using Euler's Method.
*   **Algorithm**:
    1. Define $f(x, y) = x + y$.
    2. Input initial values $x_0, y_0$, final target $x_{\text{end}}$, and step size $h$.
    3. While $x < x_{\text{end}}$:
       *   Calculate $y_{\text{next}} = y + h \cdot f(x, y)$.
       *   Update $x = x + h$.
       *   Update $y = y_{\text{next}}$.
*   **Flow of Program**:
    *   Input conditions $\to$ Loop calculation $\to$ Print step values at each iteration.

### C Program
```c
#include <stdio.h>
#include <math.h>

double f(double x, double y) {
    return x + y;
}

int main() {
    double x0, y0, x_end, h, x, y;

    printf("Enter initial conditions [x0, y0]: ");
    scanf("%lf %lf", &x0, &y0);

    printf("Enter final value of x and step size h: ");
    scanf("%lf %lf", &x_end, &h);

    x = x0;
    y = y0;

    printf("\n   x\t\t   y\t\t dy/dx\t\t  y_new\n");
    printf("----------------------------------------------------------------\n");

    while (x < x_end + 1e-9) {
        double y_new = y + h * f(x, y);
        printf("%f\t%f\t%f\t%f\n", x, y, f(x, y), y_new);
        y = y_new;
        x = x + h;
    }

    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter initial conditions [x0, y0]: 0 1
    Enter final value of x and step size h: 1 0.2
    ```
*   **Sample Output**:
    ```text
    x              y             dy/dx            y_new
    0.000000       1.000000      1.000000         1.200000
    ...
    ```
*   **Viva Questions**:
    1.  *Is Euler's method single-step or multi-step?*
        It is a single-step method.
*   **Expected Result**: Output values approximate the analytical solution curve.

---

## 17. Taylor Method

*   **Aim**: To solve the ordinary differential equation $dy/dx = x - y^2$, with $y(0)=1$, using the Taylor Series Method of 2nd order.
*   **Algorithm**:
    1. Compute derivatives analytically:
       *   $y' = x - y^2$
       *   $y'' = 1 - 2yy'$
    2. Advance solution step:
       $$y_{n+1} = y_n + h y'_n + \frac{h^2}{2} y''_n$$
*   **Flow of Program**:
    *   Input boundaries $\to$ Evaluate $y'$ and $y''$ $\to$ Add Taylor terms $\to$ Print output.

### C Program
```c
#include <stdio.h>
#include <math.h>

double dy1(double x, double y) {
    return x - y * y; /* First derivative y' */
}

double dy2(double x, double y) {
    return 1.0 - 2.0 * y * dy1(x, y); /* Second derivative y'' */
}

int main() {
    double x0, y0, x_end, h, x, y;

    printf("Enter initial conditions [x0, y0]: ");
    scanf("%lf %lf", &x0, &y0);

    printf("Enter final value of x and step size h: ");
    scanf("%lf %lf", &x_end, &h);

    x = x0;
    y = y0;

    printf("\n   x\t\t   y\t\t   y'\t\t   y''\n");
    printf("----------------------------------------------------------------\n");

    while (x < x_end + 1e-9) {
        double y_prime = dy1(x, y);
        double y_double_prime = dy2(x, y);
        
        printf("%f\t%f\t%f\t%f\n", x, y, y_prime, y_double_prime);

        y = y + h * y_prime + (h * h / 2.0) * y_double_prime;
        x = x + h;
    }

    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter initial conditions [x0, y0]: 0 1
    Enter final value of x and step size h: 0.5 0.1
    ```
*   **Sample Output**:
    ```text
    Calculated values approximating the solution curve.
    ```
*   **Viva Questions**:
    1.  *What is the main limitation of Taylor's Series Method?*
        It requires finding higher-order analytical derivatives, which can be extremely tedious for complex functions.
*   **Expected Result**: Successful numerical step progression.

---

## 18. Runge Kutta Method

*   **Aim**: To solve $dy/dx = x + y$, with $y(0)=1$, using the Runge-Kutta 4th Order (RK4) Method.
*   **Algorithm**:
    1. Compute coefficients:
       $$\begin{aligned}
       k_1 &= h \cdot f(x_n, y_n) \\
       k_2 &= h \cdot f(x_n + h/2, y_n + k_1/2) \\
       k_3 &= h \cdot f(x_n + h/2, y_n + k_2/2) \\
       k_4 &= h \cdot f(x_n + h, y_n + k_3)
       \end{aligned}$$
    2. Compute update:
       $$y_{n+1} = y_n + \frac{k_1 + 2k_2 + 2k_3 + k_4}{6}$$
*   **Flow of Program**:
    *   Input conditions $\to$ Loop calculation of $k_1, k_2, k_3, k_4$ values $\to$ Advance variables $\to$ Print step values.

### C Program
```c
#include <stdio.h>
#include <math.h>

double f(double x, double y) {
    return x + y;
}

int main() {
    double x0, y0, x_end, h, x, y;
    double k1, k2, k3, k4;

    printf("Enter initial conditions [x0, y0]: ");
    scanf("%lf %lf", &x0, &y0);

    printf("Enter final value of x and step size h: ");
    scanf("%lf %lf", &x_end, &h);

    x = x0;
    y = y0;

    printf("\n   x\t\t   y\t\t   y_new\n");
    printf("---------------------------------------------\n");

    while (x < x_end + 1e-9) {
        k1 = h * f(x, y);
        k2 = h * f(x + h / 2.0, y + k1 / 2.0);
        k3 = h * f(x + h / 2.0, y + k2 / 2.0);
        k4 = h * f(x + h, y + k3);

        double y_new = y + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
        printf("%f\t%f\t%f\n", x, y, y_new);
        
        y = y_new;
        x = x + h;
    }

    return 0;
}
```

*   **Sample Input**:
    ```text
    Enter initial conditions [x0, y0]: 0 1
    Enter final value of x and step size h: 1 0.2
    ```
*   **Sample Output**:
    ```text
    x              y             y_new
    0.000000       1.000000      1.242800
    ...
    ```
*   **Viva Questions**:
    1.  *What is the order of accuracy of the RK4 method?*
        It matches the Taylor series up to the term of $O(h^4)$ (4th order accuracy).
*   **Expected Result**: Extremely accurate solutions matching analytical solutions.
