import { LicitationModel } from "@/schemas/licitacion.schema"
import { connectDB } from "."
import { FilterQuery } from "mongoose"
import { RootQuerySelector } from "mongoose"
import { prepareTextForRegex, swapAccentsByDots } from "@/utils"
import { Licitation } from "@/types"

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
	const searchOptionals: FilterQuery<any>[] | undefined = []

	Object.entries(searchParams).forEach(([key, value]) => {
		if (key === "Objeto del contrato") {
			value
				.split(",")
				.map((v) => v.trim())
				.filter(Boolean)
				.forEach((v) => {
					searchOptionals.push({
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
					$regex: new RegExp(prepareTextForRegex(value)),
					$options: "i",
				},
			})

			return
		}

		if (key === "Órgano de Contratación") {
			searchAggregates.push({
				"Órgano de Contratación": {
					$regex: new RegExp(prepareTextForRegex(value)),
					$options: "i",
				},
			})

			return
		}

		if (key === "Expediente") {
			searchAggregates.push({
				Expediente: {
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
		$or: searchOptionals,
		...searchParamsQuery,
	})
		.sort({ createdAt: -1 })
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

export async function getSuggestions({
	licitation,
	limit = 10,
	skip = 0,
}: {
	licitation: Licitation
	limit?: number
	skip?: number
}) {
	const searchParamsQuery: RootQuerySelector<any> = {}
	const searchAggregates: FilterQuery<any>[] | undefined = []
	const searchOptionals: FilterQuery<any>[] | undefined = []

	if (licitation["Tipo de Contrato:"]) {
		searchParamsQuery["Tipo de Contrato:"] = licitation["Tipo de Contrato:"]
	}

	if (licitation["Lugar de Ejecución"]) {
		searchOptionals.push({
			"Lugar de Ejecución": licitation["Lugar de Ejecución"],
		})
	}

	if (licitation["Órgano de Contratación"]) {
		searchOptionals.push({
			"Órgano de Contratación": licitation["Órgano de Contratación"],
		})
	}

	const licitations = await LicitationModel.find({
		$and: searchAggregates,
		$or: searchOptionals,
		...searchParamsQuery,
	})
		.sort({ createdAt: -1 })
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
