import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge.
 * @param inputs - List of class names, objects, or arrays
 * @returns Optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts Sanity Portable Text to a plain text string for SEO/JSON-LD.
 * @param blocks - Array of Sanity block objects
 * @returns Normalized plain text string
 */
export function toPlainText(blocks: unknown[] = []): string {
  return (
    blocks
      // loop through each block
      .map((block) => {
        const b = block as { _type?: string; children?: { text?: string }[] };
        // if it's not a text block with children, return empty string
        if (b._type !== 'block' || !b.children) {
          return '';
        }
        // loop through the children spans, and join them
        return b.children.map((child) => child.text || '').join('');
      })
      // join the paragraphs with a space
      .join(' ')
  );
}
