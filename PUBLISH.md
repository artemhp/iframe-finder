# Publishing iframe-finder to npm

## Prerequisites

1. Create an npm account at https://www.npmjs.com/signup
2. Login to npm: `npm login`

## Publishing Steps

### 1. Verify the package builds correctly
```bash
npm run build
```

### 2. Test the package locally
```bash
npm pack --dry-run
```

### 3. Check package contents
The package should include:
- `dist/index.js` - Compiled JavaScript
- `dist/index.d.ts` - TypeScript definitions
- `README.md` - Documentation
- `LICENSE` - MIT license
- `package.json` - Package metadata

### 4. Publish to npm
```bash
npm publish
```

### 5. Verify publication
```bash
npm info iframe-finder
```

## After Publishing

### Install in any project
```bash
npm install iframe-finder
```

### Use in your code
```typescript
import { findIframeById } from 'iframe-finder';

const iframe = findIframeById('myFrame');
```

## Version Updates

When making updates:

1. Update `CHANGELOG.md`
2. Bump version in `package.json`:
   - Patch: `npm version patch` (1.0.0 → 1.0.1)
   - Minor: `npm version minor` (1.0.0 → 1.1.0)
   - Major: `npm version major` (1.0.0 → 2.0.0)
3. Publish: `npm publish`

## Package Details

- **Name:** iframe-finder
- **Version:** 1.0.0
- **Size:** ~4KB gzipped
- **License:** MIT
- **Repository:** https://github.com/artemhp/iframe-finder

## Marketing

Consider adding:
- GitHub repository with examples
- CodeSandbox demo
- Article on Medium/Dev.to
- Tweet about the release
- Post in relevant communities (Reddit, Discord, etc.)

## Maintenance

- Monitor issues on GitHub
- Respond to npm package questions
- Keep dependencies updated
- Add tests in future versions
