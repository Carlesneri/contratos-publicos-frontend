export function InfoItem({
	icon,
	label,
	value,
}: {
	icon?: React.ReactNode
	label: string
	value?: string
}) {
	return (
		<div className="flex items-start">
			{icon && <span className="mr-2 text-gray-500">{icon}</span>}
			<div>
				<p className="text-sm font-medium text-gray-500">{label}</p>
				<p className="text-base text-gray-800">{value || "N/A"}</p>
			</div>
		</div>
	)
}
