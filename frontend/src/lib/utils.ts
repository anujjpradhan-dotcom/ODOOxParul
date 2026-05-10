import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatDate(date: string | Date, formatStr: string = "PPP") {
  return format(new Date(date), formatStr);
}

export function formatDateRange(start: string | Date, end: string | Date) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
    return `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`;
  }
  
  return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
