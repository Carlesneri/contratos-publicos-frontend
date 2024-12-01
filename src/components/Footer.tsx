import Link from "next/link"

export default function Footer() {
	return (
		<footer className="bg-gray-950 text-gray-300 py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap justify-between">
					<div className="w-full md:w-1/3 mb-6 md:mb-0">
						<h3 className="text-lg font-semibold mb-2">Acerca de Nosotros</h3>
						<p className="text-sm">
							Somos una plataforma de consulta de licitaciones públicas en
							España.
						</p>
					</div>
					<div className="w-full md:w-1/3 mb-6 md:mb-0">
						<h3 className="text-lg font-semibold mb-2">Enlaces Rápidos</h3>
						<ul className="text-sm">
							<li className="mb-1">
								<Link href="/" className="hover:text-white">
									Inicio
								</Link>
							</li>
							<li className="mb-1">
								<Link href="/licitaciones" className="hover:text-white">
									Últimas actualizaciones
								</Link>
							</li>
							<li className="mb-1">
								<Link
									href="/licitaciones?Estado+de+la+Licitaci%C3%B3n=Publicada"
									className="hover:text-white"
								>
									Últimas licitaciones publicadas
								</Link>
							</li>
						</ul>
					</div>
					<div className="w-full md:w-1/3">
						<h3 className="text-lg font-semibold mb-2">Contáctanos</h3>
						<p className="text-sm mb-1">
							<a href="mailto:carlesneri@gmail.es" className="hover:text-white">
								Contacto
							</a>
						</p>
						<p className="text-sm">
							Fuente:{" "}
							<a
								className="hover:text-white"
								href="https://contrataciondelestado.es/"
								target="_blank"
							>
								contrataciones del estado
							</a>
						</p>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
					<p>Plataforma de Licitaciones 📝 {new Date().getFullYear()}</p>
				</div>
			</div>
		</footer>
	)
}
