"use client"

import { ARTICLES, LOCAL_STORAGE_SAVED_LICITATIONS } from "@/CONSTANTS"
import { LocalStorageLicitation } from "@/types"
import {
	IconKeyframeFilled,
	IconSearch,
	IconStar,
	IconStarFilled,
} from "@tabler/icons-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Header() {
	const [savedLicitations, setSavedLicitations] = useState<
		LocalStorageLicitation[]
	>([])

	function getSavedLicitations() {
		const savedLicitations = JSON.parse(
			localStorage.getItem(LOCAL_STORAGE_SAVED_LICITATIONS) || "[]"
		)

		setSavedLicitations(savedLicitations)
	}

	useEffect(() => {
		getSavedLicitations()

		window.addEventListener("storage", getSavedLicitations)

		return () => {
			window.removeEventListener("storage", getSavedLicitations)
		}
	}, [])

	return (
		<header className="bg-gray-900 border-gray-700">
			<nav className="container mx-auto flex items-center justify-between p-4 md:px-8 max-w-5xl">
				<div>
					<Link
						href="/"
						className="flex gap-2 items-center btn btn-link text-info text-lg p-0"
						aria-current="page"
					>
						<IconKeyframeFilled />
						Inicio
					</Link>
				</div>

				<div className="flex gap-2 items-center">
					<div className="dropdown dropdown-hover relative">
						<div tabIndex={0} role="button" className="m-2">
							<Link
								href={"/articulos"}
								className="flex items-center gap-1 text-white font-bold"
							>
								Artículos
							</Link>
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content menu bg-white z-[1] w-64 shadow p-0 absolute right-0 translate-x-1/2"
						>
							{ARTICLES.map((article) => {
								return (
									<li key={article.slug} className="flex">
										<Link
											href={`/articulos/${article.slug}`}
											className="font-bold text-gray-600 hover:text-gray-800 transition-colors hover:bg-gray-100 rounded-none"
											title={article.title}
										>
											<span className="overflow-hidden line-clamp-2">
												<IconKeyframeFilled className="inline w-3 pb-1 mr-1" />
												{article.title}
											</span>
										</Link>
									</li>
								)
							})}
						</ul>
					</div>

					<div className="dropdown dropdown-hover relative">
						<div tabIndex={0} role="button" className="m-2">
							<div className="flex gap-1 items-center text-yellow-500">
								<IconStar />({savedLicitations.length})
							</div>
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content menu bg-white z-[1] w-64 shadow p-0 absolute right-0 translate-x-1/2"
						>
							{savedLicitations.length === 0 && (
								<li className="text-center text-gray-400 font-bold p-2">
									No hay licitaciones guardadas
								</li>
							)}
							{savedLicitations.map((licitation) => {
								return (
									<li key={licitation.id} className="flex">
										<Link
											href={`/licitaciones/${licitation.id}`}
											className="font-bold text-gray-600 hover:text-success transition-colors hover:bg-gray-100 rounded-none"
											title={licitation.title}
										>
											<span className="overflow-hidden line-clamp-2">
												<IconStarFilled className="inline w-3 pb-1 mr-1" />
												{licitation.title}
											</span>
										</Link>
									</li>
								)
							})}
						</ul>
					</div>

					<Link
						href="/licitaciones"
						className="flex gap-2 items-center btn btn-outline btn-info"
						aria-current="page"
					>
						<IconSearch />
						Buscar
					</Link>
				</div>
			</nav>
		</header>
	)
}
