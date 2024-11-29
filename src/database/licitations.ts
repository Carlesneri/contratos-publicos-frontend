import { LicitationModel } from "@/schemas/licitacion.schema"
import { connectDB } from "."

await connectDB()

export async function getLastLicitations(
	{ limit, skip }: { limit: number; skip: number } = { limit: 10, skip: 0 }
) {
	return (
		await LicitationModel.find({ "Estado de la Licitación": "Publicada" })
			.sort({ updatedAt: -1 })
			.limit(limit)
			.skip(skip)
	).map((doc) => {
		const { _id, ...restOfDoc } = doc.toObject()

		const docObject = {
			...restOfDoc,
			id: _id.toString(),
		}

		return docObject
	})
}

export async function getLicitation(id: string) {
	try {
		return (await LicitationModel.findById(id))?.toObject() || null
	} catch {
		return null
	}
}
