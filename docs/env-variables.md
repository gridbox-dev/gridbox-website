# Environment Variables Orchestration

In Gridbox, we treat environment variables as a **validated infrastructure layer**, not just as global strings. This prevents runtime errors and ensures that the application fails-fast if a critical configuration is missing.

## Architecture Our orchestration follows a specific flow:

$$\text{Normalization} \longrightarrow \text{Invariant Enforcement} \longrightarrow \text{Immutable Exposure}$$

| Module            | Responsibility        | Why it matters                                                   |
| ----------------- | --------------------- | ---------------------------------------------------------------- |
| env-definition.ts | Data mapping          | Decouples process.env keys from internal naming.                 |
| env-schema.ts     | Technical invariants  | Defines the source of truth using [Zod](https://zod.dev/basics). |
| env-creation.ts  | Factory handler logic | Centralizes the parsing and freezing logic.                      |
| index.ts          | Orchestration         | Single, immutable entry point for the app.                       |

## Why we use this pattern

### 1. Static Replacement Safety

Centralizing process.env access ensures that Next.js can statically replace public variables during build while keeping runtime validation isolated from the bundling process.

### 2. Configuration Normalization

The names in .env (e.g.`DATABASE_URL_V2`) might not match our desired internal naming (databaseUrl). Normalization allows us to change the environment keys without refactoring the business logic.

### 3. Execution Contexts

Server and client environments are validated independently to prevent server-only variables from leaking into client bundles.

## Runtime Guarantees

Environment validation happens during application bootstrap. If validation fails, the application stops immediately. Configuration errors are treated as deployment failures, not runtime errors.

## Usage

To add a new environment variable:

### 1. Map it in [env-definition.ts](/src/config/env/env-definition.ts).

```typescript
const serverEnvDefinition = {
	nodeEnv: process.env.NODE_ENV,
	isProduction: process.env.NODE_ENV === 'production',
	myNewVariable: process.env.MY_NEW_VARIABLE,
};
```

### 2. Define its invariant in [env-schema.ts](/src/config/env/env-schema.ts).

```typescript
const serverEnvSchema = z.object({
	nodeEnv: z.enum(['development', 'production', 'test']),
	isProduction: z.boolean(),
	myNewVariable: z.string(),
});
```

### 3. Consume it via main env object.

```typescript
// #region Imports
import { env } from '@/config/env';
// #endregion

const myVariable = env.myNewVariable;`
```

> [!CAUTION]
> Never access process.env outside of env-definition.ts. Doing so bypasses validation and breaks type safety.
