import { LicitationModel } from "@/schemas/licitacion.schema"
import { connectDB } from "."

await connectDB()

export async function getLastLicitations() {
	return (
		await LicitationModel.find({ "Estado de la Licitación": "Publicada" })
			.limit(10)
			.sort({ updatedAt: -1 })
	).map((doc) => doc.toObject())
}

export async function getLicitation(id: string) {
	return (await LicitationModel.findById(id))?.toObject() || null
}
