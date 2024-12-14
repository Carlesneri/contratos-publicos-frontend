"use client"

import {
	ChangeEvent,
	FormEvent,
	MouseEvent,
	useEffect,
	useRef,
	useState,
} from "react"
import {
	IconSearch,
	IconFilter,
	IconCaretDownFilled,
	IconMapPin,
	IconHammer,
	IconBuildingEstate,
	IconFilterOff,
	IconFilterFilled,
	IconFileDescription,
	IconFilterMinus,
} from "@tabler/icons-react"
import { Licitation } from "@/types"
import { LicitationCard } from "./LicitationCard"
import { useSearchParams, useRouter } from "next/navigation"
import {
	LOCAL_STORAGE_SAVED_SEARCHES,
	VALID_LICITATION_FIELDS,
} from "@/CONSTANTS"
import { Fields } from "@/database/fields"
import { LastSearches } from "./LastSearches"
import { Pagination } from "./Pagination"

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
	const [searchTerm, setSearchTerm] = useState("")
	const searchParams = useSearchParams()
	const router = useRouter()
	const resultsRef = useRef<HTMLDivElement | null>(null)

	const isFilterClean = new URLSearchParams(searchTerm).size === 0

	useEffect(() => {
		const filterSearchParams = new URLSearchParams()

		Array.from(searchParams.entries()).forEach(([key, value]) => {
			if (VALID_LICITATION_FIELDS.some((field) => field === key)) {
				filterSearchParams.set(key, value)
			}
		})

		setSearchTerm(filterSearchParams.toString())

		if (filterSearchParams.size > 0) {
			const saveSearchLink = filterSearchParams.toString()

			const localStorageSavedSearches = JSON.parse(
				localStorage.getItem(LOCAL_STORAGE_SAVED_SEARCHES) || "[]"
			) as string[]

			const newSavedSearches = Array.from(
				new Set([saveSearchLink, ...localStorageSavedSearches])
			).slice(0, 5)

			localStorage.setItem(
				LOCAL_STORAGE_SAVED_SEARCHES,
				JSON.stringify(newSavedSearches)
			)

			window.dispatchEvent(new Event("storage"))
		}
	}, [searchParams])

	const getPrevPage = () => {
		const prevPage = page ? page - 1 : 1

		const params = new URLSearchParams(searchParams)

		params.set("page", prevPage.toString())

		return `/licitaciones/?${params.toString()}#resultados`
	}

	const getNextPage = () => {
		const nextPage = page ? page + 1 : 2

		const params = new URLSearchParams(searchParams)

		params.set("page", nextPage.toString())

		return `/licitaciones/?${params.toString()}#resultados`
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

	function navigate(e: MouseEvent) {
		e.preventDefault()

		router.push(`/licitaciones/?${searchTerm}#resultados`)
	}

	function getValue({
		field,
	}: {
		field: (typeof VALID_LICITATION_FIELDS)[number]
	}) {
		const params = new URLSearchParams(searchTerm)

		return params.get(field) || ""
	}

	function cleanField(
		e: MouseEvent,
		{ field }: { field: (typeof VALID_LICITATION_FIELDS)[number] }
	) {
		e.preventDefault()

		const params = new URLSearchParams(searchTerm)

		params.delete(field)

		setSearchTerm(params.toString())
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold">Últimas actualizaciones</h1>

				<details className="bg-white" open>
					<summary className="flex cursor-pointer justify-between items-center gap-4 p-4">
						<div className="flex gap-2 items-center">
							<IconCaretDownFilled size={32} />
							<h2 className="text-lg font-semibold">Filtros</h2>
							{isFilterClean ? <IconFilter /> : <IconFilterFilled />}
						</div>
					</summary>
					<form id="formulario" className="scroll-smooth">
						<div className="flex flex-col gap-4 p-4 border-t-2 border-slate-200 bg-gray-50">
							<div className="flex gap-2 flex-wrap">
								<button
									className="btn btn-info text-base gap-2 w-fit"
									onClick={navigate}
									type="submit"
								>
									<IconSearch className="w-5" />
									nueva búsqueda
								</button>
								<button
									className={`btn btn-link text-yellow-500 text-base gap-2 w-fit p-0 ${
										isFilterClean ? "pointer-events-none text-opacity-60" : ""
									}`}
									onClick={(e) => {
										e.preventDefault()
										setSearchTerm("")
									}}
								>
									<IconFilterOff className={`w-5`} />
									limpiar filtros
								</button>
							</div>

							<label className="form-control w-full">
								<div className="label">
									<span className="flex gap-2 label-text text-base font-bold text-gray-800">
										<IconHammer />
										Buscar por objeto del contrato
									</span>
								</div>
								<div className="relative flex items-center">
									<input
										type="text"
										placeholder="conservación, carreteras, limpieza..."
										className="input input-bordered w-full dark:text-gray-100"
										onInput={(e) =>
											handleInput(e, { field: "Objeto del contrato" })
										}
										value={getValue({ field: "Objeto del contrato" })}
									/>
									<button
										className="text-yellow-500 absolute right-4"
										onClick={(e) =>
											cleanField(e, { field: "Objeto del contrato" })
										}
									>
										<IconFilterMinus width={18} />
									</button>
								</div>

								<div className="label">
									<span className="label-text">
										Escribe los conceptos separados por comas
									</span>
								</div>
							</label>

							<label className="form-control w-full">
								<div className="label">
									<span className="flex gap-2 label-text text-base font-bold text-gray-800">
										<IconFileDescription />
										Buscar por expediente
									</span>
								</div>
								<div className="relative flex items-center">
									<input
										type="text"
										placeholder="Exp 123/2024"
										className="input input-bordered w-full dark:text-gray-100"
										onInput={(e) => handleInput(e, { field: "Expediente" })}
										value={getValue({ field: "Expediente" })}
									/>
									<button
										className="text-yellow-500 absolute right-4"
										onClick={(e) => cleanField(e, { field: "Expediente" })}
									>
										<IconFilterMinus width={18} />
									</button>
								</div>
							</label>

							<label className="form-control w-full">
								<div className="label">
									<span className="flex gap-2 label-text text-base font-bold text-gray-800">
										<IconMapPin />
										Buscar por lugar de ejecución
										<button
											className="text-yellow-500"
											onClick={(e) =>
												cleanField(e, { field: "Lugar de Ejecución" })
											}
										>
											<IconFilterMinus width={18} />
										</button>
									</span>
								</div>
								<input
									list="places"
									placeholder="Escribe para seleccionar lugar"
									className="input input-bordered w-full dark:text-gray-100"
									onInput={(e) =>
										handleInput(e, { field: "Lugar de Ejecución" })
									}
									value={getValue({ field: "Lugar de Ejecución" })}
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
										<button
											className="text-yellow-500"
											onClick={(e) =>
												cleanField(e, { field: "Órgano de Contratación" })
											}
										>
											<IconFilterMinus width={18} />
										</button>
									</span>
								</div>
								<input
									list="organs"
									placeholder="Escribe para seleccionar órgano"
									className="input input-bordered w-full dark:text-gray-100"
									onInput={(e) =>
										handleInput(e, { field: "Órgano de Contratación" })
									}
									value={getValue({ field: "Órgano de Contratación" })}
								/>
								<datalist id="organs">
									{fields["Órgano de Contratación"]?.map((organ, index) => {
										return <option key={organ + index} value={organ} />
									})}
								</datalist>
							</label>

							{fields["Estado de la Licitación"] && (
								<div className="flex flex-col gap-2">
									<label className="font-bold text-gray-800 flex items-center gap-2">
										Estado de la Licitación
										<button
											className="text-yellow-500"
											onClick={(e) =>
												cleanField(e, { field: "Estado de la Licitación" })
											}
										>
											<IconFilterMinus width={18} />
										</button>
									</label>
									<ul className="flex gap-x-4 gap-y-2 flex-wrap">
										{fields["Estado de la Licitación"].map((option, index) => {
											return (
												<div
													className="flex gap-1 items-center"
													key={option + index}
												>
													<label htmlFor={option}>{option}</label>
													<input
														type="checkbox"
														className="checkbox checkbox-sm border-gray-600"
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
								<div className="flex flex-col gap-2">
									<label className="font-bold text-gray-800 flex items-center gap-2">
										Tipo de Contrato
										<button
											className="text-yellow-500"
											onClick={(e) =>
												cleanField(e, { field: "Tipo de Contrato:" })
											}
										>
											<IconFilterMinus width={18} />
										</button>
									</label>
									<ul className="flex gap-x-4 gap-y-2 flex-wrap">
										{fields["Tipo de Contrato:"].map((option, index) => {
											return (
												<div
													className="flex gap-1 items-center"
													key={option + index}
												>
													<label htmlFor={option}>{option}</label>
													<input
														type="checkbox"
														className="checkbox checkbox-sm border-gray-600"
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
								<div className="flex flex-col gap-2">
									<label className="font-bold text-gray-800 flex items-center gap-2">
										Tipo de tramitación
										<button
											className="text-yellow-500"
											onClick={(e) =>
												cleanField(e, { field: "Tipo de tramitación" })
											}
										>
											<IconFilterMinus width={18} />
										</button>
									</label>
									<ul className="flex gap-x-4 gap-y-2 flex-wrap">
										{fields["Tipo de tramitación"].map((option, index) => {
											return (
												<div
													className="flex gap-1 items-center"
													key={option + index}
												>
													<label htmlFor={option}>{option}</label>
													<input
														type="checkbox"
														className="checkbox checkbox-sm border-gray-600"
														onChange={(e) =>
															handleChangeCheckbox(e, {
																field: "Tipo de tramitación",
																value: option,
															})
														}
														value={option}
														id={option}
														checked={isInSearchParam({
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

							{fields["Método de presentación de la oferta"] && (
								<div className="flex flex-col gap-2">
									<label className="font-bold text-gray-800 flex items-center gap-2">
										Método de presentación de la oferta
										<button
											className="text-yellow-500"
											onClick={(e) =>
												cleanField(e, {
													field: "Método de presentación de la oferta",
												})
											}
										>
											<IconFilterMinus width={18} />
										</button>
									</label>
									<ul className="flex gap-x-4 gap-y-2 flex-wrap">
										{fields["Método de presentación de la oferta"].map(
											(option, index) => {
												return (
													<div
														className="flex gap-1 items-center"
														key={option + index}
													>
														<label htmlFor={option}>{option}</label>
														<input
															type="checkbox"
															className="checkbox checkbox-sm border-gray-600"
															onChange={(e) =>
																handleChangeCheckbox(e, {
																	field: "Método de presentación de la oferta",
																	value: option,
																})
															}
															value={option}
															id={option}
															checked={isInSearchParam({
																field: "Método de presentación de la oferta",
																value: option,
															})}
														/>
													</div>
												)
											}
										)}
									</ul>
								</div>
							)}
						</div>
						<button
							className="btn btn-info text-base gap-4 rounded-none w-full flex py-4 items-center h-auto"
							onClick={navigate}
							type="submit"
						>
							<IconSearch className="w-5" />
							nueva búsqueda
						</button>
					</form>
				</details>
			</div>

			<div
				id="resultados"
				className="flex flex-col w-full gap-4 scroll-smooth"
				ref={resultsRef}
			>
				{[...searchParams.entries()].some(([key]) => key !== "page") ? (
					<h4 className="font-bold">Filtros aplicados:</h4>
				) : (
					<h4 className="font-bold">No tienes filtros aplicados</h4>
				)}

				{[...searchParams.entries()].map(([key, value]) => {
					if (key === "page") return null

					return (
						<h3
							key={key}
							className="text-sm leading-none font-semibold italic text-gray-700"
						>
							{key.replace(/:$/, "")}:{" "}
							<span className="">{value.split(",").join(", ")}</span>
						</h3>
					)
				})}

				{initialLicitations.length === 0 && (
					<div className="font-bold text-xl my-4 text-center text-gray-800">
						No se encontraron resultados
					</div>
				)}

				{initialLicitations.map((licitation) => (
					<LicitationCard key={licitation.id} licitation={licitation} />
				))}
			</div>

			<Pagination
				isNextPage={isNextPage}
				page={page}
				nextPage={getNextPage()}
				prevPage={getPrevPage()}
			/>

			<LastSearches />
		</div>
	)
}
