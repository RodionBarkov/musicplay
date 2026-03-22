export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

export const joinUrl = (base: string, ...parts: Array<string | number>) => {
  const normalizedBase = base.replace(/\/+$/, "")
  const normalizedParts = parts
    .filter((part) => part !== undefined && part !== null && part !== "")
    .map((part) => String(part).replace(/^\/+|\/+$/g, ""))

  return [normalizedBase, ...normalizedParts].join("/")
}


