import { LicitationCard } from "@/components/LicitationCard"
import { LinkList } from "@/components/LinkList"
import { Loading } from "@/components/Loading"
import { Pagination } from "@/components/Pagination"
import { getSuggestions } from "@/database/licitations"
import { Suspense } from "react"

const LIMIT = 10

export default async function Licitacion({
	searchParams,
}: {
	searchParams: Promise<Record<string, string>>
}) {
	const params = await searchParams

	const page = params.page ? Number(params.page) : 1

	const licitation = {
		...(params["Tipo de Contrato:"] && {
			"Tipo de Contrato:": params["Tipo de Contrato:"],
		}),
		...(params["Lugar de Ejecución"] && {
			"Lugar de Ejecución": params["Lugar de Ejecución"],
		}),
		...(params["Órgano de Contratación"] && {
			"Órgano de Contratación": params["Órgano de Contratación"],
		}),
	}

	const sugerencias = await getSuggestions({
		licitation,
		limit: LIMIT + 1,
		skip: (page - 1) * LIMIT,
	})

	const getPrevPage = () => {
		const prevPage = page - 1

		const newSearchParams = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			newSearchParams.set(key, value)
		})

		prevPage > 1
			? newSearchParams.set("page", prevPage.toString())
			: newSearchParams.delete("page")

		return `/sugerencias/?${newSearchParams.toString()}`
	}

	const getNextPage = () => {
		const nextPage = page + 1

		const newSearchParams = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			newSearchParams.set(key, value)
		})

		newSearchParams.set("page", nextPage.toString())

		return `/sugerencias/?${newSearchParams.toString()}`
	}

	return (
		<>
			<h1 className="text-3xl font-bold">Sugerencias encontradas</h1>

			<Suspense fallback={<Loading />}>
				{sugerencias.result.length === 0 && (
					<div className="font-bold text-xl my-4 text-center text-gray-800">
						No se encontraron resultados
					</div>
				)}

				{sugerencias.result.slice(0, LIMIT).map((licitation) => (
					<LicitationCard key={licitation.id} licitation={licitation} />
				))}

				<Pagination
					isNextPage={sugerencias.result.length > LIMIT}
					page={page}
					nextPage={getNextPage()}
					prevPage={getPrevPage()}
				/>
			</Suspense>

			<LinkList />
		</>
	)
}
