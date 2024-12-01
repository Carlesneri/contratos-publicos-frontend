"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import {
	IconSearch,
	IconFilter,
	IconCaretDownFilled,
	IconMapPin,
	IconHammer,
	IconBuildingEstate,
} from "@tabler/icons-react"
import { Licitation } from "@/types"
import { LicitationCard } from "./LicitationCard"
import { useSearchParams, useRouter } from "next/navigation"
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
	const router = useRouter()

	useEffect(() => {
		setSearchTerm(searchParams.toString())
	}, [searchParams])

	useEffect(() => {
		setlicitations(initialLicitations)
	}, [initialLicitations])

	useEffect(() => {
		console.log({ searchTerm })
	}, [searchTerm])

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

	function handleInput(
		e: FormEvent<HTMLInputElement | HTMLDataListElement>,
		{ field }: { field: (typeof VALID_LICITATION_FIELDS)[number] }
	) {
		const params = new URLSearchParams(searchTerm)

		const value = (e.target as HTMLInputElement).value

		value ? params.set(field, value) : params.delete(field)

		setSearchTerm(params.toString())
	}

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h1 className="text-3xl font-bold mb-6">Últimas actualizaciones</h1>

				<details className="bg-gray-50 p-4" open>
					<summary className="flex items-center mb-4 gap-4">
						<div className="cursor-pointer flex gap-2 items-center">
							<IconCaretDownFilled size={32} />
							<h2 className="text-lg font-semibold">Filtros</h2>
							<IconFilter />
						</div>
						<button
							className="btn btn-outline btn-primary flex-1 text-base gap-2"
							onClick={() => {
								const searchParams = new URLSearchParams(searchTerm)

								searchParams.delete("page")

								router.push(`/licitaciones/?${searchParams.toString()}`)
							}}
						>
							<IconSearch className="w-5" />
							Buscar
						</button>
					</summary>

					<div className="flex flex-col gap-4">
						<label className="form-control w-full">
							<div className="label">
								<span className="flex gap-2 label-text text-base font-bold text-gray-800">
									<IconHammer />
									Buscar por objeto del contrato
								</span>
							</div>
							<input
								type="text"
								placeholder="conservación, carreteras, limpieza..."
								className="input input-bordered w-full dark:text-gray-100"
								onInput={(e) =>
									handleInput(e, { field: "Objeto del contrato" })
								}
							/>
							<div className="label">
								<span className="label-text">
									Escribe los conceptos separados por comas
								</span>
							</div>
						</label>

						<label className="form-control w-full">
							<div className="label">
								<span className="flex gap-2 label-text text-base font-bold text-gray-800">
									<IconMapPin />
									Buscar por lugar de ejecución
								</span>
							</div>
							<input
								list="places"
								placeholder="Escribe para seleccionar lugar"
								className="input input-bordered w-full dark:text-gray-100"
								onInput={(e) => handleInput(e, { field: "Lugar de Ejecución" })}
							/>
							<datalist id="places">
								{fields["Lugar de Ejecución"]?.map((place, index) => {
									return <option key={place + index} value={place} />
								})}
							</datalist>
						</label>

						<label className="form-control w-full">
							<div className="label">
								<span className="flex gap-2 label-text text-base font-bold text-gray-800">
									<IconBuildingEstate />
									Buscar por órgano de contratación
								</span>
							</div>
							<input
								list="organs"
								placeholder="Escribe para seleccionar órgano"
								className="input input-bordered w-full dark:text-gray-100"
								onInput={(e) =>
									handleInput(e, { field: "Órgano de Contratación" })
								}
							/>
							<datalist id="organs">
								{fields["Órgano de Contratación"]?.map((organ, index) => {
									return <option key={organ + index} value={organ} />
								})}
							</datalist>
						</label>

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
			</div>

			<div className="flex flex-col w-full gap-4">
				{licitations.length === 0 && (
					<div className="font-bold text-xl my-4 text-center text-gray-800">
						No se encontraron resultados
					</div>
				)}

				{licitations.map((licitation) => (
					<LicitationCard key={licitation.id} licitation={licitation} />
				))}
			</div>

			<div className="join grid grid-cols-[1fr_auto_1fr] place-content-center">
				<Link
					href={getPrevPage()}
					className={`join-item btn text-gray-800 ${
						!page || page === 1 ? "btn-disabled" : "btn-outline"
					}`}
				>
					Anterior página
				</Link>
				<div className="self-center px-4 font-bold">{page || "1"}</div>
				<Link
					href={getNextPage()}
					className={`join-item btn text-gray-800 ${
						isNextPage ? "btn-outline" : "btn-disabled"
					}`}
				>
					Siguiente página
				</Link>
			</div>
		</div>
	)
}
