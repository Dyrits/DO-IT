# Do It!

A full-stack SvelteKit application built while following the "Full Stack Web Development in the Cloud" course by Mike Nikles (freeCodeCamp).

## About The Project

This project was built as a cloud-based full-stack web development exercise with SvelteKit, following Mike Nikles' course published on freeCodeCamp.

The original README noted that the project was discontinued because the course content had become outdated.

## Built With

- Svelte / SvelteKit
- TypeScript

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Status

Discontinued, per the original README (the course content became outdated).

## License

No license file is present in this repository.

## Contact

Dylan J. Gerrits - [GitHub](https://github.com/Dyrits)

## Dependency migration verification (November 9, 2026)

The tutorial app now uses SvelteKit 3.1.1, Svelte 5.57.3, Vite 8.3.7 and TypeScript 6.0.3 on Node 26.13.0 LTS. Use the recorded pnpm 7.33.7 package manager for this repository's lock format:

```sh
corepack pnpm@7.33.7 install --frozen-lockfile
corepack pnpm@7.33.7 check
corepack pnpm@7.33.7 build
corepack pnpm@7.33.7 test
```

The migration follows the official route/load/Response APIs and Kit 3 config, subpath-import and tsconfig changes. Svelte components keep their supported legacy syntax. The original `/todos.json` and `/todos/<uid>.json` URLs are retained, including same-origin POST `_method=PATCH` / `_method=DELETE` forms and 303 redirects without JavaScript. Configured Gitpod HMR behavior and adapter-auto are retained; no hosting project is created or connected. The inherited package script now uses the current `svelte-package` command. A local packaging smoke run completes with warnings about missing library exports and Svelte peer metadata: this app is marked private and is not a publish-ready component library. No package is published.

The original frozen install/build and Chromium create/update/toggle/delete flow passed on Node 26. The original typecheck had four action-return errors caused by `destoy`; the candidate fixes that teardown spelling and types the callback. Candidate verification includes a fresh frozen install, zero-error/zero-warning typecheck, production build, 18 real loopback HTTP checks and Chromium create/update/toggle/reload/delete. HTTP checks cover JSON and native-form behavior, empty input, unknown IDs, unsupported override methods and rejection of cross-origin form submissions. IDs now use native randomUUID rather than millisecond timestamps, preventing duplicate IDs for rapid creation. Updating an unknown todo now returns 404 rather than dereferencing a missing item. Existing styles and ordinary todo interactions are retained.

The pnpm audit fell from 42 distinct advisory records (54 paths, including two critical) to one existing low deepmerge advisory record/path, with no new advisory IDs. Deepmerge 4.3.1 remains through the Svelte Vite plugin, and the audit lists no patched version. This is not a security clearance.

This remains a discontinued tutorial: todos live in one process-global in-memory array, are shared between visitors and disappear when the process restarts. There is no login, per-user isolation or database persistence. Do not deploy it for private or durable tasks. The migration does not claim production hosting compatibility, deployment, persistence or multi-user safety.

Official references:
- https://svelte.dev/docs/kit/migrating-to-sveltekit-2
- https://svelte.dev/docs/kit/migrating-to-sveltekit-3
- https://svelte.dev/docs/kit/routing
- https://svelte.dev/docs/svelte/v5-migration-guide
