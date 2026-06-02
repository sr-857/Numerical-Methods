/*
 * Secant Method
 * =============
 * Finds a root of f(x) = 0 using two initial approximations (no derivative needed):
 *     x_{n+1} = (x_{n-1}·f(x_n) - x_n·f(x_{n-1})) / (f(x_n) - f(x_{n-1}))
 *
 * Unlike Regula Falsi, the bracket is NOT maintained — both points are updated.
 * Unlike Newton-Raphson, no derivative is required.
 *
 * Convergence: Order ≈ 1.618 (golden ratio, superlinear).
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o secant Secant_Method.c -lm
 *
 * Sample Input:
 *   Enter x0 and x1: 2 3
 *   Enter tolerance: 0.0001
 *   Enter max iterations: 100
 *
 * Expected Output:
 *   Root ≈ 2.094551 (for f(x) = x³ - 2x - 5)
 */

#include <stdio.h>
#include <math.h>

/* ===== MODIFY THIS FUNCTION TO CHANGE THE EQUATION ===== */
/*  f(x) = x^3 - 2x - 5                                   */
/*  Known root: x ≈ 2.09455148                             */
double f(double x)
{
    return x * x * x - 2.0 * x - 5.0;
}
/* ======================================================== */

int main(void)
{
    double x0, x1, x2;
    double f0, f1, f2;
    double tolerance;
    int max_iter, iter;

    /* --- Input --- */
    printf("Enter x0 and x1: ");
    if (scanf("%lf %lf", &x0, &x1) != 2) {
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

    f0 = f(x0);
    f1 = f(x1);

    printf("\n%-10s %-18s %-18s %-18s\n",
           "Iter", "x_{n-1}", "x_n", "x_{n+1}");
    printf("--------------------------------------------------------------\n");

    /* --- Secant iterations --- */
    for (iter = 1; iter <= max_iter; iter++) {
        /* Check for denominator being zero */
        double denom = f1 - f0;
        if (fabs(denom) < 1e-15) {
            fprintf(stderr, "\nError: f(x0) ≈ f(x1), denominator is zero.\n");
            fprintf(stderr, "  x0=%.10f, f(x0)=%.2e\n", x0, f0);
            fprintf(stderr, "  x1=%.10f, f(x1)=%.2e\n", x1, f1);
            return 1;
        }

        /* Secant formula */
        x2 = (x0 * f1 - x1 * f0) / denom;
        f2 = f(x2);

        printf("%-10d %-18.10f %-18.10f %-18.10f\n", iter, x0, x1, x2);

        /* Convergence check */
        if (fabs(x2 - x1) < tolerance) {
            printf("\n✓ Converged after %d iterations.\n", iter);
            printf("  Root    = %.10f\n", x2);
            printf("  f(root) = %.2e\n", f2);
            return 0;
        }

        /* Shift: x0 ← x1, x1 ← x2 */
        x0 = x1;  f0 = f1;
        x1 = x2;  f1 = f2;
    }

    /* Did not converge */
    printf("\n✗ Did NOT converge within %d iterations.\n", max_iter);
    printf("  Last approximation = %.10f\n", x2);
    printf("  f(approx)          = %.2e\n", f(x2));

    return 0;
}