# Contributing Guidelines

Thank you for contributing to the official website of **Gridbox Development SpA**. To maintain high engineering standards, software quality, and seamless collaboration, all contributors must follow the guidelines outlined below.

## Branching Strategy and Workflow

We enforce a strict linear promotion model driven by environment maduration:

$$\text{feature/*} \longrightarrow \text{development} \longrightarrow \text{staging} \longrightarrow \text{main}$$

### Environments and Branch Roles

- **`main` (Production):** Stable code served to end-users. Direct pushes are blocked. Merges are **only** accepted from `staging`.

- **`staging` (Pre-production / UAT):** Integration testing and acceptance environment. Merges are **only** accepted from `development`.

- **`development` (Integration):** Active integration branch for new features and bug fixes.

- **Ephemeral Branches (`feat/*`, `fix/*`, `chore/*`):** Short-lived branches created for specific tasks, branched off `development`.

## Development Steps

1. **Branch Out:** Create a new branch from `development`.

   ```bash
   git checkout development
   git pull origin development
   git checkout -b feat/short-description
   ```

2. **Local Validation:** Before committing, ensure the project builds and all local checks pass.

3. **Commiting:** Format your commit messages using **Conventional Commits** (see below).

4. **Pull Request (PR):** Open a PR from your branch targeting `development`. Fill in the provided Pull Request template completely.

## Commit Conventions (Conventional Commits)

We enforce the [Conventional Commits](https://www.conventionalcommits.org/) specification for clean git history and automated changelogs.

### Format

`<type>(<optional scope>): <short summary>`

### Allowed Types

- `feat`: For new features.

- `patch`: For small code refactoring with behavioral changes.

- `refactor`: For code refactoring without behavioral changes.

- `perf`: For performance improvements (Lighthouse, CWV, React Doctor).

- `fix`: For bug fixes.

- `chore`: For maintenance tasks, dependencies or CI/CD.

- `style`: For formatting code changes.

- `docs`: For documentation changes.

- `deps`: For dependencies changes.

## Engineering and Quality Standards

Before submitting a Pull Request, verify the following checks pass locally:

- **Type Safety:** Ensure TypeScript passes strict mode checks without implicit types (`tsc --noEmit`).

- **Linting & Formatting:** Ensure code conforms to project standards (`npm run lint`).

- **Secrets & Security:** Never commit `.env` files, API keys, tokens, or credentials to source control.

- **Component Architecture (Next.js):**
  - Keep React Server Components (RSC) as the default.
  - Only add `'use client'` when browser state or browser APIs are strictly required.

## Getting Help and Reporting Security Issues

- For technical bugs, open an **Issue** using the structured Issue template.

- For security vulnerabilities, **do not open a public issue**. Refer to our [Security Policy](SECURITY.md) or email us directly at [seguridad@gridbox.dev](mailto:seguridad@gridbox.dev).
