/*
 * Newton-Raphson Method
 * =====================
 * Finds a root of f(x) = 0 using the iterative formula:
 *     x_{n+1} = x_n - f(x_n) / f'(x_n)
 *
 * Prerequisites:
 *   - f'(x) ≠ 0 near the root.
 *   - Initial guess x0 should be "close enough" to the root.
 *
 * Convergence: Quadratic (order 2) when f'(root) ≠ 0.
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o newton_raphson Newton_Raphson.c -lm
 *
 * Sample Input:
 *   Enter initial guess x0: 2.0
 *   Enter tolerance: 0.0001
 *   Enter max iterations: 100
 *
 * Expected Output:
 *   Root ≈ 2.094551 (for f(x) = x³ - 2x - 5)
 *
 * BUGS FIXED FROM ORIGINAL:
 *   1. Line 45 had `x1 = x2` instead of `x0 = x2` — x0 was UNINITIALIZED
 *   2. No check for f'(x) = 0 (division by zero)
 *   3. float → double for precision
 */

#include <stdio.h>
#include <math.h>

/* ===== MODIFY THESE FUNCTIONS TO CHANGE THE EQUATION ===== */
/*  f(x)  = x^3 - 2x - 5                                    */
/*  f'(x) = 3x^2 - 2                                        */
/*  Known root: x ≈ 2.09455148                               */
double f(double x)
{
    return x * x * x - 2.0 * x - 5.0;
}

double f_prime(double x)
{
    return 3.0 * x * x - 2.0;
}
/* ========================================================= */

int main(void)
{
    double x0, x1;
    double fx, fpx;
    double tolerance;
    int max_iter, iter;

    /* --- Input --- */
    printf("Enter initial guess x0: ");
    if (scanf("%lf", &x0) != 1) {
        fprintf(stderr, "Error: Invalid input.\n");
        return 1;
    }

    printf("Enter tolerance (e.g. 0.0001): ");
    if (scanf("%lf", &tolerance) != 1 || tolerance <= 0.0) {
        fprintf(stderr, "Error: Tolerance must be a positive number.\n");
        return 1;
    }

    printf("Enter max iterations: ");
    if (scanf("%d", &max_iter) != 1 || max_iter <= 0) {
        fprintf(stderr, "Error: Max iterations must be a positive integer.\n");
        return 1;
    }

    printf("\n%-10s %-18s %-18s %-18s\n",
           "Iter", "x_n", "f(x_n)", "f'(x_n)");
    printf("--------------------------------------------------------------\n");

    /* --- Newton-Raphson iterations --- */
    for (iter = 1; iter <= max_iter; iter++) {
        fx = f(x0);
        fpx = f_prime(x0);

        /* Check for zero derivative (horizontal tangent) */
        if (fabs(fpx) < 1e-15) {
            fprintf(stderr, "\nError: f'(%.10f) ≈ 0. Method fails.\n", x0);
            fprintf(stderr, "Try a different starting point.\n");
            return 1;
        }

        x1 = x0 - fx / fpx;

        printf("%-10d %-18.10f %-18.10f %-18.10f\n", iter, x0, fx, fpx);

        /* Convergence check */
        if (fabs(x1 - x0) < tolerance) {
            printf("\n✓ Converged after %d iterations.\n", iter);
            printf("  Root    = %.10f\n", x1);
            printf("  f(root) = %.2e\n", f(x1));
            return 0;
        }

        x0 = x1;
    }

    /* Did not converge */
    printf("\n✗ Did NOT converge within %d iterations.\n", max_iter);
    printf("  Last approximation = %.10f\n", x1);
    printf("  f(approx)          = %.2e\n", f(x1));

    return 0;
}