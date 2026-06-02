/*
 * Gauss Elimination Method (with Partial Pivoting)
 * ================================================
 * Solves a system of linear equations A * x = B.
 *
 * Steps:
 *   1. Forward Elimination with Partial Pivoting:
 *      Transform augmented matrix [A|B] to Upper Triangular form.
 *      Pivoting swaps rows to place the largest absolute value in the pivot position,
 *      which minimizes rounding errors and avoids division by zero.
 *   2. Back Substitution:
 *      Solve for variables from bottom to top.
 *
 * Complexity: O(N^3)
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o gauss_elimination Gauss_Elimination.c -lm
 *
 * Sample Input:
 *   Enter no of Unknowns: 3
 *   Enter the Augmented Matrix:
 *   2 1 1 10
 *   3 2 3 18
 *   1 4 9 16
 *
 * Expected Output:
 *   Values of unknowns are:
 *   Value[0] = 7.000000
 *   Value[1] = -9.000000
 *   Value[2] = 5.000000
 */

#include <stdio.h>
#include <math.h>
#include <stdlib.h>

#define MAX_N 100

/* Converts the Augmented matrix to Upper Triangular Matrix form with Partial Pivoting */
int convertToUpperTriangular(double a[MAX_N][MAX_N + 1], int n)
{
    int i, j, k, max_row;
    double ratio, temp;

    for (i = 0; i < n; i++)
    {
        /* 1. Partial Pivoting: Find the row with the largest absolute value in column i */
        max_row = i;
        for (k = i + 1; k < n; k++)
        {
            if (fabs(a[k][i]) > fabs(a[max_row][i]))
            {
                max_row = k;
            }
        }

        /* Swap the current row with the max_row if they are different */
        if (max_row != i)
        {
            for (k = 0; k <= n; k++)
            {
                temp = a[i][k];
                a[i][k] = a[max_row][k];
                a[max_row][k] = temp;
            }
        }

        /* Check for singularity (or near-singularity) */
        if (fabs(a[i][i]) < 1e-15)
        {
            return 0; /* Matrix is singular or close to it */
        }

        /* 2. Elimination */
        for (j = i + 1; j < n; j++)
        {
            ratio = a[j][i] / a[i][i];
            for (k = i; k <= n; k++)
            {
                a[j][k] -= ratio * a[i][k];
            }
        }

        /* Optional: Print intermediate form */
        printf("\nIntermediate form after Step %d:\n", i + 1);
        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c <= n; c++)
            {
                printf("%10.4f ", a[r][c]);
            }
            printf("\n");
        }
    }
    return 1; /* Success */
}

/* Performs Back Substitution to find values of Unknowns */
int applyBackSubstitution(double a[MAX_N][MAX_N + 1], double value[], int n)
{
    int i, j;
    double sum;

    for (i = n - 1; i >= 0; i--)
    {
        if (fabs(a[i][i]) < 1e-15)
        {
            return 0; /* Division by zero check */
        }

        sum = 0.0;
        for (j = i + 1; j < n; j++)
        {
            sum += a[i][j] * value[j];
        }
        value[i] = (a[i][n] - sum) / a[i][i];
    }
    return 1;
}

/* Prints the Value of Unknowns */
void printUnknowns(double value[], int n)
{
    printf("\nValues of unknowns are:\n");
    for (int i = 0; i < n; i++)
    {
        printf("Value[%d] = %f\n", i, value[i]);
    }
}

int main(void)
{
    int n, i, j;
    double a[MAX_N][MAX_N + 1];
    double value[MAX_N];

    printf("Enter no of Unknowns: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N)
    {
        fprintf(stderr, "Error: Invalid number of unknowns. Must be between 1 and %d.\n", MAX_N);
        return 1;
    }

    printf("Enter the Augmented Matrix:\n");
    for (i = 0; i < n; i++)
    {
        for (j = 0; j <= n; j++)
        {
            if (scanf("%lf", &a[i][j]) != 1)
            {
                fprintf(stderr, "Error: Invalid matrix element input.\n");
                return 1;
            }
        }
    }

    if (!convertToUpperTriangular(a, n))
    {
        fprintf(stderr, "\nError: Matrix is singular or near-singular. Unique solution does not exist.\n");
        return 1;
    }

    if (!applyBackSubstitution(a, value, n))
    {
        fprintf(stderr, "\nError: Division by zero encountered during back substitution.\n");
        return 1;
    }

    printUnknowns(value, n);
    return 0;
}
