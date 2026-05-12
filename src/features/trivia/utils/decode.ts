/**
 * Robust utility to decode HTML entities returned by the Open Trivia Database API.
 * Completely SSR safe as it does not rely on DOMParser or window objects.
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return "";

  const entities: Record<string, string> = {
    "&quot;": '"',
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&#039;": "'",
    "&apos;": "'",
    "&deg;": "°",
    "&shy;": "",
    "&micro;": "µ",
    "&middot;": "·",
    "&hellip;": "…",
    "&ndash;": "–",
    "&mdash;": "—",
    "&lsquo;": "‘",
    "&rsquo;": "’",
    "&sbquo;": "‚",
    "&ldquo;": "“",
    "&rdquo;": "”",
    "&bdquo;": "„",
    "&epsilon;": "ε",
    "&phi;": "φ",
  };

  return text.replace(/&[a-zA-Z0-9#]+;/g, (match) => {
    if (entities[match]) {
      return entities[match];
    }
    // Handle numeric character references like &#039; or &#x27;
    if (match.startsWith("&#")) {
      const isHex = match.startsWith("&#x");
      const numCode = isHex
        ? parseInt(match.slice(3, -1), 16)
        : parseInt(match.slice(2, -1), 10);
      if (!isNaN(numCode)) {
        return String.fromCharCode(numCode);
      }
    }
    return match;
  });
}
