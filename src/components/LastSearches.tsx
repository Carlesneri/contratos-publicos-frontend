"use client"

import { LOCAL_STORAGE_SAVED_SEARCHES } from "@/CONSTANTS"
import Link from "next/link"
import { useEffect, useState } from "react"

export function LastSearches() {
	const [lastSearches, setLastSearches] = useState<string[]>([])

	function saveLastSearches() {
		const storageLastSearches = JSON.parse(
			localStorage.getItem(LOCAL_STORAGE_SAVED_SEARCHES) || "[]"
		) as string[]

		setLastSearches(storageLastSearches)
	}

	useEffect(() => {
		saveLastSearches()

		window.addEventListener("storage", saveLastSearches)

		return () => {
			window.removeEventListener("storage", saveLastSearches)
		}
	}, [])

	return lastSearches.length > 0 ? (
		<div className="w-full">
			<h5 className="text-xl pb-2">Tus últimas búsquedas:</h5>
			<ul className="flex flex-col gap-1">
				{lastSearches.map((search) => (
					<li key={search} className="">
						<Link
							href={`/licitaciones/?${search}#resultados`}
							className="flex bg-yellow-500/50 border-2 border-transparent hover:border-2 hover:border-yellow-500 transition-colors px-2 py-1 w-fit items-center text-sm text-gray-800 max-w-full"
						>
							<div className="breadcrumbs max-w-full p-1">
								<ul>
									{Array.from(new URLSearchParams(search).entries()).map(
										([key, value]) => {
											return (
												<li key={key} className="flex gap-1 text-gray-600">
													<span className="text-gray-800">{key}</span>
													<span className="font-bold">{value}</span>
												</li>
											)
										}
									)}
								</ul>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	) : null
}
