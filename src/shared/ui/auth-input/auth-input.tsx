import styles from './auth-input.module.scss';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface AuthInputProps {
    label: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    inputProps: InputHTMLAttributes<HTMLInputElement> & { id: string };
}

export default function AuthInput({
    label,
    error,
    leftIcon,
    rightIcon,
    inputProps,
}: AuthInputProps) {
    const inputId = inputProps.id;

    return (
        <div className={styles.authInput}>
            <label className={styles.authInput__label} htmlFor={inputId}>
                {label}
            </label>

            <div className={styles.authInput__control}>
                {leftIcon && (
                    <span className={styles.authInput__leftIcon} aria-hidden="true">
                        {leftIcon}
                    </span>
                )}

                <input
                    {...inputProps}
                    className={styles.authInput__input}
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                />

                {rightIcon && (
                    <span className={styles.authInput__rightIcon} aria-hidden="true">
                        {rightIcon}
                    </span>
                )}
            </div>

            <p id={error ? `${inputId}-error` : undefined} className={styles.authInput__error}>
                {error ?? ''}
            </p>
        </div>
    );
}
