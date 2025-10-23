// validation/validation.ts
export type PasswordChecklist = {
  length12: boolean;
  lower: boolean;
  upper: boolean;
  number: boolean;
  symbol: boolean;
};

export class Validation {
  // EMAIL VALIDATION
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  static validateEmail(email: string): string | null {
    const value = email.trim();
    if (!value) return "Please enter an email.";
    if (!this.emailRegex.test(value))
      return "Please enter a valid email address.";
    return null;
  }

  // PASSWORD VALIDATION
  static passwordChecklist(password: string): PasswordChecklist {
    const val = password ?? "";
    return {
      length12: val.length >= 12,
      lower: /[a-z]/.test(val),
      upper: /[A-Z]/.test(val),
      number: /\d/.test(val),
      symbol: /[^A-Za-z0-9]/.test(val),
    };
  }

  static isPasswordStrong(password: string): boolean {
    const c = this.passwordChecklist(password);
    return c.length12 && c.lower && c.upper && c.number && c.symbol;
  }

  static passwordIssues(password: string): string[] {
    const issues: string[] = [];
    if (!password || password.trim().length === 0) {
      issues.push("Please enter a password.");
      return issues;
    }
    if (password.length < 12) issues.push("Must be at least 12 characters.");
    if (!/[a-z]/.test(password))
      issues.push("Include at least one lowercase letter.");
    if (!/[A-Z]/.test(password))
      issues.push("Include at least one uppercase letter.");
    if (!/\d/.test(password)) issues.push("Include at least one number.");
    if (!/[^A-Za-z0-9]/.test(password))
      issues.push("Include at least one symbol.");
    return issues;
  }

  static validatePassword(password: string): string | null {
    const issues = this.passwordIssues(password);
    return issues.length ? issues[0] : null;
  }

  // TEXT/NUMERIC
  static isTextOnly(value: string, allowSpaces = true): boolean {
    const regex = allowSpaces ? /^[A-Za-z\s]+$/ : /^[A-Za-z]+$/;
    return regex.test(value.trim());
  }

  static isNumericOnly(value: string): boolean {
    const regex = /^[0-9]+$/;
    return regex.test(value.trim());
  }
}
