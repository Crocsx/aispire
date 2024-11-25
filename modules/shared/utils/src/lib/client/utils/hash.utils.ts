/**
 * Parses a URL hash string into an object of key-value pairs.
 * @param hash - The hash string from the URL, including or excluding the leading '#'.
 * @returns An object with key-value pairs parsed from the hash.
 */
export function parseHashToObject(hash: string): Record<string, string> {
  // Remove the leading '#' if present
  const cleanedHash = hash.startsWith('#') ? hash.slice(1) : hash;

  // Create an object from URL search parameters in the hash
  const params = new URLSearchParams(cleanedHash);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}
