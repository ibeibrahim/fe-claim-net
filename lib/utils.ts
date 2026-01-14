import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name?: string, limit = 2) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, limit)
    .join("")
    .toUpperCase() ?? "";
