import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";
import { ReduxProvider } from "@/redux/provider";
const manrope = Manrope({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Loomify",
  description: "Share AI powered videos with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={`${manrope.className} bg-[#171717]`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>

            <ReactQueryProvider>{children}</ReactQueryProvider>
            </ReduxProvider>
          </ThemeProvider>
       
      </body>
    </html>
    </ClerkProvider>
  );
}
