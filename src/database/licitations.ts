import { LicitationModel } from "@/schemas/licitacion.schema"
import { connectDB } from "."
import { FilterQuery } from "mongoose"
import { RootQuerySelector } from "mongoose"
import { swapAccentsByDots } from "@/utils"

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
	const searchParamsQuery: RootQuerySelector<any> = {}

	const searchAggregates: FilterQuery<any>[] | undefined = []

	Object.entries(searchParams).forEach(([key, value]) => {
		if (key === "Objeto del contrato") {
			value
				.split(",")
				.map((v) => v.trim())
				.filter(Boolean)
				.forEach((v) => {
					searchAggregates.push({
						"Objeto del contrato": {
							$regex: new RegExp(swapAccentsByDots(v)),
							$options: "i",
						},
					})
				})

			return
		}

		if (key === "Lugar de Ejecución") {
			searchAggregates.push({
				"Lugar de Ejecución": {
					$regex: new RegExp(swapAccentsByDots(value)),
					$options: "i",
				},
			})

			return
		}

		if (key === "Órgano de Contratación") {
			searchAggregates.push({
				"Órgano de Contratación": {
					$regex: new RegExp(swapAccentsByDots(value)),
					$options: "i",
				},
			})

			return
		}

		searchParamsQuery[key] = { $in: value.split(",") }
	})

	const licitations = await LicitationModel.find({
		$and: searchAggregates,
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
