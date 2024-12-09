import { LicitationModel } from "@/schemas/licitacion.schema"
import { connectDB } from "."
import { VALID_LICITATION_FIELDS } from "@/CONSTANTS"

await connectDB()

const fieldsCache: Fields = {
	"Órgano de Contratación": [],
	"Estado de la Licitación": [],
	"Financiación UE": [],
	"Tipo de Contrato:": [],
	"Lugar de Ejecución": [],
	"Sistema de contratación": [],
	"Procedimiento de contratación": [],
	"Tipo de tramitación": [],
	"Método de presentación de la oferta": [],
	"Destinatario del contrato": [],
	Resultado: [],
	Adjudicatario: [],
} as const

export type Fields = Partial<
	Record<(typeof VALID_LICITATION_FIELDS)[number], string[]>
>

type KeyofFieldsCache = keyof typeof fieldsCache

let lastCall = 0

export async function getFields() {
	if (lastCall) {
		return fieldsCache
	}

	lastCall = Date.now()

	const licitations = await LicitationModel.find()
		.limit(1000)
		.sort({ createdAt: -1 })

	licitations.forEach((licitation) => {
		Object.keys(fieldsCache).forEach((key) => {
			if (
				fieldsCache[key as KeyofFieldsCache] &&
				licitation[key as KeyofFieldsCache]
			) {
				if (
					!fieldsCache[key as KeyofFieldsCache]!.some(
						(el) => el.toLowerCase() === licitation[key].toLowerCase()
					)
				) {
					fieldsCache[key as KeyofFieldsCache]!.push(licitation[key])
				}
			}
		})
	})

	return fieldsCache as Fields
}
