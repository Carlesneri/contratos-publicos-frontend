import { ARTICLES } from "@/CONSTANTS"
import { IconArrowRight, IconKeyframeFilled } from "@tabler/icons-react"
import Link from "next/link"

export function ArticleList() {
	return (
		<article>
			<div className="flex items-center gap-4">
				<h5 className="text-xl">Artículos de interés</h5>
				<Link
					href="/articulos"
					className="btn btn-link text-success w-fit p-0 text-lg"
				>
					ver todos
					<IconArrowRight />
				</Link>
			</div>
			<div className="flex flex-col gap-2">
				{ARTICLES.map((article) => {
					return (
						<div key={article.slug}>
							<p className="">
								<IconKeyframeFilled className="inline pb-1" />
								<Link
									href={`/articulos/${article.slug}`}
									className="hover:underline font-semibold"
								>
									{article.title}
								</Link>
							</p>
						</div>
					)
				})}
			</div>
		</article>
	)
}
