/*
 * Trapezoidal Rule
 * ================
 * Numerically approximates the definite integral of a function f(x)
 * from a to b using n intervals.
 *
 * Formula:
 *   Integral ≈ (h / 2) * [ f(a) + f(b) + 2 * sum_{i=1}^{n-1} f(a + i*h) ]
 *   where h = (b - a) / n.
 *
 * Accuracy: O(h^2)
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o trapezoidal Trapezoidal_Rule.c -lm
 *
 * Sample Input:
 *   Enter Value of a and b: 0 1
 *   Enter no. of Intervals: 100
 *
 * Expected Output:
 *   Value of The integral = 0.250025 (for f(x) = x³)
 *   (Analytical solution for ∫₀¹ x³ dx = 0.25)
 */

#include <stdio.h>
#include <math.h>

/* ===== MODIFY THIS FUNCTION TO CHANGE THE INTEGRAND ===== */
/*  f(x) = x^3                                             */
double f(double x)
{
    return x * x * x;
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

    printf("Enter number of intervals (n): ");
    if (scanf("%d", &n) != 1 || n <= 0)
    {
        fprintf(stderr, "Error: Number of intervals must be a positive integer.\n");
        return 1;
    }

    /* --- Computations --- */
    h = (b - a) / n;
    sum = f(a) + f(b);

    /* Use integer loop counter to prevent floating-point cumulative errors */
    for (int i = 1; i < n; i++)
    {
        double x_i = a + i * h;
        sum += 2.0 * f(x_i);
    }

    double result = (h * sum) / 2.0;

    /* --- Print Output --- */
    printf("\nInterval size (h)        = %.6f\n", h);
    printf("Value of the integral     = %.10f\n", result);

    return 0;
}