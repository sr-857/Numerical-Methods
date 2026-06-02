/*
 * Simpson's 1/3 Rule
 * ==================
 * Numerically approximates the definite integral of f(x) from a to b.
 *
 * Requirements:
 *   - The number of intervals (n) MUST be even.
 *
 * Formula:
 *   Integral ≈ (h / 3) * [ f(a) + f(b) + 4 * sum_{odd i} f(a + i*h) + 2 * sum_{even i} f(a + i*h) ]
 *   where h = (b - a) / n.
 *
 * Accuracy: O(h^4)
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o simpson_1_3 Simpson_1_by_3_Rule.c -lm
 *
 * Sample Input:
 *   Enter Value of a and b: 0 6
 *   Enter no. of Intervals: 6
 *
 * Expected Output:
 *   Value of The integral = 1.366174 (for f(x) = 1 / (1 + x²))
 *   (Analytical solution for ∫₀⁶ 1/(1+x²) dx = arctan(6) ≈ 1.405648)
 */

#include <stdio.h>
#include <math.h>

/* ===== MODIFY THIS FUNCTION TO CHANGE THE INTEGRAND ===== */
/*  f(x) = 1 / (1 + x^2)                                   */
double f(double x)
{
    return 1.0 / (1.0 + x * x);
}
/* ======================================================== */

int main(void)
{
    int n;
    double a, b, h, sum;

    /* --- Input --- */
    printf("Enter interval bounds [a, b]: ");
    if (scanf("%lf %lf", &a, &b) != 2)
    {
        fprintf(stderr, "Error: Invalid input for interval bounds.\n");
        return 1;
    }

    printf("Enter number of intervals (n) [MUST BE EVEN]: ");
    if (scanf("%d", &n) != 1 || n <= 0)
    {
        fprintf(stderr, "Error: Number of intervals must be a positive integer.\n");
        return 1;
    }

    /* Validate that intervals are even */
    if (n % 2 != 0)
    {
        fprintf(stderr, "Error: Simpson's 1/3 rule requires an EVEN number of intervals.\n");
        return 1;
    }

    /* --- Computations --- */
    h = (b - a) / n;
    sum = f(a) + f(b);

    /* Use integer loop counter to prevent floating-point cumulative errors */
    for (int i = 1; i < n; i++)
    {
        double x_i = a + i * h;
        if (i % 2 == 0)
        {
            sum += 2.0 * f(x_i); /* Even terms */
        }
        else
        {
            sum += 4.0 * f(x_i); /* Odd terms */
        }
    }

    double result = (h * sum) / 3.0;

    /* --- Print Output --- */
    printf("\nInterval size (h)        = %.6f\n", h);
    printf("Value of the integral     = %.10f\n", result);

    return 0;
}