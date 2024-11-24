import { getLicitation } from "@/database/licitations"
import { notFound } from "next/navigation"

export default async function Licitacion({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id

	const licitation = await getLicitation(id)

	if (!licitation) {
		return notFound()
	}

	console.log({ licitation })

	return <div className="container mx-auto px-4">Detalles de la licitación</div>
}
