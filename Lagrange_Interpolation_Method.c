/*
 * Lagrange Interpolation Method
 * ==============================
 * Estimates y for a given x using n data points (unequal spacing OK).
 *
 *   y(x) = Σ y_i · L_i(x)
 *
 * where L_i(x) = Π_{j≠i} (x - x_j) / (x_i - x_j)
 *
 * No difference table needed. Works for any spacing.
 * Complexity: O(n²) per evaluation.
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o lagrange Lagrange_Interpolation_Method.c -lm
 *
 * Sample Input:
 *   Enter no. of data points: 4
 *   Enter X values: 0 1 2 5
 *   Enter Y values: 2 3 12 147
 *   Enter x for interpolation: 3
 *
 * Expected Output:
 *   y(3) = 35.0 (polynomial is y = x³ + 2)
 *
 * BUGS FIXED FROM ORIGINAL:
 *   1. No check for duplicate X values (division by zero)
 *   2. float → double
 *   3. Missing return 0
 */

#include <stdio.h>
#include <math.h>

#define MAX_POINTS 50

int main(void)
{
    int n, i, j;
    double X[MAX_POINTS], Y[MAX_POINTS];
    double x, y, term;

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

    /* Check for duplicate X values */
    for (i = 0; i < n; i++) {
        for (j = i + 1; j < n; j++) {
            if (fabs(X[i] - X[j]) < 1e-15) {
                fprintf(stderr, "Error: Duplicate X values at indices %d and %d "
                        "(X = %.6f). Interpolation requires distinct X values.\n",
                        i, j, X[i]);
                return 1;
            }
        }
    }

    printf("Enter %d Y values:\n", n);
    for (i = 0; i < n; i++) {
        if (scanf("%lf", &Y[i]) != 1) {
            fprintf(stderr, "Error: Invalid Y value.\n");
            return 1;
        }
    }

    printf("Enter x for interpolation: ");
    if (scanf("%lf", &x) != 1) {
        fprintf(stderr, "Error: Invalid input.\n");
        return 1;
    }

    /* --- Print data table --- */
    printf("\nData Points:\n");
    printf("%-12s %-12s\n", "X", "Y");
    for (i = 0; i < n; i++)
        printf("%-12.4f %-12.4f\n", X[i], Y[i]);

    /* --- Lagrange interpolation formula --- */
    y = 0.0;
    for (i = 0; i < n; i++) {
        term = Y[i];
        for (j = 0; j < n; j++) {
            if (i != j) {
                term *= (x - X[j]) / (X[i] - X[j]);
            }
        }
        y += term;
    }

    printf("\n✓ Interpolated value: y(%.4f) = %.6f\n", x, y);

    return 0;
}