/*
 * Euler's Method (for Ordinary Differential Equations)
 * ====================================================
 * Solves a first-order initial value problem (IVP):
 *     dy/dx = f(x, y),  y(x0) = y0
 *
 * Formula:
 *     y_{n+1} = y_n + h * f(x_n, y_n)
 *     where h is the step size.
 *
 * Accuracy: First-order local error O(h^2), global error O(h).
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o euler Euler_Method.c -lm
 *
 * Sample Input:
 *   Enter initial conditions [x0, y0]: 0 1
 *   Enter target x (x_end): 1
 *   Enter step size (h): 0.1
 *
 * Expected Output:
 *   Table of x and y values approximating the curve.
 */

#include <stdio.h>
#include <math.h>

/* ===== MODIFY THIS FUNCTION TO CHANGE THE ODE dy/dx = f(x, y) ===== */
/*  f(x, y) = x + y                                                 */
/*  Analytical solution for y(0)=1 is: y(x) = 2*e^x - x - 1         */
double f(double x, double y)
{
    return x + y;
}

/* Analytical solution (optional, for error comparison) */
double analytical(double x)
{
    return 2.0 * exp(x) - x - 1.0;
}
/* ================================================================== */

int main(void)
{
    double x0, y0, x_end, h;
    double x, y;

    /* --- Input --- */
    printf("Enter initial conditions [x0, y0]: ");
    if (scanf("%lf %lf", &x0, &y0) != 2)
    {
        fprintf(stderr, "Error: Invalid input for initial conditions.\n");
        return 1;
    }

    printf("Enter target x value (x_end): ");
    if (scanf("%lf", &x_end) != 1)
    {
        fprintf(stderr, "Error: Invalid target x.\n");
        return 1;
    }

    printf("Enter step size (h): ");
    if (scanf("%lf", &h) != 1 || h <= 0.0)
    {
        fprintf(stderr, "Error: Step size must be a positive number.\n");
        return 1;
    }

    if (x0 >= x_end)
    {
        fprintf(stderr, "Error: Initial x0 must be less than target x_end.\n");
        return 1;
    }

    /* Calculate number of steps */
    int steps = (int)ceil((x_end - x0) / h);

    /* --- Compute and Print Output --- */
    printf("\n%-10s %-15s %-15s %-15s %-12s\n",
           "Step", "x", "y (Euler)", "y (Analytical)", "Absolute Error");
    printf("--------------------------------------------------------------------------------\n");

    x = x0;
    y = y0;

    for (int step = 0; step <= steps; step++)
    {
        double y_true = analytical(x);
        double err = fabs(y_true - y);

        printf("%-10d %-15.6f %-15.6f %-15.6f %-12.2e\n",
               step, x, y, y_true, err);

        /* Euler step */
        y = y + h * f(x, y);
        x = x0 + (step + 1) * h; /* Prevents accumulation of floating point step errors */
        
        /* Stop if we exceed target x */
        if (x > x_end + 1e-9)
        {
            break;
        }
    }

    return 0;
}
