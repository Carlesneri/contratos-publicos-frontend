import { getSuggestions } from "@/database/licitations"
import { Licitation } from "@/types"
import { Suspense } from "react"
import { Loading } from "./Loading"
import { LicitationCard } from "./LicitationCard"

export async function Suggestions({ licitation }: { licitation: Licitation }) {
	const suggestions = await getSuggestions({
		licitation,
		limit: 10,
	})

	return (
		<Suspense fallback={<Loading />}>
			{suggestions.result.length > 0 && (
				<h5 className="text-xl font-bold">También te puede interesar:</h5>
			)}
			{suggestions.result.map((licitation) => (
				<LicitationCard key={licitation.id} licitation={licitation} />
			))}
		</Suspense>
	)
}
