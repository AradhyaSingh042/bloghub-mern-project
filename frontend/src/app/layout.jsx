import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserContextProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "A next-gen blogging app",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-[1100px] max-w-[1100px] mx-auto overflow-x-hidden overflow-y-auto p-2.5">
          <UserContextProvider>
            <Navbar />
            {children}
          </UserContextProvider>
        </div>
      </body>
    </html>
  );
}
