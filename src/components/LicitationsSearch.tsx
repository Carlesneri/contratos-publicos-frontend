"use client"

import { useEffect, useState } from "react"
import { IconSearch, IconFilter } from "@tabler/icons-react"
import { Licitation } from "@/types"
import { LicitationCard } from "./LicitationCard"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export function LicitationsSearch({
	initialLicitations,
	page,
}: {
	initialLicitations: Licitation[]
	page: number
}) {
	const [licitations, setlicitations] = useState(initialLicitations)
	const [searchTerm, setSearchTerm] = useState("")
	const [filters, setFilters] = useState({
		estado: "",
		tipo: "",
		procedimiento: "",
		financiacionUE: false,
	})

	const searchParams = useSearchParams()

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

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		// Here you would typically make an API call with the search term and filters
		// For now, we'll just log the search parameters
		console.log("Searching with:", { searchTerm, filters })
		// You could then navigate to a results page or update the current page
		// router.push(`/resultados?search=${searchTerm}&...`)
	}

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h1 className="text-3xl font-bold mb-6">Últimas actualizaciones</h1>

				{/* <form onSubmit={handleSearch} className="space-y-6">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-grow">
							<label htmlFor="search" className="sr-only">
								Buscar licitaciones
							</label>
						</div>
					</div>

					<button
						type="submit"
						className="flex justify-center rounded items-center gap-2 w-fit bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition-colors"
					>
						<IconSearch className="w-4" />
						Buscar
					</button>

					<div className="bg-gray-50 p-4 rounded">
						<div className="flex items-center mb-4">
							<IconFilter className="mr-2" />
							<h2 className="text-lg font-semibold">Filtros</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<div>
								<label htmlFor="estado">Estado de la Licitación</label>
								<select defaultValue="">
									<option value="" disabled>
										Seleccionar estado
									</option>
									<option value="publicada">Publicada</option>
									<option value="evaluacion">En Evaluación</option>
									<option value="adjudicada">Adjudicada</option>
									<option value="desierta">Desierta</option>
								</select>
							</div>

							<div>
								<label htmlFor="tipo">Tipo de Contrato</label>
								<select defaultValue="">
									<option value="" disabled>
										Seleccionar tipo
									</option>
									<option value="suministros">Suministros</option>
									<option value="servicios">Servicios</option>
									<option value="obras">Obras</option>
								</select>
							</div>

							<div>
								<label htmlFor="procedimiento">
									Procedimiento de Contratación
								</label>
								<select defaultValue="">
									<option value="" disabled>
										Seleccionar procedimiento
									</option>
									<option value="abierto">Abierto</option>
									<option value="restringido">Restringido</option>
									<option value="negociado">Negociado</option>
								</select>
							</div>

							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="financiacionUE"
									checked={filters.financiacionUE}
									onChange={(e) =>
										setFilters({ ...filters, financiacionUE: e.target.checked })
									}
								/>
								<label htmlFor="financiacionUE">Con financiación UE</label>
							</div>
						</div>
					</div>
				</form> */}
			</div>

			<div className="flex flex-col w-full gap-4">
				{licitations.map((licitation) => (
					<LicitationCard key={licitation.id} licitation={licitation} />
				))}
			</div>

			<div className="join grid grid-cols-2">
				<Link
					href={getPrevPage()}
					className={`join-item btn btn-outline ${
						!page || page === 1 ? "btn-disabled" : ""
					}`}
				>
					Anterior página
				</Link>
				<Link
					href={getNextPage()}
					className={`join-item btn btn-outline ${
						licitations.length === 0 ? "btn-disabled" : ""
					}`}
				>
					Siguiente página
				</Link>
			</div>
		</div>
	)
}
