import { LinkList } from "@/components/LinkList"
import { ARTICLES } from "@/CONSTANTS"
import { IconArrowRight } from "@tabler/icons-react"
import Link from "next/link"

export default function Articulos() {
	return (
		<>
			<h1>Lista de artículos</h1>
			<section>
				{ARTICLES.map((article) => {
					return (
						<article key={article.slug}>
							<p className="py-2">
								<IconArrowRight className="inline pb-1" />
								<Link
									href={`/articulos/${article.slug}`}
									className="text-xl hover:underline"
								>
									{article.title}
								</Link>
							</p>
							<p className="pl-6">{article.description}</p>
						</article>
					)
				})}
			</section>

			<section className="mt-auto">
				<LinkList />
			</section>
		</>
	)
}
