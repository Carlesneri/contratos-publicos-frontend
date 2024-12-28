import { getLastLicitations } from "@/database/licitations"
import { LicitationCard } from "@/components/LicitationCard"
import { HomeContent } from "@/components/HomeContent"
import Link from "next/link"
import { IconArrowRight, IconSearch } from "@tabler/icons-react"
import { LinkList } from "@/components/LinkList"
import { LastSearches } from "@/components/LastSearches"

export const dynamic = "force-dynamic"

export default async function LicitacionesPage() {
	const licitations = await getLastLicitations({
		searchParams: { "Estado de la Licitación": "Publicada" },
		limit: 6,
		skip: 0,
	})

	const verMasSearchParams = new URLSearchParams()
	verMasSearchParams.set("Estado de la Licitación", "Publicada")

	return (
		<>
			<h1 className="my-4 font-black">
				Portal de contratos y licitaciones públicas
			</h1>
			<HomeContent />

			<Link
				href="/licitaciones#formulario"
				className="btn text-info btn-outline text-base gap-4 w-full md:w-fit flex py-4 items-center h-auto"
			>
				<IconSearch className="w-fill" />
				empieza a buscar
			</Link>

			<LastSearches />
			<div className="flex gap-x-4 items-center flex-wrap">
				<h3 className="text-2xl font-bold">Últimas publicadas</h3>
				<Link
					href={`/licitaciones?${verMasSearchParams.toString()}`}
					className="btn btn-link text-success w-fit p-0 text-lg"
				>
					ver todas
					<IconArrowRight />
				</Link>
			</div>
			<div className="flex flex-col w-full gap-4 items-center">
				{licitations.result.map((licitation) => (
					<LicitationCard key={licitation.id} licitation={licitation} />
				))}
				<Link
					href={`/licitaciones?${verMasSearchParams.toString()}`}
					className="btn btn-ghost w-fit"
				>
					Ver más
					<IconArrowRight />
				</Link>
			</div>
			<LinkList />
		</>
	)
}
