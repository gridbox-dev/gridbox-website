# Environment Variables Management Architecture

## Architectural Overview: The Fail-Fast Philosophy

In enterprise Next.js applications, environment variables are a frequent source of critical bugs. Missing or improperly formatted variables often go unnoticed during the build process, only to cause cascading runtime failures in production.

This module resolves this systemic issue by implementing a **strict, type-safe, and fail-fast environment validation layer** using `@t3-oss/env-nextjs` and `Zod`.

Instead of relying on Next.js's default behavior, where `process.env` properties are loosely typed as `string | undefined`, this architecture intercepts the application boot and build processes. It validates all environment variables against a strongly typed schema before any application code executes.

If a variable is missing or invalid, the build fails immediately with a descriptive error, guaranteeing that deployed environments are always healthy and correctly configured.

## Security Boundaries and Schema Design

The [environment configuration](/src/config/env/index.ts) is deliberately partitioned into three distinct schemas (`server`, `client`, and `shared`). This segregation is a critical security measure to prevent the accidental leakage of sensitive backend credentials into the client-side JavaScript bundle.

### Server-Side Execution (`server`)

The `server` block is a strict security boundary. Variables defined here are mathematically guaranteed to **never be exposed to the browser**.

### Client-Side Safe Exposure (`client`)

Next.js requires client-side variables to be prefixed with `NEXT_PUBLIC_` so the Webpack compiler knows to inline them during the build.

### Derived Shared State (`shared`)

Shared variables are accessible across both the Node.js server environment and the browser runtime.

## The runtimeEnv Mapping and Next.js Nuances

The `runtimeEnv` object explicitly maps the schema keys to actual `process.env` values.

Next.js does not expose the raw `process.env` object to the browser for security reasons. Instead, it statically replaces references to `process.env.NEXT_PUBLIC_*` with hardcoded strings at build time. If `@t3-oss/env-nextjs` tried to iterate over a dynamic `process.env` object on the client, it would crash.

By manually destructuring the values in `runtimeEnv`, we allow the Next.js compiler to perform its static replacement successfully while still passing the values through our Zod validation pipeline.

## Developer Guidelines

For maintaining the integrity of this architecture, engineering teams must adhere strictly to the following rules:

1. **Never use `process.env` directly**: Always import the exported `env` object from this module. This is the only way to benefit from autocomplete, type-safety, and runtime guarantees.

2. **Treat the schema as the Source of Truth**: If a new integration requires an API key, it must be added to the `server` schema first. If it is omitted from the schema, TypeScript will explicitly reject attempts to access `env.NEW_API_KEY`.

3. **Use granular Zod validation**: Do not default to `z.string()` for new variables. If a variable is a numeric port, use `z.coerce.number()`. If it's a comma-separated list, use custom refinements to parse it into an array. Force the validation layer to do the heavy lifting so application logic remains clean and predictable.

### Application Integration Guidelines

To consume environment variables safely throughout the codebase:

1. **Importing Configuration**: Always import the validated `env` object rather than raw `process.env`:

```ts
import { env } from '@/config/env';

const isProduction = env.IS_PRODUCTION;
const baseURL = env.NEXT_PUBLIC_APP_BASE_URL;
```

2. **Adding New Variables**:
    - Place server secrets inside the `server` block.
    - Place browser-accessible variables inside the `client` block with a `NEXT_PUBLIC_` prefix.
    - Add the corresponding raw `process.env` entry to the `runtimeEnv` mapping.

> [!CAUTION]
> Never access process.env outside of the validated env object. Doing so bypasses validation and breaks type safety.
