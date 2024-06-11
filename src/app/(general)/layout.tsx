import type { Metadata } from "next";
import "../globals.css";
import Header from "@/app/(general)/Header";
import Footer from "@/app/(general)/Footer";
// import UserContext from "@/components/UserContext";
import dynamic from "next/dynamic";
const UserContext = dynamic(() => import('@/components/UserContext'), { ssr: false })


// const inter = Inter({ subsets: ["latin"] });

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
                <UserContext>
                    <Header />
                    {children}
                    <Footer />
                </UserContext>
            </body>
        </html>
    );
}
