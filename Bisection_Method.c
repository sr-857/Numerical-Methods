/*
 * Bisection Method
 * ================
 * Finds a root of f(x) = 0 in the interval [a, b].
 *
 * Prerequisites:
 *   - f(a) and f(b) must have opposite signs (IVT guarantees a root).
 *
 * Algorithm:
 *   1. Compute midpoint c = (a + b) / 2.
 *   2. If f(c) ≈ 0 or (b - a)/2 < tolerance, root found.
 *   3. If f(a)·f(c) < 0, root is in [a, c]; else root is in [c, b].
 *   4. Repeat until convergence or max iterations.
 *
 * Convergence: O(log2((b-a)/epsilon)) iterations guaranteed.
 * Order of convergence: Linear (1).
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o bisection Bisection_Method.c -lm
 *
 * Sample Input:
 *   Enter interval [a, b]: 2 3
 *   Enter tolerance (e.g. 0.0001): 0.0001
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
    double a, b, c;
    double fa, fb, fc;
    double tolerance;
    int max_iter, iter;

    /* --- Input --- */
    printf("Enter interval [a, b]: ");
    if (scanf("%lf %lf", &a, &b) != 2) {
        fprintf(stderr, "Error: Invalid input for interval.\n");
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

    /* --- Validate bracketing --- */
    fa = f(a);
    fb = f(b);

    if (fa * fb > 0.0) {
        fprintf(stderr, "Error: f(a) and f(b) must have opposite signs.\n");
        fprintf(stderr, "  f(%.6f) = %.6f\n", a, fa);
        fprintf(stderr, "  f(%.6f) = %.6f\n", b, fb);
        return 1;
    }

    /* Check if an endpoint is already a root */
    if (fabs(fa) < 1e-15) {
        printf("Root = %.10f (exact at endpoint a)\n", a);
        return 0;
    }
    if (fabs(fb) < 1e-15) {
        printf("Root = %.10f (exact at endpoint b)\n", b);
        return 0;
    }

    printf("\nRoots lie between %.6f and %.6f\n", a, b);
    printf("%-10s %-15s %-15s %-15s %-15s\n",
           "Iter", "a", "b", "c (midpoint)", "f(c)");
    printf("---------------------------------------------------------------------\n");

    /* --- Bisection iterations --- */
    for (iter = 1; iter <= max_iter; iter++) {
        c = a + (b - a) / 2.0;   /* avoids overflow vs (a+b)/2 */
        fc = f(c);

        printf("%-10d %-15.10f %-15.10f %-15.10f %-15.10f\n",
               iter, a, b, c, fc);

        /* Convergence check: root found or interval sufficiently small */
        if (fabs(fc) < 1e-15 || (b - a) / 2.0 < tolerance) {
            printf("\n✓ Converged after %d iterations.\n", iter);
            printf("  Root    = %.10f\n", c);
            printf("  f(root) = %.2e\n", fc);
            printf("  Error  <= %.2e\n", (b - a) / 2.0);
            return 0;
        }

        /* Update interval */
        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }
    }

    /* Did not converge within max iterations */
    c = a + (b - a) / 2.0;
    printf("\n✗ Did NOT converge within %d iterations.\n", max_iter);
    printf("  Best approximation = %.10f\n", c);
    printf("  f(approx)          = %.2e\n", f(c));
    printf("  Remaining interval = %.2e\n", b - a);

    return 0;
}