CC = gcc
CFLAGS = -std=c99 -Wall -Wextra -Werror -O2
LDFLAGS = -lm

TARGETS = bisection regula_falsi newton_raphson secant iteration \
          newton_forward newton_backward lagrange \
          gauss_elimination gauss_jordan gauss_jacobi gauss_seidel \
          trapezoidal simpson_1_3 simpson_3_8 \
          fit_line fit_parabola \
          matrix_inversion euler taylor rk4

.PHONY: all clean

all: $(TARGETS)

bisection: Bisection_Method.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

regula_falsi: Regula_Falsi_Method.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

newton_raphson: Newton_Raphson.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

secant: Secant_Method.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

iteration: Iteration_Method.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

newton_forward: Newton_Forward_Interpolation_Method.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

newton_backward: Newton_Backward_Interpolation_Method.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

lagrange: Lagrange_Interpolation_Method.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

gauss_elimination: Gauss_Elimination.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

gauss_jordan: Gauss_Jordan.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

gauss_jacobi: Gauss_Jacobi.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

gauss_seidel: Gauss_Seidel.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

trapezoidal: Trapezoidal_Rule.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

simpson_1_3: Simpson_1_by_3_Rule.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

simpson_3_8: Simpson_3_by_8_Rule.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

fit_line: Fit_Straight_Line_Curve_Fitting.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

fit_parabola: Fit_Parabola_Curve_Fitting.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

matrix_inversion: Matrix_Inversion.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

euler: Euler_Method.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

taylor: Taylor_Series_Method.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

rk4: Runge_Kutta_Method.c
	$(CC) $(CFLAGS) -o $@ $< $(LDFLAGS)

clean:
	rm -f $(TARGETS)
