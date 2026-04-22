import React from "react";

/**
 * Theme-aware form field with leading icon + optional trailing action.
 * Used by Login / Signup so every input row looks identical.
 */
export interface AuthFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  trailing?: React.ReactNode;
}

export const AuthField = React.forwardRef<HTMLInputElement, AuthFieldProps>(
  ({ label, icon, trailing, className = "", id, ...rest }, ref) => {
    const fieldId = id ?? `auth-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div>
        <label
          htmlFor={fieldId}
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5"
        >
          {label}
        </label>
        <div className="relative group">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[color:var(--accent)] transition-colors">
            {icon}
          </span>
          <input
            ref={ref}
            id={fieldId}
            className={`w-full bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 pl-11 ${
              trailing ? "pr-11" : "pr-4"
            } py-3 rounded-xl border border-[var(--border-color)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-ring)] focus:outline-none transition-all ${className}`}
            {...rest}
          />
          {trailing && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {trailing}
            </span>
          )}
        </div>
      </div>
    );
  }
);

AuthField.displayName = "AuthField";
