import { getLastLicitations } from "@/database/licitations"
import { LicitationCard } from "@/components/LicitationCard"
import { HomeContent } from "@/components/HomeContent"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function LicitacionesPage() {
	const licitations = await getLastLicitations()

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2 items-center">
				<h3 className="text-2xl font-bold">Últimas publicaciones</h3>
				<span>
					<Link
						className="btn btn-link text-blue-800 text-xl"
						href="/licitaciones"
					>
						Ver todas
					</Link>
				</span>
			</div>
			<div className="flex flex-col w-full gap-4 items-center">
				{licitations.result.map((licitation) => (
					<LicitationCard key={licitation.id} licitation={licitation} />
				))}
				<Link href="/licitaciones" className="btn btn-outline w-fit">
					{"Ver más >>"}
				</Link>
			</div>
			<HomeContent />
		</div>
	)
}
