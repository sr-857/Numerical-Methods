/*
 * Regula Falsi (False Position) Method
 * =====================================
 * Finds a root of f(x) = 0 in the interval [a, b].
 *
 * Unlike Bisection which uses the midpoint, Regula Falsi uses the
 * x-intercept of the secant line joining (a, f(a)) and (b, f(b)):
 *     c = (a·f(b) - b·f(a)) / (f(b) - f(a))
 *
 * The bracket is always maintained (unlike the Secant Method).
 *
 * Convergence: Superlinear in general, but can degenerate to linear
 *              if one endpoint gets "stuck" (Illinois modification helps).
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o regula_falsi Regula_Falsi_Method.c -lm
 *
 * Sample Input:
 *   Enter interval [a, b]: 2 3
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
           "Iter", "a", "b", "c (false pos)", "f(c)");
    printf("---------------------------------------------------------------------\n");

    /* --- Regula Falsi iterations --- */
    for (iter = 1; iter <= max_iter; iter++) {
        /* Check for denominator being zero (f(b) == f(a)) */
        double denom = fb - fa;
        if (fabs(denom) < 1e-15) {
            fprintf(stderr, "Error: f(a) ≈ f(b), denominator is zero.\n");
            return 1;
        }

        /* False position formula */
        c = (a * fb - b * fa) / denom;
        fc = f(c);

        printf("%-10d %-15.10f %-15.10f %-15.10f %-15.10f\n",
               iter, a, b, c, fc);

        /* Convergence check */
        if (fabs(fc) < tolerance) {
            printf("\n✓ Converged after %d iterations.\n", iter);
            printf("  Root    = %.10f\n", c);
            printf("  f(root) = %.2e\n", fc);
            return 0;
        }

        /* Update interval (maintain bracket) */
        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }
    }

    /* Did not converge */
    printf("\n✗ Did NOT converge within %d iterations.\n", max_iter);
    printf("  Best approximation = %.10f\n", c);
    printf("  f(approx)          = %.2e\n", f(c));

    return 0;
}