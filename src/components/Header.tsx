import Link from "next/link"

export function Header() {
	return (
		<header className="h-full">
			<nav className="container mx-auto max-w-5xl px-4 text-4xl font-bold my-8">
				<Link href="/">Contratos Públicos</Link>
			</nav>
		</header>
	)
}
