"use client"

import { LOCAL_STORAGE_SAVED_LICITATIONS } from "@/CONSTANTS"
import { LocalStorageLicitation } from "@/types"
import { IconHome, IconSearch, IconStar } from "@tabler/icons-react"
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
						<IconHome />
						Home
					</Link>
				</div>

				<div className="flex gap-2 items-center">
					<div className="dropdown dropdown-hover dropdown-end">
						<div tabIndex={0} role="button" className="m-2">
							<div className="flex gap-1 items-center text-gray-200">
								<IconStar />({savedLicitations.length})
							</div>
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content menu bg-white z-[1] w-64 shadow"
						>
							{savedLicitations.map((licitation) => {
								return (
									<li key={licitation.id} className="">
										<Link
											href={`/licitaciones/${licitation.id}`}
											className="font-bold text-gray-600 hover:text-success transition-colors hover:bg-gray-100 rounded-none"
										>
											<span className="overflow-hidden line-clamp-2">
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
