import { ARTICLES } from "@/CONSTANTS"
import { IconArrowRight, IconKeyframeFilled } from "@tabler/icons-react"
import Link from "next/link"

export function ArticleList({
	title = "Artículos de interés",
	isHome = false,
}: {
	title?: string
	isHome?: boolean
}) {
	return (
		<article>
			<div className="flex items-center gap-4">
				<h5 className={`${isHome ? "text-2xl" : "text-xl"}`}>{title}</h5>
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
							<p>
								<IconKeyframeFilled className="inline pb-1" />
								<Link
									href={`/articulos/${article.slug}`}
									className={`hover:underline ${
										isHome ? "font-semibold text-xl" : "font-normal text-base"
									}`}
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
