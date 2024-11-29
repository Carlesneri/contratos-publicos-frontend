import Link from "next/link"

export function Header() {
	return (
		<header className="h-full">
			<nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
				<div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
					<a
						href="/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<img src="/favicon.svg" className="h-8" alt="Flowbite Logo" />
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Contratos Públicos
						</span>
					</a>
					<div className="" id="navbar-dropdown">
						<ul className="flex font-medium p-0 border-gray-100 rounded-lg space-x-8 rtl:space-x-reverse flex-row mt-0 border-0 bg-white dark:bg-gray-900 dark:border-gray-700">
							<li>
								<a
									href="#"
									className="block py-2 px-3 text-gray-800 rounded bg-transparent p-0"
									aria-current="page"
								>
									Home
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}
