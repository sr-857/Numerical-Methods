/*
 * Gauss Seidel Method
 * ===================
 * Iterative method to solve a system of linear equations A * x = B.
 *
 * Requirements:
 *   - The system should be Diagonally Dominant to guarantee convergence.
 *     i.e., |a_ii| > sum_{j≠i} |a_ij| for all i.
 *     Reordering rows can achieve diagonal dominance.
 *
 * Difference from Gauss-Jacobi:
 *   Gauss-Seidel uses the most recently computed values of variables immediately
 *   within the same iteration step, improving convergence speed.
 *   x_i^(k+1) = (b_i - sum_{j < i} a_ij * x_j^(k+1) - sum_{j > i} a_ij * x_j^(k)) / a_ii
 *
 * Complexity: O(Iter * N^2)
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o gauss_seidel Gauss_Seidel.c -lm
 *
 * Sample Input:
 *   Enter no of Unknowns: 3
 *   Enter no. of iterations: 50
 *   Enter the Augmented Matrix:
 *   20 1 -2 17
 *   3 20 -1 -18
 *   2 -3 20 25
 *
 * Expected Output:
 *   Iteration x values converge to x ≈ 1.0, y ≈ -1.0, z ≈ 1.0 (faster than Jacobi)
 */

#include <stdio.h>
#include <math.h>
#include <stdbool.h>
#include <stdlib.h>

#define MAX_N 100
#define DEFAULT_EPSILON 0.0001

/* Helper function to calculate sum of absolute values in row i excluding diagonal element */
double findSum(int i, double a[MAX_N][MAX_N + 1], int n)
{
    double sum = 0.0;
    for (int j = 0; j < n; j++)
    {
        if (i != j)
        {
            sum += fabs(a[i][j]);
        }
    }
    return sum;
}

/* Checks diagonal dominance */
bool isMethodApplicable(double a[MAX_N][MAX_N + 1], int n)
{
    for (int i = 0; i < n; i++)
    {
        double diag = fabs(a[i][i]);
        double sum = findSum(i, a, n);
        if (diag <= sum)
        {
            return false; /* Not strictly diagonally dominant */
        }
    }
    return true;
}

/* Helper to print iteration results */
void printIteration(int iteration, double values[], int n)
{
    printf("Iteration %3d: ", iteration);
    for (int i = 0; i < n; i++)
    {
        printf("value[%d]=%10.6f ", i + 1, values[i]);
    }
    printf("\n");
}

/* Finds values using Gauss-Seidel Iteration method */
void findValues(double a[MAX_N][MAX_N + 1], int n, int maxIterations, double tolerance)
{
    double values_old[MAX_N];
    double values_new[MAX_N];
    int iteration;

    /* Initialize starting guesses to 0 */
    for (int i = 0; i < n; i++)
    {
        values_old[i] = 0.0;
        values_new[i] = 0.0;
    }

    for (iteration = 1; iteration <= maxIterations; iteration++)
    {
        /* Copy previous iteration values to compare later */
        for (int i = 0; i < n; i++)
        {
            values_old[i] = values_new[i];
        }

        for (int i = 0; i < n; i++)
        {
            double sum = 0.0;
            for (int j = 0; j < n; j++)
            {
                if (i != j)
                {
                    /* Gauss-Seidel uses the updated value from values_new if j < i, 
                       and the old value from values_new (which matches old iteration) if j > i.
                       Because we are overwriting values_new as we go, using values_new[j] automatically 
                       accomplishes this! */
                    sum += a[i][j] * values_new[j];
                }
            }
            if (fabs(a[i][i]) < 1e-15)
            {
                fprintf(stderr, "Error: Diagonal element a[%d][%d] is zero. Cannot divide.\n", i, i);
                return;
            }
            values_new[i] = (a[i][n] - sum) / a[i][i];
        }

        printIteration(iteration, values_new, n);

        /* Convergence check */
        bool converged = true;
        for (int k = 0; k < n; k++)
        {
            if (fabs(values_new[k] - values_old[k]) >= tolerance)
            {
                converged = false;
                break;
            }
        }

        if (converged)
        {
            printf("\n✓ Converged after %d iterations.\n", iteration);
            return;
        }
    }

    printf("\n✗ Reached maximum iterations (%d) without convergence to tolerance %.6e.\n",
           maxIterations, tolerance);
}

int main(void)
{
    int n, maxIterations;
    double a[MAX_N][MAX_N + 1];
    double tolerance = DEFAULT_EPSILON;

    printf("Enter no of Unknowns: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N)
    {
        fprintf(stderr, "Error: Invalid number of unknowns. Must be between 1 and %d.\n", MAX_N);
        return 1;
    }

    printf("Enter no. of maximum iterations: ");
    if (scanf("%d", &maxIterations) != 1 || maxIterations <= 0)
    {
        fprintf(stderr, "Error: Maximum iterations must be positive.\n");
        return 1;
    }

    printf("Enter convergence tolerance (e.g., 0.0001): ");
    if (scanf("%lf", &tolerance) != 1 || tolerance <= 0.0)
    {
        fprintf(stderr, "Error: Invalid tolerance. Defaulting to %.4f.\n", DEFAULT_EPSILON);
        tolerance = DEFAULT_EPSILON;
    }

    printf("Enter the Augmented Matrix:\n");
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j <= n; j++)
        {
            if (scanf("%lf", &a[i][j]) != 1)
            {
                fprintf(stderr, "Error: Invalid matrix element input.\n");
                return 1;
            }
        }
    }

    if (!isMethodApplicable(a, n))
    {
        printf("\nWarning: Gauss Seidel Method convergence is not guaranteed because\n");
        printf("the matrix is not strictly diagonally dominant.\n");
        printf("Do you want to continue anyway? (1 for Yes, 0 for No): ");
        int choice;
        if (scanf("%d", &choice) != 1 || choice != 1)
        {
            return 0;
        }
    }
    else
    {
        printf("\nMatrix is strictly diagonally dominant. Convergence is guaranteed.\n\n");
    }

    findValues(a, n, maxIterations, tolerance);
    return 0;
}
