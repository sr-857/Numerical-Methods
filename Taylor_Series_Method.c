/*
 * Taylor Series Method (Second Order)
 * ===================================
 * Solves a first-order ODE: dy/dx = f(x, y),  y(x0) = y0
 * using a 2nd-order Taylor Series Expansion:
 *
 *   y(x + h) ≈ y(x) + h * y'(x) + (h^2 / 2) * y''(x)
 *
 * where:
 *   y'(x)  = f(x, y)
 *   y''(x) = ∂f/∂x + (∂f/∂y) * f(x, y)
 *
 * For f(x, y) = x - y^2:
 *   y'(x)  = x - y^2
 *   y''(x) = 1 - 2*y*y' = 1 - 2*y*(x - y^2)
 *
 * Compile: gcc -std=c99 -Wall -Wextra -o taylor Taylor_Series_Method.c -lm
 *
 * Sample Input:
 *   Enter initial conditions [x0, y0]: 0 1
 *   Enter target x (x_end): 1
 *   Enter step size (h): 0.1
 *
 * Expected Output:
 *   Stepwise solution values of x and y.
 */

#include <stdio.h>
#include <math.h>

/* ===== MODIFY THESE FUNCTIONS TO CHANGE THE ODE AND DERIVATIVES ===== */
/*  ODE: dy/dx = f(x, y) = x - y^2                                      */
double dy1(double x, double y)
{
    return x - y * y;
}

/*  Second Derivative: y''(x) = d/dx(x - y^2) = 1 - 2*y*y'              */
double dy2(double x, double y)
{
    double y_prime = dy1(x, y);
    return 1.0 - 2.0 * y * y_prime;
}
/* ==================================================================== */

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

    int steps = (int)ceil((x_end - x0) / h);

    /* --- Compute and Print Output --- */
    printf("\n%-10s %-15s %-15s %-15s %-15s\n",
           "Step", "x", "y (Taylor 2nd)", "y'(x)", "y''(x)");
    printf("--------------------------------------------------------------------------------\n");

    x = x0;
    y = y0;

    for (int step = 0; step <= steps; step++)
    {
        double y_prime = dy1(x, y);
        double y_prime_prime = dy2(x, y);

        printf("%-10d %-15.6f %-15.6f %-15.6f %-15.6f\n",
               step, x, y, y_prime, y_prime_prime);

        /* Taylor 2nd Order Step */
        y = y + h * y_prime + (h * h / 2.0) * y_prime_prime;
        x = x0 + (step + 1) * h; /* Avoid cumulative floating point drift */

        if (x > x_end + 1e-9)
        {
            break;
        }
    }

    return 0;
}
