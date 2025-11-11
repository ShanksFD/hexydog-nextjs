import { cookies, headers } from "next/headers";

export async function getLocale() {
  const cookieStore = await cookies();
  const headersList = await headers();
  
  // Try to get locale from cookie first
  const localeCookie = cookieStore.get("NEXT_LOCALE");
  if (localeCookie?.value) {
    return localeCookie.value;
  }
  
  // Fall back to header set by middleware
  const localeHeader = headersList.get("x-locale");
  if (localeHeader) {
    return localeHeader;
  }
  
  // Final fallback to default
  return "en";
}

