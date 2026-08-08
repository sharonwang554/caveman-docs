# AI Agent Instructions

Welcome, AI Agent! You are working on the Enterprise SaaS Docusaurus template.
Please follow these project-specific instructions when writing or refactoring code in this repository:

1. **Configuration**: All primary configuration metadata (like site title, tagline, logo URLs) is centralized in `org-config.json`. Do not hardcode these values in `docusaurus.config.ts`. If an organization wants to brand the portal, they only need to modify `org-config.json`.
2. **Styling**: We use Infima CSS variables in `src/css/custom.css` for styling, following a modern glassmorphic and vibrant design system. Always prefer updating CSS variables over adding hardcoded utility classes.
3. **Components**: We use strict TDD (Test-Driven Development) for any new React components added to `src/components/`. If you create a component, you MUST create a test file alongside it (`__tests__`) using `jest` and `@testing-library/react`.
4. **Tooling**: We use `bun` as our package manager and test runner (`bun install`, `bun test`, `bun run typecheck`, `bun run build`).
5. **Linting**: Prose is linted using `vale`. Ensure your markdown writes follow standard prose rules defined in `.vale.ini`.
