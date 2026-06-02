/*
 * Matrix Inversion Method (using Gauss-Jordan Elimination)
 * ========================================================
 * Computes the inverse of a square matrix A of size n x n.
 *
 * Algorithm:
 *   1. Create an augmented matrix of size n x 2n: [ A | I ]
 *      where I is the n x n Identity matrix.
 *   2. Apply Gauss-Jordan row operations with Partial Pivoting to transform [ A | I ] into [ I | A^-1 ].
 *   3. If A cannot be transformed to Identity (diagonal element becomes 0),
 *      the matrix is singular and does not have an inverse.
 *
 * Complexity: O(N^3)
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o matrix_inversion Matrix_Inversion.c -lm
 *
 * Sample Input:
 *   Enter size of matrix (n): 3
 *   Enter the matrix elements:
 *   2 5 7
 *   6 3 4
 *   5 -2 -3
 *
 * Expected Output:
 *   Inverse Matrix:
 *     1.000000   -1.000000    1.000000
 *   -38.000000   41.000000  -34.000000
 *    27.000000  -29.000000   24.000000
 */

#include <stdio.h>
#include <math.h>
#include <stdlib.h>

#define MAX_N 50

/* Computes inverse using Gauss-Jordan method with partial pivoting */
int invertMatrix(double a[MAX_N][MAX_N], double inv[MAX_N][MAX_N], int n)
{
    double aug[MAX_N][2 * MAX_N];

    /* 1. Build augmented matrix [ A | I ] */
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            aug[i][j] = a[i][j];
            aug[i][j + n] = (i == j) ? 1.0 : 0.0;
        }
    }

    /* 2. Gauss-Jordan Elimination with Partial Pivoting */
    for (int i = 0; i < n; i++)
    {
        /* Find pivot row */
        int max_row = i;
        for (int k = i + 1; k < n; k++)
        {
            if (fabs(aug[k][i]) > fabs(aug[max_row][i]))
            {
                max_row = k;
            }
        }

        /* Swap rows */
        if (max_row != i)
        {
            for (int k = 0; k < 2 * n; k++)
            {
                double temp = aug[i][k];
                aug[i][k] = aug[max_row][k];
                aug[max_row][k] = temp;
            }
        }

        /* Singularity check */
        if (fabs(aug[i][i]) < 1e-15)
        {
            return 0; /* Matrix is singular, inverse does not exist */
        }

        /* Normalize pivot row */
        double pivot = aug[i][i];
        for (int k = 0; k < 2 * n; k++)
        {
            aug[i][k] /= pivot;
        }

        /* Eliminate elements in column i of other rows */
        for (int j = 0; j < n; j++)
        {
            if (j != i)
            {
                double ratio = aug[j][i];
                for (int k = 0; k < 2 * n; k++)
                {
                    aug[j][k] -= ratio * aug[i][k];
                }
            }
        }
    }

    /* 3. Extract inverse matrix [ A^-1 ] from augmented matrix */
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            inv[i][j] = aug[i][j + n];
        }
    }

    return 1; /* Success */
}

int main(void)
{
    int n;
    double a[MAX_N][MAX_N];
    double inv[MAX_N][MAX_N];

    printf("Enter size of square matrix (n): ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N)
    {
        fprintf(stderr, "Error: Invalid matrix size. Must be between 1 and %d.\n", MAX_N);
        return 1;
    }

    printf("Enter the matrix elements row by row:\n");
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            if (scanf("%lf", &a[i][j]) != 1)
            {
                fprintf(stderr, "Error: Invalid element input.\n");
                return 1;
            }
        }
    }

    if (!invertMatrix(a, inv, n))
    {
        fprintf(stderr, "\nError: Matrix is singular. Inverse does not exist.\n");
        return 1;
    }

    printf("\nInverse Matrix:\n");
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            printf("%12.6f ", inv[i][j]);
        }
        printf("\n");
    }

    return 0;
}
