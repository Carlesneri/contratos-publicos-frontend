import { getLastLicitations } from "@/database/licitations"
import { LicitationCard } from "@/components/LicitationCard"
import { HomeContent } from "@/components/HomeContent"
import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
import { LinkList } from "@/components/LinkList"

export const dynamic = "force-dynamic"

const quickLinks = [
	{
		title: "publicadas",
		url: "/licitaciones?Estado+de+la+Licitación=Publicada",
	},
	{
		title: "obras y servicios",
		url: "/licitaciones?Tipo+de+Contrato%3A=Obras%2CServicios%2CConcesi%C3%B3n+de+servicios%2CConcesi%C3%B3n+de+obras&Estado+de+la+Licitaci%C3%B3n=Publicada%2CEvaluaci%C3%B3n%2CAnuncio+Previo",
	},
	{
		title: "anuncios",
		url: "/licitaciones?Estado+de+la+Licitación=Anuncio+Previo",
	},
	{
		title: "via rápida",
		url: "/licitaciones?M%C3%A9todo+de+presentaci%C3%B3n+de+la+oferta=Electr%C3%B3nica&Tipo+de+tramitaci%C3%B3n=Urgente%2CEmergencia&Estado+de+la+Licitaci%C3%B3n=Evaluaci%C3%B3n%2CPublicada%2CParcialmente+Resuelta%2CAnuncio+Previo%2CParcialmente+Adjudicada",
	},
]

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
				<div className="flex gap-2 items-center flex-wrap">
					<h3 className="text-2xl font-bold">Últimas publicaciones</h3>
					<Link
						href={`/licitaciones?${verMasSearchParams.toString()}`}
						className="btn btn-link text-success text-lg text-start p-0"
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

				<LinkList list={quickLinks} />
			</div>
		</>
	)
}
