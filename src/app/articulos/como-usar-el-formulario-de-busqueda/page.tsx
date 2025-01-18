import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Cómo utilizar el formulario de búsqueda en contratopublico.es",
	description:
		"Guía detallada sobre el funcionamiento del buscador de contratos públicos.",
	keywords:
		"licitaciones, licitaciones del estado, contratación pública, contratos sector público, buscador de licitaciones, concesión de servicios, contratos de obras, licitaciones abiertas, licitaciones de obras públicas.",
}

export default function ComoUsarElFormulariDeBusqueda() {
	return (
		<>
			<h1>Cómo utilizar el formulario de búsqueda en contratopublico.es</h1>

			<section>
				<p>
					El formulario disponible en{" "}
					<Link
						href="/licitaciones#formulario"
						target="_blank"
						className="underline"
					>
						contratopublico.es
					</Link>{" "}
					permite a los usuarios buscar licitaciones publicadas en la Plataforma
					de Contratación del Sector Público. A continuación, se explica su
					funcionamiento:
				</p>
			</section>
			<section>
				<h2>1. Acceso al formulario</h2>
				<ul>
					<li>
						Visite la página{" "}
						<Link
							href="/licitaciones#formulario"
							target="_blank"
							className="underline"
						>
							https://www.contratopublico.es/licitaciones#formulario
						</Link>
						.
					</li>
					<li>
						Ubique el formulario de búsqueda de licitaciones en la sección
						correspondiente.
					</li>
				</ul>
			</section>
			<section>
				<h2>2. Campos del formulario</h2>
				<ul>
					<li>
						<strong>Palabras clave:</strong> Ingrese términos específicos
						relacionados con la licitación de interés.
					</li>
					<li>
						<strong>Órgano de contratación:</strong> Seleccione el organismo que
						publica la licitación.
					</li>
					<li>
						<strong>Tipo de contrato:</strong> Indique la naturaleza del
						contrato (obras, servicios, suministros, etc.).
					</li>
					<li>
						<strong>Procedimiento:</strong> Elija el tipo de procedimiento de
						adjudicación.
					</li>
					<li>
						<strong>Fecha de publicación:</strong> Establezca un rango de fechas
						para filtrar las licitaciones publicadas en ese período.
					</li>
				</ul>
			</section>
			<section>
				<h2>3. Uso del formulario</h2>
				<p>
					Complete uno o varios campos según los criterios de búsqueda deseados
					y haga clic en el botón <strong>&quot;Buscar&quot;</strong> para
					obtener los resultados que coincidan con los parámetros establecidos.
				</p>
			</section>
			<section>
				<h2>4. Resultados de la búsqueda</h2>
				<ul>
					<li>
						Se mostrará una lista de licitaciones que cumplen con los criterios
						ingresados.
					</li>
					<li>
						Cada resultado incluirá detalles como el título de la licitación, el
						órgano de contratación, el tipo de contrato y la fecha de
						publicación.
					</li>
					<li>
						Para obtener información más detallada sobre una licitación
						específica, haga clic en el enlace proporcionado en el resultado
						correspondiente.
					</li>
				</ul>
			</section>
			<section>
				<p>
					Este formulario facilita la localización eficiente de licitaciones de
					interés, optimizando el proceso de búsqueda y acceso a oportunidades
					de contratación pública.
				</p>
			</section>
		</>
	)
}
