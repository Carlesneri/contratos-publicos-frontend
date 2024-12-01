import { LicitationsSearch } from "@/components/LicitationsSearch"
import { Loading } from "@/components/Loading"
import { DEFAULT_LIMIT } from "@/CONSTANTS"
import { getFields } from "@/database/fields"
import { getLastLicitations } from "@/database/licitations"
import { Suspense } from "react"

export default async function BuscarLicitaciones({
	searchParams,
}: {
	searchParams: Promise<{
		[page: string]: string
		"Estado de la Licitación": string
		"Tipo de Contrato:": string
		"Tipo de tramitación": string
	}>
}) {
	const params = await searchParams

	const { page, ...restOfParams } = params

	const licitationsPromise = getLastLicitations({
		skip: Number(page) ? Number(page) * DEFAULT_LIMIT : 0,
		limit: DEFAULT_LIMIT,
		searchParams: restOfParams,
	})

	const fieldsPromise = getFields()

	const [licitations, fields] = await Promise.all([
		licitationsPromise,
		fieldsPromise,
	])

	return (
		<Suspense fallback={<Loading />}>
			<LicitationsSearch
				initialLicitations={licitations.result}
				isNextPage={licitations.isNextPage}
				fields={fields}
				page={Number(page) ? Number(page) : 1}
			/>
		</Suspense>
	)
}
