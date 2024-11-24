import { getLastLicitations } from "@/database/licitations"
import { LicitationCard } from "@/components/LicitationCard"

export default async function LicitacionesPage() {
	const licitations = await getLastLicitations()

	return (
		<div className="py-8">
			<h1 className="text-2xl font-bold mb-6">Últimas publicaciones</h1>
			<div className="flex flex-col w-full gap-4">
				{licitations.map((licitation) => (
					<LicitationCard
						key={licitation._id.toString()}
						licitation={{ ...licitation, id: licitation._id.toString() }}
					/>
				))}
			</div>
		</div>
	)
}
