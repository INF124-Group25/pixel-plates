import "../globals.css";

export const metadata = {
  title: 'Login',
  description: 'Login page for PixelPlates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
