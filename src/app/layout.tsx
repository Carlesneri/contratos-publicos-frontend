import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Footer from "@/components/Footer"
import { Header } from "@/components/Header"
import Script from "next/script"

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
	title: "Portal de Licitaciones y Contratos Públicos",
	description:
		"Consulta, busca y gestiona licitaciones y contratos públicos en España. Descubre oportunidades del sector público en tiempo real con nuestra plataforma. Encuentre licitaciones de obras públicas.",
	keywords:
		"licitaciones, licitaciones del estado, contratación pública, contratos sector público, buscador de licitaciones, concesión de servicios, contratos de obras, licitaciones abiertas, licitaciones de obras públicas.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<head>
				<link rel="icon" href="/favicon.svg" sizes="any" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-200 text-gray-800 flex flex-col`}
			>
				{/* <!-- Google tag (gtag.js) --> */}
				<Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-6W344SC0BL"
				/>
				<Script id="google-analytics">
					{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					
					gtag('config', 'G-6W344SC0BL');
					`}
				</Script>
				{/* <!-- Google tag (gtag.js) --> */}
				<Header />
				<main className="flex flex-1 container mx-auto my-6 px-4 md:px-8 max-w-5xl gap-6 flex-col">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	)
}
