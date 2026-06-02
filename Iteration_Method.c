/*
 * Fixed-Point Iteration Method (Successive Approximation)
 * =======================================================
 * Solves f(x) = 0 by rewriting as x = g(x) and iterating:
 *     x_{n+1} = g(x_n)
 *
 * Prerequisites:
 *   - |g'(x)| < 1 in the neighborhood of the root (contraction mapping).
 *
 * For f(x) = x³ + x² - 1 = 0:
 *   Rearrange: x² = 1/(1+x)  →  x = 1/√(1+x)  (taking positive root)
 *   So g(x) = 1/√(1+x),  valid for x > -1.
 *   g'(x) = -1 / (2·(1+x)^(3/2))
 *
 * Convergence: Linear (order 1), rate = |g'(root)|.
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o iteration Iteration_Method.c -lm
 *
 * Sample Input:
 *   Enter interval [a, b]: 0 1
 *   Enter tolerance: 0.0001
 *   Enter max iterations: 100
 *
 * Expected Output:
 *   Root ≈ 0.755179 (for f(x) = x³ + x² - 1)
 *
 * BUGS FIXED FROM ORIGINAL:
 *   1. g'(x) was `pow(1, pow(...))` which is ALWAYS 1.0 — completely wrong
 *   2. f(x) and g(x) were inconsistent (g wasn't derived from f)
 *   3. No domain validation for sqrt(1+x)
 */

#include <stdio.h>
#include <math.h>

/* ===== MODIFY THESE FUNCTIONS TO CHANGE THE EQUATION ===== */
/*                                                            */
/*  f(x)  = x^3 + x^2 - 1   (original equation)             */
/*  g(x)  = 1/sqrt(1+x)      (iteration function)            */
/*  g'(x) = -1/(2*(1+x)^(3/2))                               */
/*                                                            */
/*  Known root: x ≈ 0.75488                                   */
/*                                                            */
/*  IMPORTANT: g(x) must satisfy |g'(x)| < 1 near the root.  */
/* ========================================================== */

double f(double x)
{
    return x * x * x + x * x - 1.0;
}

double g(double x)
{
    return 1.0 / sqrt(1.0 + x);
}

double g_prime(double x)
{
    /* g'(x) = -1 / (2 * (1+x)^(3/2)) */
    double base = 1.0 + x;
    return -1.0 / (2.0 * base * sqrt(base));
}
/* ========================================================== */

int main(void)
{
    double a, b, x0, x1;
    double tolerance;
    int max_iter, iter;

    /* --- Input --- */
    printf("Enter interval [a, b]: ");
    if (scanf("%lf %lf", &a, &b) != 2) {
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

    /* --- Validate bracketing for original equation f(x) --- */
    if (f(a) * f(b) > 0.0) {
        fprintf(stderr, "Error: f(a) and f(b) must have opposite signs.\n");
        fprintf(stderr, "  f(%.6f) = %.6f\n", a, f(a));
        fprintf(stderr, "  f(%.6f) = %.6f\n", b, f(b));
        return 1;
    }

    /* Start from the midpoint of the bracket */
    x0 = (a + b) / 2.0;

    /* --- Check convergence condition: |g'(x0)| < 1 --- */
    if (1.0 + x0 <= 0.0) {
        fprintf(stderr, "Error: g(x) is undefined at x0 = %.6f (domain error).\n", x0);
        return 1;
    }

    double gp = fabs(g_prime(x0));
    if (gp >= 1.0) {
        fprintf(stderr, "Error: |g'(x0)| = %.6f >= 1. Method may NOT converge.\n", gp);
        fprintf(stderr, "  Try a different iteration function g(x).\n");
        return 1;
    }
    printf("\n|g'(x0)| = %.6f < 1 → Convergence condition satisfied.\n\n", gp);

    printf("%-10s %-18s %-18s %-15s\n",
           "Iter", "x_n", "g(x_n)", "|x_{n+1}-x_n|");
    printf("--------------------------------------------------------------\n");

    /* --- Fixed-point iterations --- */
    for (iter = 1; iter <= max_iter; iter++) {
        /* Domain check for g(x) */
        if (1.0 + x0 <= 0.0) {
            fprintf(stderr, "\nError: g(x) undefined at x = %.10f.\n", x0);
            return 1;
        }

        x1 = g(x0);
        double error = fabs(x1 - x0);

        printf("%-10d %-18.10f %-18.10f %-15.2e\n", iter, x0, x1, error);

        /* Convergence check */
        if (error < tolerance) {
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