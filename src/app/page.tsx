import { getLastLicitations } from "@/database/licitations"
import { LicitationCard } from "@/components/LicitationCard"
import { HomeContent } from "@/components/HomeContent"
import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"

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
				Portal de contratos y licitciones públicas
			</h1>
			<div className="flex flex-col gap-4">
				<div className="flex gap-2 items-center">
					<h3 className="text-2xl font-bold">Últimas publicaciones</h3>
					<Link
						href={`/licitaciones?${verMasSearchParams.toString()}`}
						className="btn btn-link text-info"
					>
						ver todas las publicaciones
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
				<HomeContent />
			</div>
		</>
	)
}
