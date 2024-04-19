import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  day = day < 10 ? 0 + day : day;
  month = month < 10 ? 0 + month : month;

  return `${day} ${months[month - 1]} ${year}`;
}

import { Poppins } from "next/font/google";

export const tiltePoppins = Poppins({ weight: "600", subsets: ["latin"] });
