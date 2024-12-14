import { getSuggestions } from "@/database/licitations"
import { Licitation } from "@/types"
import { Suspense } from "react"
import { Loading } from "./Loading"
import { LicitationCard } from "./LicitationCard"
import Link from "next/link"

const LIMIT = 5

export async function Suggestions({ licitation }: { licitation: Licitation }) {
	const suggestions = await getSuggestions({
		licitation,
		limit: LIMIT + 1,
	})

	const filteredSuggestions = suggestions.result
		.filter((suggestion) => suggestion.id !== licitation.id)
		.slice(0, LIMIT)

	function getSearchParams(licitation: Licitation) {
		const params = new URLSearchParams()

		if (licitation["Tipo de Contrato:"]) {
			params.set("Tipo de Contrato:", licitation["Tipo de Contrato:"])
		}

		if (licitation["Lugar de Ejecución"]) {
			params.set("Lugar de Ejecución", licitation["Lugar de Ejecución"])
		}

		if (licitation["Órgano de Contratación"]) {
			params.set("Órgano de Contratación", licitation["Órgano de Contratación"])
		}

		return params.toString()
	}

	return (
		<Suspense fallback={<Loading />}>
			{filteredSuggestions.length > 0 && (
				<h5 className="text-xl font-bold">También te puede interesar:</h5>
			)}
			{filteredSuggestions.slice(0, LIMIT).map((licitation) => (
				<LicitationCard key={licitation.id} licitation={licitation} />
			))}
			{suggestions.result.length > LIMIT && (
				<Link
					href={`/sugerencias?${getSearchParams(licitation)}#resultados`}
					className="btn btn-link text-info hover:underline"
				>
					Ver todas las sugerencias
				</Link>
			)}
		</Suspense>
	)
}
