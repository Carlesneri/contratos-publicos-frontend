import { Licitation } from "@/types"

export function LicitationCard({ licitation }: { licitation: Licitation }) {
	return (
		<article className="flex flex-col gap-1 bg-gray-800 shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
			<header className="flex justify-between items-center gap-2">
				{licitation["Órgano de Contratación"] && (
					<h2 className="text-xl mb-2 text-gray-100">
						<span className="font-semibold">
							{licitation["Órgano de Contratación"]}
						</span>
					</h2>
				)}
				{licitation["Estado de la Licitación"] && (
					<p className="text-sm font-medium mb-2">
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
			{licitation["Tipo de Contrato:"] && (
				<p className="text-sm text-gray-400 mb-2" title="tipo de contrato">
					{licitation["Tipo de Contrato:"]}
				</p>
			)}
			{licitation["Lugar de Ejecución"] && (
				<p className="text-md text-gray-300 mb-2">
					Lugar de Ejecución:{" "}
					<span className="font-bold">{licitation["Lugar de Ejecución"]}</span>
				</p>
			)}
			{licitation["Objeto del contrato"] && (
				<p className="text-md text-gray-300 mb-2">
					{licitation["Objeto del contrato"]}
				</p>
			)}
			{licitation["Valor estimado del contrato:"] && (
				<p className="text-sm text-gray-300 mb-2">
					<span className="font-medium">Valor estimado del contrato:</span>{" "}
					{licitation["Valor estimado del contrato:"]}
				</p>
			)}
			{licitation["Importe de Adjudicación"] && (
				<p className="text-sm text-gray-300 mb-2">
					<span className="font-medium">Importe de Adjudicación:</span>{" "}
					{licitation["Importe de Adjudicación"]}
				</p>
			)}
			<footer className="flex justify-between items-center gap-2">
				<a
					href={`/licitaciones/${licitation.id}`}
					className="border-2 bg-gray-800 border-blue-400 hover:border-blue-200 text-blue-400 hover:text-blue-200 font-bold py-2 px-4 transition-colors duration-300 w-fit"
				>
					Ver detalles
				</a>
				{licitation["Fecha fin de presentación de oferta"] && (
					<p className="text-sm text-gray-300 mb-2">
						<span className="font-medium">Finaliza:</span>{" "}
						{licitation["Fecha fin de presentación de oferta"]}
					</p>
				)}
			</footer>
		</article>
	)
}
