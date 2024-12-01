export function swapAccentsByDots(text: string) {
	return text
		.normalize("NFD")
		.replace(
			/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
			"."
		)
		.normalize()
}
