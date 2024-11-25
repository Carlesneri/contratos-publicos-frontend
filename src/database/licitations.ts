import { LicitationModel } from "@/schemas/licitacion.schema"
import { connectDB } from "."

await connectDB()

export async function getLastLicitations() {
	return (
		await LicitationModel.find({ "Estado de la Licitación": "Publicada" })
			.sort({ updatedAt: -1 })
			.limit(10)
	).map((doc) => doc.toObject())
}

export async function getLicitation(id: string) {
	try {
		return (await LicitationModel.findById(id))?.toObject() || null
	} catch {
		return null
	}
}
