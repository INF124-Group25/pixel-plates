import type { Metadata } from "next";
import "../globals.css";
import Header from "../../app/(general)/Header";
import Footer from "../../app/(general)/Footer";
import { AuthProvider } from "@/components/AuthContext";
/* 
for use with dynamic import (ssr: false)
// import dynamic from "next/dynamic";
// const AuthContext = dynamic(() => import('../../components/AuthContext'), { ssr: false })
*/


export const metadata: Metadata = {
    title: "PixelPlates",
    description:
        "Social media platform for foodies to post and following favorite food content creators.",
};



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Header />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
