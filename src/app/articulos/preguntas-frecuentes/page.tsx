import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Preguntas frecuentes sobre la contratación en el sector público",
	description:
		"Respuestas a las preguntas más frecuentes sobre la contratación en el sector público en España.",
	keywords:
		"licitaciones, licitaciones del estado, contratación pública, contratos sector público, buscador de licitaciones, concesión de servicios, contratos de obras, licitaciones abiertas, licitaciones de obras públicas.",
}

export default function PreguntasFrecuentes() {
	return (
		<>
			<h1>Preguntas frecuentes sobre la contratación en el sector público</h1>

			<section>
				<h2>¿Qué es la contratación pública?</h2>
				<p>
					La contratación pública es el proceso mediante el cual las
					administraciones públicas adquieren bienes, servicios o ejecutan obras
					a través de procedimientos regulados legalmente. Su objetivo principal
					es garantizar la transparencia, la igualdad de trato y el uso
					eficiente de los recursos públicos.
				</p>
			</section>

			<section>
				<h2>¿Qué tipos de contratos existen en el sector público?</h2>
				<p>
					Los contratos públicos se clasifican en los siguientes tipos
					principales:
				</p>
				<ul>
					<li>Contratos de obras</li>
					<li>Contratos de suministro</li>
					<li>Contratos de servicios</li>
					<li>Contratos de concesión de obras</li>
					<li>Contratos de concesión de servicios</li>
				</ul>
			</section>

			<section>
				<h2>¿Cuáles son los procedimientos de contratación más comunes?</h2>
				<p>Los procedimientos de contratación más frecuentes son:</p>
				<ol>
					<li>
						<strong>Procedimiento abierto:</strong> Todos los interesados pueden
						presentar sus ofertas.
					</li>
					<li>
						<strong>Procedimiento restringido:</strong> Solo pueden presentar
						ofertas los licitadores invitados tras una preselección.
					</li>
					<li>
						<strong>Procedimiento negociado:</strong> Se negocian las
						condiciones del contrato con los licitadores seleccionados.
					</li>
					<li>
						<strong>Diálogo competitivo:</strong> Se utiliza en casos complejos
						para encontrar la mejor solución a las necesidades del órgano
						contratante.
					</li>
				</ol>
			</section>

			<section>
				<h2>
					¿Quién puede participar en los procesos de contratación pública?
				</h2>
				<p>
					Pueden participar personas físicas, jurídicas y agrupaciones de
					empresarios, siempre que cumplan los requisitos de capacidad,
					solvencia y no se encuentren en alguna causa de prohibición de
					contratar.
				</p>
			</section>

			<section>
				<h2>¿Cómo se publican las licitaciones públicas?</h2>
				<p>
					Las licitaciones públicas se publican en plataformas oficiales como:
				</p>
				<ul>
					<li>
						El{" "}
						<a
							href="https://contrataciondelestado.es"
							target="_blank"
							rel="noopener"
						>
							Perfil del Contratante
						</a>
						.
					</li>
					<li>El Boletín Oficial del Estado (BOE).</li>
					<li>
						Boletines y diarios oficiales autonómicos o locales, según
						corresponda.
					</li>
				</ul>
			</section>

			<section>
				<h2>¿Qué criterios se utilizan para adjudicar un contrato público?</h2>
				<p>
					Los contratos públicos se adjudican en función de criterios
					previamente definidos, como:
				</p>
				<ul>
					<li>
						<strong>Criterios económicos:</strong> Precio más bajo.
					</li>
					<li>
						<strong>Criterios técnicos:</strong> Mejor relación calidad-precio
						basada en características técnicas, sostenibilidad, plazo de
						entrega, etc.
					</li>
				</ul>
			</section>

			<section>
				<h2>¿Dónde puedo encontrar más información?</h2>
				<p>
					Para más información sobre contratación pública, visita{" "}
					<Link href="/articulos" className="underline">
						nuestro sitio web
					</Link>
					, donde encontrarás guías, artículos y recursos útiles.
				</p>
			</section>
		</>
	)
}
