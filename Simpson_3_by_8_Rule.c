/*
 * Simpson's 3/8 Rule
 * ==================
 * Numerically approximates the definite integral of f(x) from a to b.
 *
 * Requirements:
 *   - The number of intervals (n) MUST be divisible by 3.
 *
 * Formula:
 *   Integral ≈ (3 * h / 8) * [ f(a) + f(b) + 2 * sum_{i divisible by 3} f(a + i*h) + 3 * sum_{i not divisible by 3} f(a + i*h) ]
 *   where h = (b - a) / n.
 *
 * Accuracy: O(h^4)
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o simpson_3_8 Simpson_3_by_8_Rule.c -lm
 *
 * Sample Input:
 *   Enter Value of a and b: 0 6
 *   Enter no. of Intervals: 6
 *
 * Expected Output:
 *   Value of The integral = 1.357081 (for f(x) = 1 / (1 + x²))
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

    printf("Enter number of intervals (n) [MUST BE DIVISIBLE BY 3]: ");
    if (scanf("%d", &n) != 1 || n <= 0)
    {
        fprintf(stderr, "Error: Number of intervals must be a positive integer.\n");
        return 1;
    }

    /* Validate that intervals are divisible by 3 */
    if (n % 3 != 0)
    {
        fprintf(stderr, "Error: Simpson's 3/8 rule requires intervals (n) divisible by 3.\n");
        return 1;
    }

    /* --- Computations --- */
    h = (b - a) / n;
    sum = f(a) + f(b);

    /* Use integer loop counter to prevent floating-point cumulative errors */
    for (int i = 1; i < n; i++)
    {
        double x_i = a + i * h;
        if (i % 3 == 0)
        {
            sum += 2.0 * f(x_i); /* Multiples of 3 */
        }
        else
        {
            sum += 3.0 * f(x_i); /* Other terms */
        }
    }

    double result = (3.0 * h / 8.0) * sum;

    /* --- Print Output --- */
    printf("\nInterval size (h)        = %.6f\n", h);
    printf("Value of the integral     = %.10f\n", result);

    return 0;
}