"use client"

import Link from "next/link"

export function Pagination({
	isNextPage,
	prevPage,
	nextPage,
	page,
}: {
	isNextPage: boolean
	prevPage: string
	nextPage: string
	page: number
}) {
	return (
		<div className="join grid grid-cols-[1fr_auto_1fr] place-content-center">
			<Link
				href={prevPage}
				className={`join-item btn text-gray-800 ${
					!page || page === 1 ? "btn-disabled" : "btn-outline"
				}`}
			>
				Anterior página
			</Link>
			<div className="self-center px-4 font-bold">{page || "1"}</div>
			<Link
				href={nextPage}
				className={`join-item btn text-gray-800 ${
					isNextPage ? "btn-outline" : "btn-disabled"
				}`}
			>
				Siguiente página
			</Link>
		</div>
	)
}
