import { LicitationsSearch } from "@/components/LicitationsSearch"
import { DEFAULT_LIMIT } from "@/CONSTANTS"
import { getLastLicitations } from "@/database/licitations"

export default async function BuscarLicitaciones({
	searchParams,
}: {
	searchParams: Promise<{ [page: string]: string }>
}) {
	const { page } = await searchParams

	const licitations = await getLastLicitations({
		skip: Number(page) ? Number(page) * DEFAULT_LIMIT : 0,
		limit: DEFAULT_LIMIT,
	})

	return (
		<LicitationsSearch
			initialLicitations={licitations}
			page={Number(page) ? Number(page) : 1}
		/>
	)
}
