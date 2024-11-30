"use client"

import { ChangeEvent, useEffect, useState } from "react"
import {
	IconSearch,
	IconFilter,
	IconCaretDownFilled,
} from "@tabler/icons-react"
import { Licitation } from "@/types"
import { LicitationCard } from "./LicitationCard"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { VALID_LICITATION_FIELDS } from "@/CONSTANTS"
import { Fields } from "@/database/fields"

export function LicitationsSearch({
	initialLicitations,
	page,
	fields,
	isNextPage,
}: {
	initialLicitations: Licitation[]
	page: number
	fields: Fields
	isNextPage: boolean
}) {
	const [licitations, setlicitations] = useState(initialLicitations)
	const [searchTerm, setSearchTerm] = useState("")
	const searchParams = useSearchParams()

	useEffect(() => {
		const params = new URLSearchParams(searchParams)

		setSearchTerm(params.toString())
	}, [searchParams])

	useEffect(() => {
		const params = new URLSearchParams(searchTerm)

		params.set("page", "1")

		setSearchTerm(params.toString())
	}, [searchTerm])

	useEffect(() => {
		setlicitations(initialLicitations)
	}, [initialLicitations])

	const getPrevPage = () => {
		const prevPage = page ? page - 1 : 1

		const params = new URLSearchParams(searchParams)

		params.set("page", prevPage.toString())

		return `/licitaciones/?${params.toString()}`
	}

	const getNextPage = () => {
		const nextPage = page ? page + 1 : 2

		const params = new URLSearchParams(searchParams)

		params.set("page", nextPage.toString())

		return `/licitaciones/?${params.toString()}`
	}

	function handleChangeCheckbox(
		e: ChangeEvent<HTMLInputElement>,
		{
			field,
			value,
		}: { field: (typeof VALID_LICITATION_FIELDS)[number]; value: string }
	) {
		const checked = e.target.checked
		const params = new URLSearchParams(searchTerm)
		const fieldParam = params.get(field) || ""
		const fieldValuesSet = new Set(fieldParam.split(",").filter(Boolean))

		checked ? fieldValuesSet.add(value) : fieldValuesSet.delete(value)

		fieldValuesSet.size > 0
			? params.set(field, Array.from(fieldValuesSet).join(","))
			: params.delete(field)

		setSearchTerm(params.toString())
	}

	function isInSearchParam({
		field,
		value,
	}: {
		field: (typeof VALID_LICITATION_FIELDS)[number]
		value: string
	}): boolean {
		const params = new URLSearchParams(searchTerm)
		const fieldParam = params.get(field) || ""
		const fieldValuesSet = new Set(fieldParam.split(",").filter(Boolean))

		return fieldValuesSet.has(value)
	}

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h1 className="text-3xl font-bold mb-6">Últimas actualizaciones</h1>

				<form onSubmit={() => {}} className="space-y-6">
					<details className="bg-gray-50 p-4" open>
						<summary className="flex items-center mb-4 gap-4">
							<div className="cursor-pointer flex gap-2 items-center">
								<IconCaretDownFilled size={32} />
								<h2 className="text-lg font-semibold">Filtros</h2>
								<IconFilter />
							</div>
							<Link
								href={`/licitaciones/?${searchTerm}`}
								type="submit"
								className="btn btn-outline flex-1 text-base gap-2"
							>
								<IconSearch className="w-5" />
								Buscar
							</Link>
						</summary>

						<div className="flex flex-col gap-4">
							{fields["Estado de la Licitación"] && (
								<div className="flex flex-col gap-4">
									<label className="font-bold text-gray-800">
										Estado de la Licitación
									</label>
									<ul className="flex gap-x-4 gap-y-2 flex-wrap">
										{fields["Estado de la Licitación"].map((option, index) => {
											return (
												<div
													className="flex gap-2 items-center"
													key={option + index}
												>
													<label htmlFor={option}>{option}</label>
													<input
														type="checkbox"
														className="checkbox checkbox-sm"
														onChange={(e) =>
															handleChangeCheckbox(e, {
																field: "Estado de la Licitación",
																value: option,
															})
														}
														value={option}
														id={option}
														checked={isInSearchParam({
															field: "Estado de la Licitación",
															value: option,
														})}
													/>
												</div>
											)
										})}
									</ul>
								</div>
							)}

							{fields["Tipo de Contrato:"] && (
								<div className="flex flex-col gap-4">
									<label className="font-bold text-gray-800">
										Tipo de Contrato
									</label>
									<ul className="flex gap-x-4 gap-y-2 flex-wrap">
										{fields["Tipo de Contrato:"].map((option, index) => {
											return (
												<div
													className="flex gap-2 items-center"
													key={option + index}
												>
													<label htmlFor={option}>{option}</label>
													<input
														type="checkbox"
														className="checkbox checkbox-sm"
														onChange={(e) =>
															handleChangeCheckbox(e, {
																field: "Tipo de Contrato:",
																value: option,
															})
														}
														value={option}
														id={option}
														checked={isInSearchParam({
															field: "Tipo de Contrato:",
															value: option,
														})}
													/>
												</div>
											)
										})}
									</ul>
								</div>
							)}

							{fields["Tipo de tramitación"] && (
								<div className="flex flex-col gap-4">
									<label className="font-bold text-gray-800">
										Tipo de tramitación
									</label>
									<ul className="flex gap-x-4 gap-y-2 flex-wrap">
										{fields["Tipo de tramitación"].map((option, index) => {
											return (
												<div
													className="flex gap-2 items-center"
													key={option + index}
												>
													<label htmlFor={option}>{option}</label>
													<input
														type="checkbox"
														className="checkbox checkbox-sm"
														onChange={(e) =>
															handleChangeCheckbox(e, {
																field: "Tipo de tramitación",
																value: option,
															})
														}
														value={option}
														id={option}
														defaultChecked={isInSearchParam({
															field: "Tipo de tramitación",
															value: option,
														})}
													/>
												</div>
											)
										})}
									</ul>
								</div>
							)}
						</div>
					</details>
				</form>
			</div>

			<div className="flex flex-col w-full gap-4">
				{licitations.map((licitation) => (
					<LicitationCard key={licitation.id} licitation={licitation} />
				))}
			</div>

			<div className="join grid grid-cols-[1fr_auto_1fr] place-content-center">
				<Link
					href={getPrevPage()}
					className={`join-item btn btn-outline ${
						!page || page === 1 ? "btn-disabled" : ""
					}`}
				>
					Anterior página
				</Link>
				<div className="self-center px-4 font-bold">{page || "1"}</div>
				<Link
					href={getNextPage()}
					className={`join-item btn btn-outline ${
						isNextPage ? "" : "btn-disabled"
					}`}
				>
					Siguiente página
				</Link>
			</div>
		</div>
	)
}
