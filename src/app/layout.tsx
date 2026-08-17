/**
 * Rotoppsettet er bevisst tomt. <html> og <body> settes i
 * `src/app/[locale]/layout.tsx`, slik at lang-attributtet følger språket.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
