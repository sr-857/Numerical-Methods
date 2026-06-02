/*
 * Gauss Jordan Method (with Partial Pivoting)
 * ===========================================
 * Solves a system of linear equations A * x = B.
 *
 * Steps:
 *   1. Diagonalization with Partial Pivoting:
 *      Transform the augmented matrix [A|B] into a diagonal form.
 *      Partial pivoting swaps rows to put the largest value on the diagonal.
 *   2. Normalization:
 *      Read values directly by dividing each constant term by the diagonal element:
 *      x_i = a[i][n] / a[i][i].
 *
 * Complexity: O(N^3)
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o gauss_jordan Gauss_Jordan.c -lm
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
 *   Value of Variable 0 = 7.000000
 *   Value of Variable 1 = -9.000000
 *   Value of Variable 2 = 5.000000
 */

#include <stdio.h>
#include <math.h>
#include <stdlib.h>

#define MAX_N 100

/* Converts the Augmented matrix to Diagonal form with Partial Pivoting */
int convertToDiagonal(double a[MAX_N][MAX_N + 1], int n)
{
    int i, j, k, max_row;
    double ratio, temp;

    for (i = 0; i < n; i++)
    {
        /* 1. Partial Pivoting */
        max_row = i;
        for (k = i + 1; k < n; k++)
        {
            if (fabs(a[k][i]) > fabs(a[max_row][i]))
            {
                max_row = k;
            }
        }

        /* Swap rows if necessary */
        if (max_row != i)
        {
            for (k = 0; k <= n; k++)
            {
                temp = a[i][k];
                a[i][k] = a[max_row][k];
                a[max_row][k] = temp;
            }
        }

        /* Singularity Check */
        if (fabs(a[i][i]) < 1e-15)
        {
            return 0; /* Matrix is singular */
        }

        /* 2. Eliminate all other elements in column i (both above and below diagonal) */
        for (j = 0; j < n; j++)
        {
            if (j != i)
            {
                ratio = a[j][i] / a[i][i];
                for (k = i; k <= n; k++)
                {
                    a[j][k] -= ratio * a[i][k];
                }
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

/* Prints the Value of Unknowns */
int printUnknowns(double a[MAX_N][MAX_N + 1], int n)
{
    printf("\nValues of unknowns are:\n");
    for (int i = 0; i < n; i++)
    {
        if (fabs(a[i][i]) < 1e-15)
        {
            return 0; /* Guard against division by zero */
        }
        printf("Value of Variable %d = %f\n", i, a[i][n] / a[i][i]);
    }
    return 1;
}

int main(void)
{
    int n, i, j;
    double a[MAX_N][MAX_N + 1];

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

    if (!convertToDiagonal(a, n))
    {
        fprintf(stderr, "\nError: Matrix is singular or near-singular. Unique solution does not exist.\n");
        return 1;
    }

    if (!printUnknowns(a, n))
    {
        fprintf(stderr, "\nError: Division by zero encountered when resolving unknowns.\n");
        return 1;
    }

    return 0;
}
