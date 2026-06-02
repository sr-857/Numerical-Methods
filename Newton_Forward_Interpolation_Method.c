/*
 * Newton's Forward Interpolation Method
 * ======================================
 * Estimates y for a given x using n data points with EQUAL spacing.
 * Uses the forward difference table and the formula:
 *
 *   y(x) = y0 + u·Δy0 + u(u-1)/2!·Δ²y0 + u(u-1)(u-2)/3!·Δ³y0 + ...
 *
 * where u = (x - x0) / h,  h = spacing between x-values.
 *
 * Best suited when x is near the BEGINNING of the table.
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o newton_forward Newton_Forward_Interpolation_Method.c -lm
 *
 * Sample Input:
 *   Enter no. of data points: 5
 *   Enter X values: 1891 1901 1911 1921 1931
 *   Enter Y values: 46 66 81 93 101
 *   Enter x for interpolation: 1895
 *
 * Expected Output:
 *   y(1895) ≈ 54.6533
 *
 * BUGS FIXED FROM ORIGINAL:
 *   1. `int fact` overflows for n > 12
 *   2. Factorial and u-product update order was swapped (wrong intermediate values)
 *   3. float → double
 */

#include <stdio.h>
#include <math.h>

#define MAX_POINTS 50

int main(void)
{
    int n, i, j;
    double X[MAX_POINTS];
    double diff[MAX_POINTS][MAX_POINTS]; /* diff[i][j] = jth order difference */
    double x, h, u, y;
    double u_product; /* running product: u, u(u-1), u(u-1)(u-2), ... */
    double factorial;

    /* --- Input --- */
    printf("Enter no. of data points: ");
    if (scanf("%d", &n) != 1 || n < 2 || n > MAX_POINTS) {
        fprintf(stderr, "Error: n must be between 2 and %d.\n", MAX_POINTS);
        return 1;
    }

    printf("Enter %d X values:\n", n);
    for (i = 0; i < n; i++) {
        if (scanf("%lf", &X[i]) != 1) {
            fprintf(stderr, "Error: Invalid X value.\n");
            return 1;
        }
    }

    printf("Enter %d Y values:\n", n);
    for (i = 0; i < n; i++) {
        if (scanf("%lf", &diff[i][0]) != 1) {
            fprintf(stderr, "Error: Invalid Y value.\n");
            return 1;
        }
    }

    /* --- Check equal spacing --- */
    h = X[1] - X[0];
    if (fabs(h) < 1e-15) {
        fprintf(stderr, "Error: X values must be distinct (h = 0).\n");
        return 1;
    }
    for (i = 2; i < n; i++) {
        double hi = X[i] - X[i - 1];
        if (fabs(hi - h) > 1e-9 * fabs(h)) {
            fprintf(stderr, "Error: X values are NOT equally spaced.\n");
            fprintf(stderr, "  X[0]-X[1] = %.6f but X[%d]-X[%d] = %.6f\n",
                    h, i, i - 1, hi);
            fprintf(stderr, "Use Lagrange interpolation for unequal spacing.\n");
            return 1;
        }
    }

    printf("Enter x for interpolation: ");
    if (scanf("%lf", &x) != 1) {
        fprintf(stderr, "Error: Invalid input.\n");
        return 1;
    }

    /* --- Build forward difference table --- */
    /* diff[i][0] already holds Y[i] */
    for (j = 1; j < n; j++) {
        for (i = 0; i < n - j; i++) {
            diff[i][j] = diff[i + 1][j - 1] - diff[i][j - 1];
        }
    }

    /* --- Print difference table --- */
    printf("\nForward Difference Table:\n");
    printf("%-12s %-12s", "X", "Y");
    for (j = 1; j < n; j++)
        printf("Δ^%-10d", j);
    printf("\n");

    for (i = 0; i < n; i++) {
        printf("%-12.4f ", X[i]);
        for (j = 0; j < n - i; j++)
            printf("%-12.6f ", diff[i][j]);
        printf("\n");
    }

    /* --- Newton's forward interpolation formula --- */
    u = (x - X[0]) / h;
    y = diff[0][0];       /* y0 */
    u_product = 1.0;
    factorial = 1.0;

    for (i = 1; i < n; i++) {
        u_product *= (u - (i - 1));  /* u, u(u-1), u(u-1)(u-2), ... */
        factorial *= i;              /* 1!, 2!, 3!, ... */
        y += (u_product * diff[0][i]) / factorial;
    }

    printf("\nu = (%.4f - %.4f) / %.4f = %.6f\n", x, X[0], h, u);
    printf("\n✓ Interpolated value: y(%.4f) = %.6f\n", x, y);

    return 0;
}