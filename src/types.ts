export interface Licitation {
	Resultado?: string
	link?: string
	Información?: string
	id: string
	Expediente?: string
	Adjudicatario?: string
	"Valor estimado del contrato:"?: string
	"Tipo de tramitación"?: string
	"Tipo de Contrato:"?: string
	"Sistema de contratación"?: string
	"Procedimiento de contratación"?: string
	"Presupuesto base de licitación sin impuestos"?: string
	"Órgano de Contratación"?: string
	"Objeto del contrato"?: string
	"Nº de Licitadores Presentados"?: string
	"Método de presentación de la oferta"?: string
	"Lugar de Ejecución"?: string
	"Importe de Adjudicación"?: string
	"ID del Órgano de Contratación"?: string
	"ID de publicación en TED"?: string
	"Financiación UE"?: string
	"Fecha fin de presentación de oferta"?: string
	"Fecha de Actualización del Expte"?: string
	"Estado de la Licitación"?: string
	"Código CPV"?: string
	"Fecha fin de presentación de solicitud"?: string
}

export type ToastType = "success" | "warning" | "error"

export interface LocalStorageLicitation {
	id: string
	title: string
}
