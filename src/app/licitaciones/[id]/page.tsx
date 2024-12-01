import { getLicitation } from "@/database/licitations"
import { notFound } from "next/navigation"
import {
	IconCalendar,
	IconMapPin,
	IconCurrencyEuro,
	IconFileDescription,
	IconExternalLink,
} from "@tabler/icons-react"
import { InfoItem } from "@/components/InfoItem"
import { Suspense } from "react"
import { Loading } from "@/components/Loading"

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

	return (
		<Suspense fallback={<Loading />}>
			<div className="p-6 bg-white shadow-lg my-8">
				<h1 className="text-2xl font-bold mb-6 text-gray-800 text-balance">
					{licitation["Objeto del contrato"] || "Sin título"}
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<InfoItem
							icon={<IconFileDescription className="w-5 h-5" />}
							label="Expediente"
							value={licitation.Expediente}
						/>
						<InfoItem
							icon={<IconCalendar className="w-5 h-5" />}
							label="Fecha fin de presentación de oferta"
							value={licitation["Fecha fin de presentación de oferta"]}
						/>
						<InfoItem
							icon={<IconCalendar className="w-5 h-5" />}
							label="Fecha fin de presentación de solicitud"
							value={licitation["Fecha fin de presentación de solicitud"]}
						/>
						<InfoItem
							icon={<IconMapPin className="w-5 h-5" />}
							label="Lugar de Ejecución"
							value={licitation["Lugar de Ejecución"]}
						/>
						<InfoItem
							icon={<IconCurrencyEuro className="w-5 h-5" />}
							label="Presupuesto base"
							value={
								licitation["Presupuesto base de licitación sin impuestos"] ||
								"No aplica"
							}
						/>
					</div>

					<div className="space-y-4">
						<InfoItem
							label="Estado"
							value={licitation["Estado de la Licitación"]}
						/>
						<InfoItem
							label="Tipo de Contrato"
							value={licitation["Tipo de Contrato:"]}
						/>
						<InfoItem
							label="Procedimiento"
							value={licitation["Procedimiento de contratación"]}
						/>
						<InfoItem
							label="Órgano de Contratación"
							value={licitation["Órgano de Contratación"]}
						/>
					</div>
				</div>

				<div className="mt-8">
					<h2 className="text-xl font-semibold mb-4 text-gray-700">
						Detalles adicionales
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<InfoItem label="Código CPV" value={licitation["Código CPV"]} />
						<InfoItem
							label="Financiación UE"
							value={licitation["Financiación UE"]}
						/>
						<InfoItem
							label="ID de publicación en TED"
							value={licitation["ID de publicación en TED"]}
						/>
						<InfoItem
							label="ID del Órgano de Contratación"
							value={licitation["ID del Órgano de Contratación"]}
						/>
						<InfoItem
							label="Método de presentación"
							value={licitation["Método de presentación de la oferta"]}
						/>
						<InfoItem
							label="Sistema de contratación"
							value={licitation["Sistema de contratación"]}
						/>
						<InfoItem
							label="Tipo de tramitación"
							value={licitation["Tipo de tramitación"]}
						/>
						<InfoItem
							label="Valor estimado del contrato"
							value={licitation["Valor estimado del contrato:"]}
						/>
					</div>
				</div>

				<div className="mt-8">
					<a
						href={licitation.link}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-info rounded-none"
					>
						Ver licitación completa
						<IconExternalLink className="w-4" />
					</a>
				</div>
			</div>
		</Suspense>
	)
}
