/*
 * Curve Fitting: 2nd Degree Parabola (y = a + b * x + c * x^2)
 * ============================================================
 * Fits a parabola through n observations using Least Squares Regression.
 *
 * Normal Equations:
 *   n * a       + sum(x) * b   + sum(x^2) * c = sum(y)
 *   sum(x) * a  + sum(x^2) * b  + sum(x^3) * c = sum(x*y)
 *   sum(x^2) * a + sum(x^3) * b  + sum(x^4) * c = sum(x^2*y)
 *
 * This system is solved using Gauss Elimination with Partial Pivoting.
 * Note: The coefficients returned are:
 *   value[0] = a (intercept / constant term)
 *   value[1] = b (linear coefficient)
 *   value[2] = c (quadratic coefficient)
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o fit_parabola Fit_Parabola_Curve_Fitting.c -lm
 *
 * Sample Input:
 *   Enter no. of observations: 5
 *   Enter values of x: 0 1 2 3 4
 *   Enter values of y: 1 1.8 1.3 2.5 6.3
 *
 * Expected Output:
 *   Value of a (c) = 1.13, b = -0.55, c (a) = 0.44
 *   Equation: y = 1.13 - 0.55x + 0.44x^2
 */

#include <stdio.h>
#include <math.h>
#include <stdlib.h>

#define MAX_POINTS 100

/* Solves 3x3 augmented matrix using Gauss Elimination with Partial Pivoting */
int solveSystem(double a[3][4], double value[3])
{
    int n = 3;
    for (int i = 0; i < n; i++)
    {
        /* Find pivot row */
        int max_row = i;
        for (int k = i + 1; k < n; k++)
        {
            if (fabs(a[k][i]) > fabs(a[max_row][i]))
            {
                max_row = k;
            }
        }

        /* Swap rows */
        if (max_row != i)
        {
            for (int k = 0; k <= n; k++)
            {
                double temp = a[i][k];
                a[i][k] = a[max_row][k];
                a[max_row][k] = temp;
            }
        }

        /* Singularity check */
        if (fabs(a[i][i]) < 1e-15)
        {
            return 0;
        }

        /* Eliminate */
        for (int j = i + 1; j < n; j++)
        {
            double ratio = a[j][i] / a[i][i];
            for (int k = i; k <= n; k++)
            {
                a[j][k] -= ratio * a[i][k];
            }
        }
    }

    /* Back substitution */
    for (int i = n - 1; i >= 0; i--)
    {
        double sum = 0.0;
        for (int j = i + 1; j < n; j++)
        {
            sum += a[i][j] * value[j];
        }
        value[i] = (a[i][n] - sum) / a[i][i];
    }
    return 1;
}

int main(void)
{
    int n;
    double sx = 0.0, sy = 0.0, sxy = 0.0, sx2y = 0.0, sx2 = 0.0, sx3 = 0.0, sx4 = 0.0;
    double augmented_matrix[3][4];
    double value[3];

    /* --- Input --- */
    printf("Enter no. of observations: ");
    if (scanf("%d", &n) != 1 || n < 3 || n > MAX_POINTS)
    {
        fprintf(stderr, "Error: Number of observations must be between 3 and %d.\n", MAX_POINTS);
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
        double x2 = x[i] * x[i];
        sx += x[i];
        sy += y[i];
        sxy += x[i] * y[i];
        sx2y += x2 * y[i];
        sx2 += x2;
        sx3 += x2 * x[i];
        sx4 += x2 * x2;
    }

    /* Create the Augmented Matrix for normal equations:
     *   [  n     sx    sx2  |  sy   ]
     *   [  sx    sx2   sx3  |  sxy  ]
     *   [  sx2   sx3   sx4  |  sx2y ]
     *
     * Note: We match standard ordering to solve for a, b, c in the model y = a + b*x + c*x^2
     */
    augmented_matrix[0][0] = (double)n;
    augmented_matrix[0][1] = sx;
    augmented_matrix[0][2] = sx2;
    augmented_matrix[0][3] = sy;

    augmented_matrix[1][0] = sx;
    augmented_matrix[1][1] = sx2;
    augmented_matrix[1][2] = sx3;
    augmented_matrix[1][3] = sxy;

    augmented_matrix[2][0] = sx2;
    augmented_matrix[2][1] = sx3;
    augmented_matrix[2][2] = sx4;
    augmented_matrix[2][3] = sx2y;

    if (!solveSystem(augmented_matrix, value))
    {
        fprintf(stderr, "Error: The system of normal equations is singular. Unique parabola cannot be fit.\n");
        return 1;
    }

    /* Output Equation */
    printf("\nValue of a (constant term)  = %.4f\n", value[0]);
    printf("Value of b (linear term)    = %.4f\n", value[1]);
    printf("Value of c (quadratic term) = %.4f\n", value[2]);
    printf("\nEquation of The Parabola: y = %.4f + %.4fx + %.4fx^2\n", value[0], value[1], value[2]);

    return 0;
}