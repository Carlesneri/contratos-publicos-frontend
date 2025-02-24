import { IconShare, IconStar } from "@tabler/icons-react"
import { ArticleList } from "./ArticleList"

export function HomeContent() {
	return (
		<>
			<section>
				<h2>Todo lo que necesitas en un solo lugar</h2>
				<ul>
					<li>
						<strong>Buscar licitaciones públicas</strong> y privadas con filtros
						avanzados.
					</li>
					<li>
						Consultar las <strong>licitaciones abiertas</strong> y su estado
						actualizado.
					</li>
					<li>
						Acceder al <strong>buscador de concursos públicos</strong> y
						licitaciones por sector, como construcción, transporte, o bienes y
						servicios.
					</li>
					<li>
						Recibir alertas personalizadas sobre{" "}
						<strong>nuevas licitaciones</strong> y adjudicaciones.
					</li>
					<li>
						Explorar los diferentes{" "}
						<strong>tipos de contratos del sector público</strong>: contratos de
						obras, concesiones de servicios y más.
					</li>
				</ul>
			</section>

			<ArticleList isHome />

			<section>
				<h2>Ventajas de nuestro buscador de licitaciones</h2>
				<ul>
					<li>
						Información detallada sobre{" "}
						<strong>licitaciones electrónicas</strong> y procedimientos
						administrativos.
					</li>
					<li>
						Datos actualizados del <strong>BOE</strong> y boletines oficiales
						locales.
					</li>
					<li>
						Una interfaz intuitiva para guardar y gestionar tus licitaciones
						favoritas.
					</li>
					<li>
						Guías sobre los procesos de contratación pública y{" "}
						<strong>clases de contratos administrativos</strong>.
					</li>
				</ul>
			</section>

			<section>
				<h2>Licitaciones de obras públicas</h2>
				<ul>
					<li>
						Información detallada sobre{" "}
						<strong>licitaciones de obras públicas</strong> u otro tipo de
						publicaciones en todo el territorio nacional.
					</li>
					<li>
						Filtre los resultados por{" "}
						<strong>tipo, objeto o ámbito territorial</strong>.
					</li>
					<li>Consulte el detalle ampliado accediendo a la licitación.</li>
				</ul>
			</section>

			<section>
				<h2>¿A quién va dirigido?</h2>
				<ul>
					<li>
						<strong>Empresas de licitaciones</strong> que buscan aumentar su
						cartera de proyectos.
					</li>
					<li>
						Profesionales interesados en{" "}
						<strong>licitaciones de obras públicas</strong>, transporte y
						servicios.
					</li>
					<li>
						Entidades que necesitan consultar y gestionar contratos{" "}
						<strong>subvencionados por el Estado</strong>.
					</li>
				</ul>
			</section>

			<section>
				<h2>Guarda tus licitaciones para más tarde</h2>
				<p>
					En el caso de que quieras consultar posteriormente una concreta
					licitación puedes guardarla clicando en el icono de la estrella{" "}
					<IconStar className="inline px-1 pb-1 w-8" /> bajo el título del
					detalle de una licitación. Podrás acceder a ella desde el desplegable
					en el encabezado.
				</p>
				<p>
					Del mismo modo puedes compartir una licitación haciendo click en el
					icono de compartir
					<IconShare className="inline px-1 pb-1 w-8" />.
				</p>
			</section>

			<section>
				<h2>Empieza hoy</h2>
				<p>
					Descubre cómo simplificar la{" "}
					<strong>contratación pública del Estado</strong> y maximizar tus
					oportunidades con nuestra plataforma.
				</p>
			</section>
		</>
	)
}
