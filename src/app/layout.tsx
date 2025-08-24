import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArchiNavigator",
  description: "Put Together the Strongest College Portfolio - Learn the design process of architecture as just a high school student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}