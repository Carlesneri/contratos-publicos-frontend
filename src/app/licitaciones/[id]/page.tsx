import { getLicitation } from "@/database/licitations"
import { notFound } from "next/navigation"
import {
	IconCalendar,
	IconMapPin,
	IconCurrencyEuro,
	IconFileDescription,
	IconExternalLink,
	IconProgressCheck,
	IconBriefcase,
	IconTimelineEvent,
	IconTransferIn,
} from "@tabler/icons-react"
import { InfoItem } from "@/components/InfoItem"
import { Suspense } from "react"
import { Loading } from "@/components/Loading"
import Link from "next/link"
import { ToolsBar } from "@/components/ToolsBar"
import { Suggestions } from "@/components/Suggestions"
import Head from "next/head"
import type { Metadata } from "next"

type Props = {
	params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = (await params).id

	const licitation = await getLicitation(id)

	return {
		title: `Licitación ${licitation?.["Expediente"]}`,
		description:
			licitation?.["Objeto del contrato"] || "Detalle de la licitación",
	}
}

export default async function Licitacion({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id

	const licitation = await getLicitation(id)

	const documents = []

	for (let i = 1; i < 10; i++) {
		const date = licitation?.[`documento-${i}-date`]
		const name = licitation?.[`documento-${i}-name`]
		const link = licitation?.[`documento-${i}-link`]

		if (date || name || link) {
			documents.push({ date, name, link })
		}
	}

	if (!licitation) {
		return notFound()
	}

	const getMoreLink = ({ field, value }: { field: string; value: string }) => {
		if (!value) return null

		const urlSearchParams = new URLSearchParams()

		urlSearchParams.set(field, value)

		return {
			label: `Ver más de ${value}`,
			href: `/licitaciones?${urlSearchParams.toString()}`,
		}
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className="my-4 flex flex-col gap-4">
				<h1 className="text-xl font-bold text-gray-800 text-balance">
					{licitation["Objeto del contrato"] || "Sin título"}
				</h1>

				<ToolsBar licitationId={id} title={licitation["Objeto del contrato"]} />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<InfoItem
							icon={<IconFileDescription className="w-5 h-5" />}
							label="Expediente"
							value={licitation.Expediente}
						/>
						{licitation["Fecha de Actualización del Expte."] && (
							<InfoItem
								icon={<IconCalendar className="w-5 h-5" />}
								label="Expediente"
								value={licitation["Fecha de Actualización del Expte."]}
							/>
						)}
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
							moreLink={getMoreLink({
								field: "Lugar de Ejecución",
								value: licitation["Lugar de Ejecución"],
							})}
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
							icon={<IconProgressCheck className="w-5 h-5" />}
							label="Estado"
							value={licitation["Estado de la Licitación"]}
						/>
						<InfoItem
							icon={<IconBriefcase className="w-5 h-5" />}
							label="Tipo de Contrato"
							value={licitation["Tipo de Contrato:"]}
							moreLink={getMoreLink({
								field: "Tipo de Contrato:",
								value: licitation["Tipo de Contrato:"],
							})}
						/>
						<InfoItem
							icon={<IconTimelineEvent className="w-5 h-5" />}
							label="Procedimiento"
							value={licitation["Procedimiento de contratación"]}
						/>
						<InfoItem
							icon={<IconTransferIn className="w-5 h-5" />}
							label="Órgano de Contratación"
							value={licitation["Órgano de Contratación"]}
							moreLink={getMoreLink({
								field: "Órgano de Contratación",
								value: licitation["Órgano de Contratación"],
							})}
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

				{documents.length > 0 && (
					<div className="mt-8">
						<h3 className="font-bold">Documentos</h3>
						<div className="flex flex-col">
							{documents.map((doc, i) => {
								return (
									<div
										key={`${doc.link}-${i}`}
										className="flex flex-wrap items-center gap-2"
									>
										{doc.name && <h4>{doc.name}</h4>}
										{doc.date && (
											<h6 className="font-bold text-sm text-gray-700">
												{doc.date}
											</h6>
										)}
										{doc.link && (
											<Link
												href={doc.link}
												target="_blank"
												className="text-success flex gap-2 font-bold items-center pb-1 hover:opacity-80 transition-opacity text-sm"
											>
												<IconExternalLink className="w-5" />
											</Link>
										)}
									</div>
								)
							})}
						</div>
					</div>
				)}

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

			<Suggestions licitation={licitation} />
		</Suspense>
	)
}
