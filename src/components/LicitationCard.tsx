"use client"

import { Licitation } from "@/types"
import { IconCalendar, IconMapPin, IconCurrencyEuro } from "@tabler/icons-react"
import Link from "next/link"
import { Suspense } from "react"
import { Loading } from "./Loading"

export function LicitationCard({ licitation }: { licitation: Licitation }) {
	const stateClass: Record<string, string> = {
		Evaluación: "bg-teal-600 text-teal-100",
		Publicada: "bg-green-600 text-green-100",
		Resuelta: "bg-purple-600 text-purple-100",
		Adjudicada: "bg-blue-600 text-blue-100",
		"Parcialmente Resuelta": "bg-lime-600 text-lime-100",
		"Parcialmente Adjudicada": "bg-orange-600 text-orange-100",
		Anulada: "bg-red-600 text-red-100",
		default: "bg-yellow-600 text-yellow-100",
	}

	return (
		<Suspense fallback={<Loading />}>
			<Link
				href={`/licitaciones/${licitation.id}`}
				className="cursor-pointer w-full bg-gray-800 shadow-sm hover:rounded-sm p-4 hover:shadow-2xl shadow-black transition-colors duration-300"
			>
				<article className="flex flex-col gap-1 text-gray-100">
					<header className="flex flex-col space-between gap-2 w-full sm:flex-row mb-2">
						<h2 className="gap-2 text-xl line-clamp-2 font-semibold flex-1">
							{licitation["Órgano de Contratación"] || "Licitación"}
						</h2>
						{licitation["Estado de la Licitación"] && (
							<span>
								<span
									className={`p-2 text-xs font-bold ${
										stateClass[licitation["Estado de la Licitación"]] ||
										stateClass.default
									}`}
								>
									{licitation["Estado de la Licitación"]}
								</span>
							</span>
						)}
					</header>
					<div className="flex flex-col gap-2 flex-wrap text-gray-300 font-bold">
						{licitation["Tipo de Contrato:"] && (
							<p className="text-sm " title="tipo de contrato">
								{licitation["Tipo de Contrato:"]}
							</p>
						)}
						{licitation["Fecha fin de presentación de oferta"] && (
							<p className="text-sm">
								<IconCalendar className="w-4 pb-1 inline" />{" "}
								<span className="font-medium">Finaliza:</span>{" "}
								{licitation["Fecha fin de presentación de oferta"]}
							</p>
						)}
						{licitation["Valor estimado del contrato:"] && (
							<p className="text-sm">
								<IconCurrencyEuro className="w-4 pb-1 inline" />{" "}
								<span className="font-medium">
									Valor estimado del contrato:
								</span>{" "}
								{licitation["Valor estimado del contrato:"]}
							</p>
						)}
						{licitation["Importe de Adjudicación"] && (
							<p className="text-sm flex items-center gap-2">
								<IconCurrencyEuro className="w-4" />
								<span className="font-medium">
									Importe de Adjudicación:
								</span>{" "}
								{licitation["Importe de Adjudicación"]}
							</p>
						)}
					</div>
					{licitation["Lugar de Ejecución"] && (
						<p className="text-md text-gray-400 flex items-center gap-2">
							<IconMapPin className="w-4" />
							<span className="font-bold">
								{licitation["Lugar de Ejecución"]}
							</span>
						</p>
					)}
					{licitation["Objeto del contrato"] && (
						<p className="text-md text-pretty line-clamp-3">
							{licitation["Objeto del contrato"]}
						</p>
					)}
				</article>
			</Link>
		</Suspense>
	)
}
