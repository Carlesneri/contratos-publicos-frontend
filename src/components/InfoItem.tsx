import { IconChevronRight } from "@tabler/icons-react"
import Link from "next/link"

type MoreLink = {
	label: string
	href: string
}

export function InfoItem({
	icon,
	label,
	value,
	moreLink,
}: {
	icon?: React.ReactNode
	label: string
	value?: string
	moreLink?: MoreLink | null
}) {
	return (
		<div className="flex items-start">
			{icon && <span className="mr-2 text-gray-500">{icon}</span>}
			<div>
				<p className="text-sm font-medium text-gray-500">{label}</p>
				<p className="text-base text-gray-800 inline-flex flex-wrap items-center gap-2">
					{value || "N/A"}{" "}
					{moreLink && (
						<Link
							href={moreLink.href}
							className="btn btn-link text-info text-sm p-0"
						>
							<IconChevronRight size={18} />
							{moreLink.label}
						</Link>
					)}
				</p>
			</div>
		</div>
	)
}
