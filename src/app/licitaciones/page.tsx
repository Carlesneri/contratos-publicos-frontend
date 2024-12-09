import { LicitationsSearch } from "@/components/LicitationsSearch"
import { LinkList } from "@/components/LinkList"
import { Loading } from "@/components/Loading"
import { DEFAULT_LIMIT } from "@/CONSTANTS"
import { getFields } from "@/database/fields"
import { getLastLicitations } from "@/database/licitations"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
	title: "Buscador de Licitaciones y Contratos Públicos",
	description:
		"Consulta, busca y gestiona licitaciones y contratos públicos en España. Descubre oportunidades del sector público en tiempo real con nuestra plataforma. Encuentre licitaciones de obras públicas.",
	keywords:
		"licitaciones, licitaciones del estado, contratación pública, contratos sector público, buscador de licitaciones, concesión de servicios, contratos de obras, licitaciones abiertas, licitaciones de obras públicas.",
}

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
		skip: Number(page) ? (Number(page) - 1) * DEFAULT_LIMIT : 0,
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
			<LinkList />
		</Suspense>
	)
}
