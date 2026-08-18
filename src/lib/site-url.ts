export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://nuradi.co.in';
  return value.replace(/\/$/, '');
}
