import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Footer from "@/components/Footer"
import { Header } from "@/components/Header"

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
})
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
})

export const metadata: Metadata = {
	title: "Contratos Públicos",
	description: "Consulta el estado de los contratos públicos en España.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-200 text-gray-800 flex flex-col`}
			>
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
