// Utility to convert JS style object to inline CSS string
export const serializeStyles = (styles: Record<string, any>) =>
  Object.entries(styles)
    .map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`)
    .join(" ");