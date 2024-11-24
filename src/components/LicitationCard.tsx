import { Licitation } from "@/types"
import { IconCalendar, IconMapPin, IconCurrencyEuro } from "@tabler/icons-react"

export function LicitationCard({ licitation }: { licitation: Licitation }) {
	return (
		<a
			href={`/licitaciones/${licitation.id}`}
			className=" bg-gray-800 shadow-sm hover:rounded-sm p-4 hover:shadow-2xl shadow-black transition-colors duration-300"
		>
			<article className="flex flex-col gap-1 text-gray-100">
				<header className="flex justify-between items-center gap-2">
					{licitation["Órgano de Contratación"] && (
						<h2 className="text-xl">
							<span className="font-semibold">
								{licitation["Órgano de Contratación"]}
							</span>
						</h2>
					)}
					{licitation["Estado de la Licitación"] && (
						<p className="text-sm font-medium">
							<span
								className={`inline-block px-2 py-1 ${
									licitation["Estado de la Licitación"] === "Publicada"
										? "bg-green-600 text-green-100"
										: "bg-orange-600 text-orange-100"
								}`}
							>
								{licitation["Estado de la Licitación"]}
							</span>
						</p>
					)}
				</header>
				<div className="flex gap-3 flex-wrap items-center text-gray-300">
					{licitation["Tipo de Contrato:"] && (
						<p className="text-sm " title="tipo de contrato">
							{licitation["Tipo de Contrato:"]}
						</p>
					)}
					{licitation["Fecha fin de presentación de oferta"] && (
						<p className="text-sm  flex items-center gap-2">
							<IconCalendar className="w-4" />
							<span className="font-medium">Finaliza:</span>{" "}
							{licitation["Fecha fin de presentación de oferta"]}
						</p>
					)}
					{licitation["Valor estimado del contrato:"] && (
						<p className="text-sm flex items-center gap-2">
							<IconCurrencyEuro className="w-4" />
							<span className="font-medium">
								Valor estimado del contrato:
							</span>{" "}
							{licitation["Valor estimado del contrato:"]}
						</p>
					)}
					{licitation["Importe de Adjudicación"] && (
						<p className="text-sm flex items-center gap-2">
							<IconCurrencyEuro className="w-4" />
							<span className="font-medium">Importe de Adjudicación:</span>{" "}
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
					<p className="text-md text-pretty">
						{licitation["Objeto del contrato"]}
					</p>
				)}
			</article>
		</a>
	)
}
