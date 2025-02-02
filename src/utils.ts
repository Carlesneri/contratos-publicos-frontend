import { LOCAL_STORAGE_SAVED_LICITATIONS } from "./CONSTANTS"
import { LocalStorageLicitation } from "./types"

export function swapAccentsByDots(text: string) {
	return text
		.normalize("NFD")
		.replace(
			/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
			"."
		)
		.normalize()
}

export function escapeCharacters(text: string) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

export function prepareTextForRegex(text: string) {
	return swapAccentsByDots(escapeCharacters(text))
}

export function getStorageLicitations(): LocalStorageLicitation[] {
	const savedLicitations: LocalStorageLicitation[] = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_SAVED_LICITATIONS) || "[]"
	)

	return savedLicitations
}

export function removeLicitationStorage(licitationId: string) {
	const savedLicitations = getStorageLicitations()

	const newSavedLicitations = savedLicitations.filter(
		({ id }) => id !== licitationId
	)

	localStorage.setItem(
		LOCAL_STORAGE_SAVED_LICITATIONS,
		JSON.stringify(newSavedLicitations)
	)

	window.dispatchEvent(new Event("storage"))
}

export function addLicitationStorage({
	licitationId,
	title,
}: {
	licitationId: string
	title: string
}) {
	const savedLicitations = getStorageLicitations()

	const newSavedLicitations: LocalStorageLicitation[] = [
		...savedLicitations,
		{ id: licitationId, title },
	]

	localStorage.setItem(
		LOCAL_STORAGE_SAVED_LICITATIONS,
		JSON.stringify(newSavedLicitations)
	)

	window.dispatchEvent(new Event("storage"))
}
