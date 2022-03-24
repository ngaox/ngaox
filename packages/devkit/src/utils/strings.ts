export function titleCase(s: string) {
  return (s.replace(/-/g, ' ') as string).replace(/^\w/, c => c.toUpperCase());
}
