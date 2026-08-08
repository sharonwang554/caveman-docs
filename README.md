# Enterprise SaaS Docusaurus Template

A robust, enterprise-grade Docusaurus documentation portal template featuring multi-language support, versioning, OpenAPI generation, TDD setup, and AI readiness.

## Features

- **Custom Components:** Reusable `Infobox` and `CodeTabs` components.
- **API Reference:** Automatically generates documentation from OpenAPI specs using `docusaurus-plugin-openapi-docs`.
- **AI Readiness:** Automatically generates `llms.txt` using `docusaurus-plugin-llms`.
- **Versioning:** Configured for 3 tiers of versioning (Next, v2.0 (Latest), v1.0 (Legacy)).
- **i18n:** Scaffolding for English, French, Japanese, Simplified Chinese, and Traditional Chinese.
- **CI/CD & Linting:** GitHub Actions workflows for continuous integration and automated deployment to GitHub Pages. Enforces prose style via Vale.
- **TDD:** Pre-configured with Jest for behavior-driven development on React components.
- **Premium Aesthetics:** Vibrant colors, glassmorphism, and smooth micro-animations.

## Quick Start

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Generate API Docs:**
   ```bash
   bun run gen-api-docs
   ```

3. **Start the development server:**
   ```bash
   bun run start
   ```

4. **Run Unit Tests:**
   ```bash
   bun test
   ```

5. **Lint Prose with Vale:**
   ```bash
   vale docs/
   ```

## Folder Structure

- `docs/`: Documentation files (MDX).
- `src/components/`: Reusable React components (Infobox, CodeTabs) with full unit tests.
- `openapi/`: OpenAPI 3.0 specification files.
- `i18n/`: Internationalization files.
- `versioned_docs/`: Older versions of documentation.

## Deployment

A GitHub Actions workflow (`deploy.yml`) is provided for automatic deployment to GitHub Pages. You can also deploy easily on platforms like Vercel or Netlify by pointing the build command to `bun run build` and output directory to `build`.
