import Link from "next/link"

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

export function LinkList({
	list = quickLinks,
}: {
	list?: { title: string; url: string }[]
}) {
	return (
		<ul className="flex flex-wrap gap-2 justify-center">
			{list.map((item, index) => (
				<li
					key={index}
					className="badge badge-success p-4 text-gray-100 font-bold"
				>
					<Link href={item.url}>{item.title}</Link>
				</li>
			))}
		</ul>
	)
}
