import { IconHome, IconSearch } from "@tabler/icons-react"
import Link from "next/link"

export function Header() {
	return (
		<header className="bg-gray-900 border-gray-700">
			<nav className="container mx-auto flex items-center justify-between p-4 md:px-8 max-w-5xl">
				<Link
					href="/"
					className="flex gap-2 items-center btn btn-link text-info text-lg p-0"
					aria-current="page"
				>
					<IconHome />
					Home
				</Link>
				<Link
					href="/licitaciones"
					className="flex gap-2 items-center btn btn-outline btn-info"
					aria-current="page"
				>
					<IconSearch />
					Buscar
				</Link>
			</nav>
		</header>
	)
}
