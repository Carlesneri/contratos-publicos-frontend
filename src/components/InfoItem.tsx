import { IconCaretRightFilled } from "@tabler/icons-react"
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
				<div className="flex flex-wrap items-center gap-2">
					<p className="text-base text-gray-800">{value || "N/A"}</p>
					{moreLink && (
						<div className="flex items-center text-info text-sm">
							<IconCaretRightFilled size={18} />
							<Link
								href={moreLink.href}
								className="line-clamp-1"
								title={moreLink.label}
							>
								{moreLink.label}
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
