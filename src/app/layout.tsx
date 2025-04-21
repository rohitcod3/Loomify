import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "sonner";
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
    <ClerkProvider
     publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >

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

            <ReactQueryProvider>
              {children}
              <Toaster/>
            </ReactQueryProvider>
            </ReduxProvider>
          </ThemeProvider>
       
      </body>
    </html>
    </ClerkProvider>
  );
}
