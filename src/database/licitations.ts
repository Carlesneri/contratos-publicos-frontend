import { LicitationModel } from "@/schemas/licitacion.schema"
import { connectDB } from "."

await connectDB()

export async function getLastLicitations(
	{
		limit,
		skip,
		searchParams,
	}: { limit: number; skip: number; searchParams: Record<string, string> } = {
		limit: 10,
		skip: 0,
		searchParams: {},
	}
) {
	const searchParamsQuery: Record<string, { $in: string[] }> = {}

	Object.entries(searchParams).forEach(([key, value]) => {
		searchParamsQuery[key] = { $in: value.split(",") }
	})

	const licitations = await LicitationModel.find({
		"Estado de la Licitación": "Publicada",
		...searchParamsQuery,
	})
		.sort({ updatedAt: -1 })
		.limit(limit + 1)
		.skip(skip)

	const mappedLicitations = licitations.map((doc) => {
		const { _id, ...restOfDoc } = doc.toObject()

		const docObject = {
			...restOfDoc,
			id: _id.toString(),
		}

		return docObject
	})

	return {
		result: mappedLicitations.slice(0, limit),
		isNextPage: mappedLicitations.length > limit,
	}
}

export async function getLicitation(id: string) {
	try {
		return (await LicitationModel.findById(id))?.toObject() || null
	} catch {
		return null
	}
}
