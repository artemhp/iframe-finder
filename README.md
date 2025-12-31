# iframe-finder

A lightweight TypeScript library for recursively finding nested iframes in the DOM tree.

## Features

- 🔍 **Recursive Search** - Find iframes at any nesting depth
- 🎯 **Multiple Search Methods** - By id, name, or custom criteria
- 🛡️ **Safe** - Handles cross-origin iframes gracefully
- 📦 **Lightweight** - Zero dependencies, ~1KB gzipped
- 💪 **TypeScript** - Full type safety and IntelliSense support
- ⚡ **Fast** - Optimized search with depth limiting

## Installation

```bash
npm install iframe-finder
```

## Usage

### Find by ID

```typescript
import { findIframeById } from 'iframe-finder';

// Find iframe with id="myFrame" anywhere in the DOM tree
const iframe = findIframeById('myFrame');

if (iframe) {
  console.log('Found iframe:', iframe);
  // Access iframe content
  const content = iframe.contentDocument;
}
```

### Find by Name

```typescript
import { findIframeByName } from 'iframe-finder';

const iframe = findIframeByName('contentFrame');
```

### Custom Search Criteria

```typescript
import { findIframe } from 'iframe-finder';

// Find iframe by src
const iframe = findIframe((frame) =>
  frame.src.includes('example.com')
);

// Find iframe by class
const iframe = findIframe((frame) =>
  frame.classList.contains('special-frame')
);

// Find iframe by data attribute
const iframe = findIframe((frame) =>
  frame.dataset.type === 'content'
);
```

### Advanced Options

```typescript
import { findIframeById } from 'iframe-finder';

// Limit search depth
const iframe = findIframeById('myFrame', {
  maxDepth: 3  // Only search 3 levels deep
});

// Start from specific document
const iframe = findIframeById('myFrame', {
  rootDocument: someIframe.contentDocument
});
```

### Find All Matching Iframes

```typescript
import { findAllIframes } from 'iframe-finder';

// Find all iframes with specific class
const iframes = findAllIframes((frame) =>
  frame.classList.contains('content')
);

console.log(`Found ${iframes.length} iframes`);
```

## API Reference

### `findIframeById(id: string, options?: FindIframeOptions): HTMLIFrameElement | null`

Recursively searches for an iframe by its `id` attribute.

**Parameters:**
- `id` - The id attribute to search for
- `options` - Optional search options

**Returns:** The found iframe element or `null`

### `findIframeByName(name: string, options?: FindIframeOptions): HTMLIFrameElement | null`

Recursively searches for an iframe by its `name` attribute.

**Parameters:**
- `name` - The name attribute to search for
- `options` - Optional search options

**Returns:** The found iframe element or `null`

### `findIframe(predicate: IframePredicate, options?: FindIframeOptions): HTMLIFrameElement | null`

Recursively searches for an iframe using a custom predicate function.

**Parameters:**
- `predicate` - Function that returns `true` when iframe matches criteria
- `options` - Optional search options

**Returns:** The found iframe element or `null`

### `findAllIframes(predicate: IframePredicate, rootDocument?: Document): HTMLIFrameElement[]`

Finds all iframes matching the predicate (single level, non-recursive).

**Parameters:**
- `predicate` - Function to test each iframe
- `rootDocument` - Starting document (defaults to `window.document`)

**Returns:** Array of matching iframes

### `FindIframeOptions`

```typescript
interface FindIframeOptions {
  rootDocument?: Document;  // Starting document (default: window.document)
  maxDepth?: number;        // Maximum search depth (default: Infinity)
}
```

### `IframePredicate`

```typescript
type IframePredicate = (iframe: HTMLIFrameElement) => boolean;
```

## Real-World Examples

### Finding Nested Game Frames

```typescript
import { findIframeById } from 'iframe-finder';

// Game UI often has deeply nested iframes
const showInfoFrame = findIframeById('showInfo');
if (showInfoFrame?.contentDocument) {
  const healthElement = showInfoFrame.contentDocument
    .querySelector('[title="Character Info"]');
}
```

### Finding Ad Frames

```typescript
import { findIframe } from 'iframe-finder';

// Find advertisement iframe
const adFrame = findIframe((frame) =>
  frame.src.includes('doubleclick.net') ||
  frame.classList.contains('ad-frame')
);
```

### Finding Communication Frames

```typescript
import { findIframeByName } from 'iframe-finder';

// Find chat or messaging iframe
const chatFrame = findIframeByName('chat-widget');
if (chatFrame) {
  // Setup postMessage communication
  chatFrame.contentWindow?.postMessage({ type: 'init' }, '*');
}
```

## Browser Support

Works in all modern browsers that support:
- `querySelector` / `querySelectorAll`
- `HTMLIFrameElement.contentDocument`
- `Array.from`

This includes:
- Chrome/Edge 45+
- Firefox 40+
- Safari 10+
- Opera 32+

## Security Notes

- Cross-origin iframes are automatically skipped due to browser security restrictions
- The library catches and silently handles cross-origin access errors
- Always validate and sanitize any data retrieved from iframe content

## License

MIT © Artem Deikun

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [GitHub Repository](https://github.com/artemhp/iframe-finder)
- [npm Package](https://www.npmjs.com/package/iframe-finder)
- [Report Issues](https://github.com/artemhp/iframe-finder/issues)
