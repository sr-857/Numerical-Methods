/*
 * Curve Fitting: Straight Line (y = a + b * x)
 * ============================================
 * Finds the best-fit line through n observations using Least Squares Regression.
 *
 * Normal Equations:
 *   n * a       + sum(x) * b = sum(y)
 *   sum(x) * a  + sum(x^2) * b = sum(x*y)
 *
 * Solved using Cramer's Rule or elimination.
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o fit_line Fit_Straight_Line_Curve_Fitting.c -lm
 *
 * Sample Input:
 *   Enter no. of observations: 5
 *   Enter values of x: 1 2 3 4 5
 *   Enter values of y: 14 27 40 55 68
 *
 * Expected Output:
 *   Intercept (a) = 0.00, Slope (b) = 13.60
 *   Equation of The line: y = 0.00 + 13.60x
 *
 * BUGS FIXED FROM ORIGINAL:
 *   1. Line 37 had `int ratio = ...` which truncated float division to integer.
 *   2. float -> double
 *   3. Added validation for n < 2
 *   4. Guarded against division by zero (determinant check)
 */

#include <stdio.h>
#include <math.h>

#define MAX_POINTS 100

int main(void)
{
    int n;
    double sum_x = 0.0, sum_y = 0.0, sum_xy = 0.0, sum_x2 = 0.0;
    double a, b, denom;

    /* --- Input --- */
    printf("Enter no. of observations: ");
    if (scanf("%d", &n) != 1 || n < 2 || n > MAX_POINTS)
    {
        fprintf(stderr, "Error: Number of observations must be between 2 and %d.\n", MAX_POINTS);
        return 1;
    }

    double x[MAX_POINTS], y[MAX_POINTS];

    printf("Enter %d values of x:\n", n);
    for (int i = 0; i < n; i++)
    {
        if (scanf("%lf", &x[i]) != 1)
        {
            fprintf(stderr, "Error: Invalid input for x[%d].\n", i);
            return 1;
        }
    }

    printf("Enter %d values of y:\n", n);
    for (int i = 0; i < n; i++)
    {
        if (scanf("%lf", &y[i]) != 1)
        {
            fprintf(stderr, "Error: Invalid input for y[%d].\n", i);
            return 1;
        }
    }

    /* --- Computations --- */
    for (int i = 0; i < n; i++)
    {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += x[i] * y[i];
        sum_x2 += x[i] * x[i];
    }

    /*
     * Solving system:
     *   [ n       sum_x  | sum_y  ]
     *   [ sum_x   sum_x2 | sum_xy ]
     *
     * Determinant:
     */
    denom = n * sum_x2 - sum_x * sum_x;
    if (fabs(denom) < 1e-15)
    {
        fprintf(stderr, "Error: Determinant is zero. Cannot fit line (all X values might be identical).\n");
        return 1;
    }

    /* Cramer's Rule */
    a = (sum_y * sum_x2 - sum_xy * sum_x) / denom; /* Intercept */
    b = (n * sum_xy - sum_x * sum_y) / denom;      /* Slope */

    /* --- Output --- */
    printf("\n--- Results ---\n");
    printf("Sum of X   = %.4f\n", sum_x);
    printf("Sum of Y   = %.4f\n", sum_y);
    printf("Sum of XY  = %.4f\n", sum_xy);
    printf("Sum of X^2 = %.4f\n", sum_x2);
    printf("\nIntercept (a) = %.4f\n", a);
    printf("Slope (b)     = %.4f\n", b);
    printf("\nEquation of The line: y = %.4f + %.4fx\n", a, b);

    return 0;
}