import { ArticleList } from "@/components/ArticleList"
import { LinkList } from "@/components/LinkList"

export default function ArticleLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{children}
			<ArticleList title="Nuestros artículos" />
			<LinkList />
		</>
	)
}
