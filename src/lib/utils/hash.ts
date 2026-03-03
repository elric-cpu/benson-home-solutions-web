/**
 * Normalizes an address for consistent hashing.
 */
export function normalizeAddress(address: string): string {
  return address.toLowerCase().replace(/[.,]/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Generates a unique SHA-256 hash for a given address string.
 * Uses Web Crypto API for browser and server compatibility.
 */
export async function generateAddressHash(address: string): Promise<string> {
  const normalized = normalizeAddress(address);
  const msgBuffer = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
