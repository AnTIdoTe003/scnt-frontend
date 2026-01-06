export function formatINR(input: string | number): string {
  // If we already have a string with ₹, keep it.
  if (typeof input === "string") {
    const trimmed = input.trim()
    if (trimmed.startsWith("₹")) return trimmed
    // Back-compat (older seed data)
    if (trimmed.startsWith("$")) return `₹${trimmed.slice(1)}`
    return trimmed
  }

  // Number → INR currency formatting (no decimals)
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(input)
}


