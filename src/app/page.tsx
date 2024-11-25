import { getLastLicitations } from "@/database/licitations"
import { LicitationCard } from "@/components/LicitationCard"
import { HomeContent } from "@/components/HomeContent"

export const dynamic = "force-dynamic"

export default async function LicitacionesPage() {
	const licitations = await getLastLicitations()

	return (
		<>
			<h3 className="text-2xl font-bold my-6">Últimas publicaciones</h3>
			<div className="flex flex-col w-full gap-4">
				{licitations.map((licitation) => (
					<LicitationCard
						key={licitation._id.toString()}
						licitation={{ ...licitation, id: licitation._id.toString() }}
					/>
				))}
			</div>
			<HomeContent />
		</>
	)
}
