/**
 * Options for finding iframes
 */
export interface FindIframeOptions {
  /**
   * Starting document to search from (defaults to window.document)
   */
  rootDocument?: Document;

  /**
   * Maximum depth to search (defaults to unlimited)
   */
  maxDepth?: number;
}

/**
 * Predicate function for custom iframe matching
 */
export type IframePredicate = (iframe: HTMLIFrameElement) => boolean;

/**
 * Recursively searches for an iframe by its id attribute
 *
 * @param id - The id attribute to search for
 * @param options - Search options
 * @returns The found iframe element or null if not found
 *
 * @example
 * ```typescript
 * const iframe = findIframeById('myFrame');
 * if (iframe) {
 *   console.log('Found iframe:', iframe);
 * }
 * ```
 */
export function findIframeById(
  id: string,
  options: FindIframeOptions = {}
): HTMLIFrameElement | null {
  const { rootDocument = document, maxDepth = Infinity } = options;

  return findIframeRecursive(
    (iframe) => iframe.id === id,
    rootDocument,
    0,
    maxDepth
  );
}

/**
 * Recursively searches for an iframe by its name attribute
 *
 * @param name - The name attribute to search for
 * @param options - Search options
 * @returns The found iframe element or null if not found
 *
 * @example
 * ```typescript
 * const iframe = findIframeByName('contentFrame');
 * if (iframe) {
 *   console.log('Found iframe:', iframe);
 * }
 * ```
 */
export function findIframeByName(
  name: string,
  options: FindIframeOptions = {}
): HTMLIFrameElement | null {
  const { rootDocument = document, maxDepth = Infinity } = options;

  return findIframeRecursive(
    (iframe) => iframe.name === name,
    rootDocument,
    0,
    maxDepth
  );
}

/**
 * Recursively searches for an iframe using a custom predicate function
 *
 * @param predicate - Function that returns true when iframe matches criteria
 * @param options - Search options
 * @returns The found iframe element or null if not found
 *
 * @example
 * ```typescript
 * // Find iframe with specific src
 * const iframe = findIframe((frame) => frame.src.includes('example.com'));
 *
 * // Find iframe with specific class
 * const iframe = findIframe((frame) => frame.classList.contains('special'));
 * ```
 */
export function findIframe(
  predicate: IframePredicate,
  options: FindIframeOptions = {}
): HTMLIFrameElement | null {
  const { rootDocument = document, maxDepth = Infinity } = options;

  return findIframeRecursive(predicate, rootDocument, 0, maxDepth);
}

/**
 * Internal recursive function to search for iframes
 *
 * @param predicate - Function to test each iframe
 * @param doc - Current document to search
 * @param currentDepth - Current recursion depth
 * @param maxDepth - Maximum allowed depth
 * @returns Found iframe or null
 */
function findIframeRecursive(
  predicate: IframePredicate,
  doc: Document,
  currentDepth: number,
  maxDepth: number
): HTMLIFrameElement | null {
  // Check depth limit
  if (currentDepth > maxDepth) {
    return null;
  }

  // Get all iframes in current document
  const iframes = doc.querySelectorAll('iframe');

  // First pass: check current level
  for (const iframe of Array.from(iframes)) {
    if (predicate(iframe)) {
      return iframe;
    }
  }

  // Second pass: recurse into nested iframes
  for (const iframe of Array.from(iframes)) {
    try {
      const contentDoc = iframe.contentDocument;
      if (!contentDoc) continue;

      const foundInNested = findIframeRecursive(
        predicate,
        contentDoc,
        currentDepth + 1,
        maxDepth
      );

      if (foundInNested) {
        return foundInNested;
      }
    } catch (error) {
      // Skip iframes we can't access (cross-origin security)
      continue;
    }
  }

  return null;
}

/**
 * Finds all iframes matching the predicate (non-recursive, single level)
 *
 * @param predicate - Function to test each iframe
 * @param rootDocument - Starting document (defaults to window.document)
 * @returns Array of matching iframes
 *
 * @example
 * ```typescript
 * // Find all iframes with specific class
 * const iframes = findAllIframes((frame) => frame.classList.contains('content'));
 * ```
 */
