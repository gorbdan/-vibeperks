import "./globals.css";

export const metadata = {
  title: "VibePerks",
  description: "Tiny AI perks for coding status lines"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
