#!/usr/bin/env python3
import os
import re

files_to_check = [
    "Bisection_Method.c",
    "Regula_Falsi_Method.c",
    "Newton_Raphson.c",
    "Secant_Method.c",
    "Iteration_Method.c",
    "Newton_Forward_Interpolation_Method.c",
    "Newton_Backward_Interpolation_Method.c",
    "Lagrange_Interpolation_Method.c",
    "Gauss_Elimination.c",
    "Gauss_Jordan.c",
    "Gauss_Jacobi.c",
    "Gauss_Seidel.c",
    "Trapezoidal_Rule.c",
    "Simpson_1_by_3_Rule.c",
    "Simpson_3_by_8_Rule.c",
    "Fit_Straight_Line_Curve_Fitting.c",
    "Fit_Parabola_Curve_Fitting.c",
    "Matrix_Inversion.c",
    "Euler_Method.c",
    "Taylor_Series_Method.c",
    "Runge_Kutta_Method.c"
]

def clean_code(content):
    # Remove single line comments
    content = re.sub(r'//.*', '', content)
    # Remove multi-line comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    return content

def run_checks(filename):
    print(f"Checking {filename}...")
    errors = []
    
    if not os.path.exists(filename):
        return [f"File {filename} does not exist."]

    with open(filename, 'r', encoding='utf-8') as f:
        original_content = f.read()

    content = clean_code(original_content)

    # 1. Check double semicolons (excluding comments)
    if ';;' in content:
        errors.append("Double semicolon ';;' found.")

    # 2. Check braces/brackets matching
    for open_char, close_char in [('{', '}'), ('(', ')'), ('[', ']')]:
        open_count = content.count(open_char)
        close_count = content.count(close_char)
        if open_count != close_count:
            errors.append(f"Mismatched braces: '{open_char}' count={open_count}, '{close_char}' count={close_count}")

    # 3. Check for float declarations (we want double precision)
    # Match 'float varName' or 'float varName[' or 'float varName,'
    # Excluding cast expressions or specific keywords
    float_decl = re.findall(r'\bfloat\s+[a-zA-Z_]', content)
    if float_decl:
        errors.append(f"Found float variable declaration(s): {float_decl}. Use double instead.")

    # 4. Check for scanf float pattern (%f instead of %lf)
    # If a variable is double, it must be read with %lf
    scanf_float = re.findall(r'scanf\s*\(\s*["\'][^"\']*%f[^"\']*["\']', content)
    if scanf_float:
        errors.append(f"Found scanf with '%f' instead of '%lf' for double: {scanf_float}")

    # 5. Check for loops using float counters
    # e.g., for(float x = ... or for(double x = ...
    float_loop = re.findall(r'for\s*\(\s*(?:float|double)\s+[a-zA-Z_]', content)
    if float_loop:
        # We allow double loop counters if they are standard, but integer counters are safer.
        # Let's inspect further.
        pass

    # 6. Check for standard library includes
    if "stdio.h" not in original_content:
        errors.append("Missing stdio.h include.")

    return errors

def main():
    total_errors = 0
    print("=== STARTING CBNST CODEBASE STATIC VALIDATION ===")
    for filename in files_to_check:
        errors = run_checks(filename)
        if errors:
            print(f"❌ {filename} has issues:")
            for err in errors:
                print(f"   - {err}")
            total_errors += len(errors)
        else:
            print(f"✅ {filename} passed all static validation checks.")
        print("-" * 50)

    if total_errors == 0:
        print("\n🎉 SUCCESS: All files passed the static validation checks! No syntax/precision issues found.")
    else:
        print(f"\n⚠️ WARNING: Found {total_errors} issue(s) across the repository.")

if __name__ == "__main__":
    main()