export function findAllIframes(
  predicate: IframePredicate,
  rootDocument: Document = document
): HTMLIFrameElement[] {
  const iframes = rootDocument.querySelectorAll('iframe');
  return Array.from(iframes).filter(predicate);
}

/**
 * Recursively searches for an element by CSS selector across all iframes
 *
 * @param selector - CSS selector to search for
 * @param options - Search options
 * @returns The first matching element or null if not found
 *
 * @example
 * ```typescript
 * // Find element anywhere in iframe hierarchy
 * const healthTab = findElement('[title="Character Info"]');
 *
 * // Find with depth limit
 * const element = findElement('.special-class', { maxDepth: 3 });
 * ```
 */
export function findElement(
  selector: string,
  options: FindIframeOptions = {}
): HTMLElement | null {
  const { rootDocument = document, maxDepth = Infinity } = options;

  return findElementRecursive(selector, rootDocument, 0, maxDepth);
}

/**
 * Internal recursive function to search for element across iframes
 *
 * @param selector - CSS selector to search for
 * @param doc - Current document to search
 * @param currentDepth - Current recursion depth
 * @param maxDepth - Maximum allowed depth
 * @returns Found element or null
 */
function findElementRecursive(
  selector: string,
  doc: Document,
  currentDepth: number,
  maxDepth: number
): HTMLElement | null {
  // Check depth limit
  if (currentDepth > maxDepth) {
    return null;
  }

  // Try to find element in current document
  const element = doc.querySelector(selector) as HTMLElement | null;
  if (element) {
    return element;
  }

  // Search in all nested iframes
  const iframes = doc.querySelectorAll('iframe');
  for (const iframe of Array.from(iframes)) {
    try {
      const contentDoc = iframe.contentDocument;
      if (!contentDoc) continue;

      const foundInNested = findElementRecursive(
        selector,
        contentDoc,
        currentDepth + 1,
        maxDepth
      );

      if (foundInNested) {
        return foundInNested;
      }
    } catch (error) {
      // Skip iframes we can't access (cross-origin security)
      continue;
    }
  }

  return null;
}

/**
 * Recursively searches for all elements matching CSS selector across all iframes
 *
 * @param selector - CSS selector to search for
 * @param options - Search options
 * @returns Array of all matching elements
 *
 * @example
 * ```typescript
 * // Find all matching elements across all iframes
 * const buttons = findAllElements('button.submit');
 *
 * // Find with depth limit
 * const elements = findAllElements('.item', { maxDepth: 2 });
 * ```
 */
export function findAllElements(
  selector: string,
  options: FindIframeOptions = {}
): HTMLElement[] {
  const { rootDocument = document, maxDepth = Infinity } = options;
  const results: HTMLElement[] = [];

  findAllElementsRecursive(selector, rootDocument, 0, maxDepth, results);

  return results;
}

/**
 * Internal recursive function to find all elements across iframes
 *
 * @param selector - CSS selector to search for
 * @param doc - Current document to search
 * @param currentDepth - Current recursion depth
 * @param maxDepth - Maximum allowed depth
 * @param results - Array to collect results
 */
function findAllElementsRecursive(
  selector: string,
  doc: Document,
  currentDepth: number,
  maxDepth: number,
  results: HTMLElement[]
): void {
  // Check depth limit
  if (currentDepth > maxDepth) {
    return;
  }

  // Find all elements in current document
  const elements = doc.querySelectorAll(selector);
  results.push(...Array.from(elements) as HTMLElement[]);

  // Search in all nested iframes
  const iframes = doc.querySelectorAll('iframe');
  for (const iframe of Array.from(iframes)) {
    try {
      const contentDoc = iframe.contentDocument;
      if (!contentDoc) continue;

      findAllElementsRecursive(
        selector,
        contentDoc,
        currentDepth + 1,
        maxDepth,
        results
      );
    } catch (error) {
      // Skip iframes we can't access (cross-origin security)
      continue;
    }
  }
}

// Export default object with all functions
export default {
  findIframeById,
  findIframeByName,
  findIframe,
  findAllIframes,
  findElement,
  findAllElements,
};
