/*
 * Newton's Backward Interpolation Method
 * ========================================
 * Estimates y for a given x using n data points with EQUAL spacing.
 * Uses the backward difference table and the formula:
 *
 *   y(x) = y_n + u·∇y_n + u(u+1)/2!·∇²y_n + u(u+1)(u+2)/3!·∇³y_n + ...
 *
 * where u = (x - x_n) / h,  h = spacing, x_n = LAST x-value.
 *
 * Best suited when x is near the END of the table.
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o newton_backward Newton_Backward_Interpolation_Method.c -lm
 *
 * Sample Input:
 *   Enter no. of data points: 5
 *   Enter X values: 1891 1901 1911 1921 1931
 *   Enter Y values: 46 66 81 93 101
 *   Enter x for interpolation: 1925
 *
 * Expected Output:
 *   y(1925) ≈ 96.8368
 *
 * BUGS FIXED FROM ORIGINAL:
 *   1. Factorial computation used column index j instead of proper counter
 *   2. int fact overflow
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
    double u_product;
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
            return 1;
        }
    }

    printf("Enter x for interpolation: ");
    if (scanf("%lf", &x) != 1) {
        fprintf(stderr, "Error: Invalid input.\n");
        return 1;
    }

    /* --- Build forward difference table (used to extract backward differences) --- */
    for (j = 1; j < n; j++) {
        for (i = 0; i < n - j; i++) {
            diff[i][j] = diff[i + 1][j - 1] - diff[i][j - 1];
        }
    }

    /* --- Print difference table --- */
    printf("\nDifference Table:\n");
    printf("%-12s %-12s", "X", "Y");
    for (j = 1; j < n; j++)
        printf("∇^%-10d", j);
    printf("\n");

    for (i = 0; i < n; i++) {
        printf("%-12.4f ", X[i]);
        for (j = 0; j < n - i; j++)
            printf("%-12.6f ", diff[i][j]);
        printf("\n");
    }

    /*
     * --- Newton's backward interpolation formula ---
     *
     * For backward differences, use the LAST diagonal entries:
     *   ∇^k y_n = diff[n-1-k][k]  (the kth order backward diff at the last point)
     *
     * u = (x - x_{n-1}) / h    (note: u is typically negative or small positive)
     *
     * y = y_n + u·∇y_n + u(u+1)/2!·∇²y_n + ...
     */
    u = (x - X[n - 1]) / h;
    y = diff[n - 1][0];   /* y_n = last Y value */
    u_product = 1.0;
    factorial = 1.0;

    for (i = 1; i < n; i++) {
        u_product *= (u + (i - 1));  /* u, u(u+1), u(u+1)(u+2), ... */
        factorial *= i;              /* 1!, 2!, 3!, ... */

        /* Backward difference of order i at the last point:
         * diff[n-1-i][i] */
        y += (u_product * diff[n - 1 - i][i]) / factorial;
    }

    printf("\nu = (%.4f - %.4f) / %.4f = %.6f\n", x, X[n - 1], h, u);
    printf("\n✓ Interpolated value: y(%.4f) = %.6f\n", x, y);

    return 0;
}