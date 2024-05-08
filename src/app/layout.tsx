import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TheLivingRoom",
  description: "Research project for graduation in Public Health Study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative md:max-w-[1200px] max-w-[620px] min-h-2xl mx-auto xs:px-10 md:px-20 px-4">
            {children}
        </div>
      </body>
    </html>
  );
}
