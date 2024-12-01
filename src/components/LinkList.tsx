import Link from "next/link"

export function LinkList({ list }: { list: { title: string; url: string }[] }) {
	return (
		<ul className="flex flex-wrap gap-2 justify-center">
			{list.map((item, index) => (
				<li
					key={index}
					className="badge badge-success p-4 text-gray-100 font-bold"
				>
					<Link href={item.url}>{item.title}</Link>
				</li>
			))}
		</ul>
	)
}
