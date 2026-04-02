export function convertHtmlToGoogleDocText(html: string): string {
  return html
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<(p|div|section|article|h[1-6])[^>]*>/gi, '')
    .replace(/<\/(p|div|section|article|h[1-6])>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n\n- /g, '\n- ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function pickFirstNonEmptyArray<T>(
  ...candidates: Array<T[] | null | undefined>
): T[] {
  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length > 0) {
      return candidate;
    }
  }

  return [];
}
