import "../styles/globals.css";

export const metadata = {
  title: "JUPLEND Risk Guard",
  description: "Solana DeFi risk analytics dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
