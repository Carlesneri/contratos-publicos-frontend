import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Guía paso a paso para licitar en España",
	description:
		"Guía paso a paso para licitar en España, desde el análisis inicial hasta la presentación de la solicitud final.",
	keywords:
		"licitaciones, licitaciones del estado, contratación pública, contratos sector público, buscador de licitaciones, concesión de servicios, contratos de obras, licitaciones abiertas, licitaciones de obras públicas.",
}

export default function GuiaPasoAPasoParaLicitarEnEspana() {
	return (
		<>
			<h1>Guía paso a paso para licitar en España</h1>

			<section>
				<h2>1. Estudio inicial</h2>
				<p>
					Antes de participar en un proceso de licitación, es fundamental
					realizar un análisis preliminar para determinar la viabilidad de la
					oferta. Debes considerar:
				</p>
				<ul>
					<li>
						Revisión de la capacidad de tu empresa para cumplir con los
						requisitos del contrato.
					</li>
					<li>Evaluación de la competencia y análisis del mercado.</li>
					<li>
						Determinación de los recursos necesarios (personal, materiales,
						tiempo).
					</li>
				</ul>
			</section>

			<section>
				<h2>2. Búsqueda de licitaciones</h2>
				<p>
					Las oportunidades de contratación pública se publican en diferentes
					plataformas oficiales, como:
				</p>
				<ul>
					<li>
						La{" "}
						<a
							href="https://contrataciondelestado.es"
							target="_blank"
							rel="noopener"
						>
							Plataforma de Contratación del Sector Público
						</a>
						.
					</li>
					<li>El Boletín Oficial del Estado (BOE).</li>
					<li>Portales autonómicos y locales según la jurisdicción.</li>
				</ul>
			</section>

			<section>
				<h2>3. Análisis del pliego de condiciones</h2>
				<p>
					Una vez identificada una licitación de interés, revisa detenidamente
					el pliego de condiciones para comprender:
				</p>
				<ul>
					<li>Los requisitos técnicos y administrativos.</li>
					<li>Los criterios de adjudicación.</li>
					<li>El presupuesto base de licitación y plazos establecidos.</li>
				</ul>
			</section>

			<section>
				<h2>4. Preparación de la documentación</h2>
				<p>Reúne toda la documentación necesaria, que suele incluir:</p>
				<ul>
					<li>
						Documentos administrativos (certificados de estar al corriente de
						obligaciones fiscales y con la Seguridad Social).
					</li>
					<li>Propuesta técnica detallada.</li>
					<li>Oferta económica.</li>
					<li>Declaraciones responsables y otros formularios exigidos.</li>
				</ul>
			</section>

			<section>
				<h2>5. Presentación de la oferta</h2>
				<p>
					Debes presentar la oferta conforme a las instrucciones del pliego:
				</p>
				<ul>
					<li>
						En formato electrónico a través de la plataforma correspondiente.
					</li>
					<li>Respetando los plazos y condiciones de entrega especificadas.</li>
				</ul>
			</section>

			<section>
				<h2>6. Evaluación y adjudicación</h2>
				<p>
					El órgano de contratación evaluará las ofertas recibidas en base a los
					criterios establecidos. Durante este proceso:
				</p>
				<ul>
					<li>Pueden solicitar aclaraciones adicionales.</li>
					<li>
						Se publicará la propuesta de adjudicación y, tras el plazo de
						recursos, la adjudicación definitiva.
					</li>
				</ul>
			</section>

			<section>
				<h2>7. Firma del contrato</h2>
				<p>
					Si tu oferta resulta adjudicada, deberás formalizar el contrato
					cumpliendo con los requisitos adicionales, como la constitución de
					garantías definitivas si se requiere.
				</p>
			</section>

			<section>
				<h2>¿Necesitas más ayuda?</h2>
				<p>
					Visita <a href="https://www.contratopublico.es">nuestro sitio web</a>{" "}
					para obtener más recursos, guías detalladas y asesoramiento sobre
					procesos de licitación pública en España.
				</p>
			</section>
		</>
	)
}
