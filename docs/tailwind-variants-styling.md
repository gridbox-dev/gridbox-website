# Styling Architecture with Tailwind Variants

## Overview

This document describes the **component styling architecture** and class resolution pipeline used throughout the application.

To maintain clean component trees, predictable design token overrides, and strict separation between visual presentation and business logic, the application mandates `tailwind-variants` (`tv`) as the **exclusive entry point for Tailwind CSS styling**. Direct, inline Tailwind class strings inside JSX markup as discouraged in favor of structured `styles` objects powered by a customized `tv` wrapper.

## Architectural Rationale

### 1. Encapsulated Component Styles (`styles` Object Pattern)

Long strings of utility classes embedded directly inside JSX clutter component markup, making rendered HTML trees difficult to red, maintain, and audit.

By encapsulating all styling definitions within a `styles` object using `tv()`, components achieve:

- **Separation of Concerns**: Component JSX focuses on structure, accessibility, and logic, while the `styles` object isolates visual properties.

- **Variant Scalability**: Complex visual states are expressed declaratively rather than through inline string concatenations or ternary operators.

- **Refactoring Efficiency**: Updating visual tokens or component variants occurs in a single structured block without searching through nested DOM nodes.

### 2. Centralized `tv` Wrapper Enforcement

Rather than importing `tv` directly from the `tailwind-variants` package in individual components, the application exports a configured wrapper function (`tv`).

This centralized wrapper guarantees that every styled component in the codebase automatically inherits global `tailwind-merge` resolution rules and theme extensions without requiring repetitive manual setup.

### 3. Deterministic Class Merging (`twMerge`)

When components accept external `className` props or compose multiple variant layers, simple string concatenation leads to CSS specifity conflicts.

Enabling `twMerge: true` by default in the wrapper ensures that class conflicts are resolved deterministically based on the last applied utility.

## Technical Decisions and Custom Merge Configuration

### Theme Extension Integration

Standard `tailwind-merge` is only aware of default Tailwind class utilities. When custom design tokens are added to the project, `tailwind-merge` cannot natively recognize them as belonging to the same conflict group.

Without custom configuration, merging a default class with a custom class would result in both classes remaining in the DOM string, causing unexpected visual inheritance bugs.

The wrapper solves this by extending `twMergeConfig`:

```ts
const twMergeConfig: TWMergeConfig = {
    extend: {
        theme: {
            text: [
                'copy-12', 'copy-14', 'copy-16', 'copy-18', 'copy-20',
                'heading-24', 'heading-30', 'heading-36', 'heading-48', 'heading-60', 'heading-72',
            ],
        },
    },
};
```

### Type-Safe Wrapper Signature

The wrapper function uses Typescript's `typeof tvBase` signature to maintain 100% type compatibility with the underlying library:

```ts
export const tv: typeof tvBase = (options, config) => {
    return tvBase(options, {
        ...config,
        twMerge: true,
        twMergeConfig,
    });
};
```

This guarantees complete autocomplete, variant inference, slot definitions, and default prop checking for developers without introducing custom type wrappers or abstraction overhead.

## Application Integration Guidelines

### 1. Component Styling Pattern

Define component styles using `tv()` at the top or bottom of the component file.

```ts
import { tv } from '@/config/tv';

const styles = tv({
    base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none',
    variants: {
        variant: {
            primary: 'bg-blue-600 text-white hover:bg-blue-700',
            secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        },
        size: {
            sm: 'copy-12 px-3 py-1.5',
            md: 'copy-14 px-4 py-2',
            lg: 'copy-16 px-6 py-3',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ variant, size, className, children, ...props }: ButtonProps) => {
    return (
        <button className={styles({ variant, size, className })} {...props}>
            {children}
        </button>
    );
};
```

### 2. Multi-Slot Components

For components with multiple internal elements, use `tv` slots to keep all sub-element styles in a single cohesive object:

```ts
const styles = tv({
    slots: {
        base: 'rounded-xl border border-gray-200 bg-white p-6 shadow-sm',
        header: 'mb-4 border-b pb-2',
        title: 'heading-24 font-bold text-gray-900',
        body: 'copy-16 text-gray-700',
    },
});

export const Card = ({ heading, children }: { heading: string; children: React.ReactNode }) => {
    const { base, header, title, body } = styles();

    return (
        <div className={base()}>
            <div className={header()}>
                <h3 className={title()}>{heading}</h3>
            </div>
            <div className={body()}>{children}</div>
        </div>
    );
};
```

## Best Practices Checklist

1. **Never write inline class strings in JSX**: Always move class declarations to `tv()`.

2. Always import `tv` from `@/config/tv`: Direct import of the package has been deactivated. Do not import `tv` directly from `tailwind-variants` to avoid bypassing global `twMergeConfig` rules.
