import { IconHome, IconSearch } from "@tabler/icons-react"
import Link from "next/link"

export function Header() {
	return (
		<header className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
			<nav className="container mx-auto flex items-center justify-between p-4 max-w-5xl">
				<Link
					href="/"
					className="flex gap-2 items-center btn btn-link text-info text-lg"
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
