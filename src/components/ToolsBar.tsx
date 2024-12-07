"use client"

import { LOCAL_STORAGE_SAVED_LICITATIONS } from "@/CONSTANTS"
import { LocalStorageLicitation, ToastType } from "@/types"
import { IconShare, IconStar, IconStarFilled } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"

export function ToolsBar({
	licitationId,
	title,
}: {
	licitationId: string
	title: string
}) {
	const [saved, setSaved] = useState(false)
	const [toast, setToast] = useState<{ text: string; type: ToastType } | null>(
		null
	)

	useEffect(() => {
		const savedLicitations: LocalStorageLicitation[] = JSON.parse(
			localStorage.getItem(LOCAL_STORAGE_SAVED_LICITATIONS) || "[]"
		)

		setSaved(
			savedLicitations.some((licitation) => {
				return licitation.id === licitationId
			})
		)
	}, [licitationId])

	const timeoutRef = useRef<number | NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (timeoutRef?.current) {
			clearTimeout(timeoutRef.current)
		}

		if (toast) {
			timeoutRef.current = setTimeout(() => {
				setToast(null)
			}, 2000)
		}
	}, [toast])

	function handleClickToggleLicitation() {
		const savedLicitations: LocalStorageLicitation[] = JSON.parse(
			localStorage.getItem(LOCAL_STORAGE_SAVED_LICITATIONS) || "[]"
		)

		if (savedLicitations.some((licitation) => licitation.id === licitationId)) {
			const newSavedLicitations = savedLicitations.filter(
				({ id }) => id !== licitationId
			)

			localStorage.setItem(
				LOCAL_STORAGE_SAVED_LICITATIONS,
				JSON.stringify(newSavedLicitations)
			)
			setSaved(false)

			setToast({ text: "Licitación retirada", type: "success" })
		} else {
			const newSavedLicitations: LocalStorageLicitation[] = [
				...savedLicitations,
				{ id: licitationId, title },
			]

			localStorage.setItem(
				LOCAL_STORAGE_SAVED_LICITATIONS,
				JSON.stringify(newSavedLicitations)
			)

			setSaved(true)
			setToast({ text: "Licitación guardada", type: "success" })
		}

		window.dispatchEvent(new Event("storage"))
	}

	function handleClickShareLicitation() {
		navigator.canShare() ? shareLicitation() : copyClipboardLicitation()
	}

	function shareLicitation() {
		if (navigator.share) {
			navigator.share({
				title: "Licitatión | contratopublico.es",
				text: title || "Mira esta licitación",
				url: window.location.href,
			})
		}
	}

	function copyClipboardLicitation() {
		navigator.clipboard.writeText(window.location.href)

		showToast({ text: "Copiado al portapapeles", type: "success" })
	}

	function showToast({ text, type }: { text: string; type: ToastType }) {
		setToast({ text, type })
	}

	return (
		<div className="flex gap-2 items-center flex-wrap">
			{toast && (
				<div className="toast toast-top toast-center opacity-90 font-bold">
					<div
						className={
							toast.type === "success"
								? "alert alert-success rounded-sm p-2"
								: "alert rounded-sm p-2"
						}
					>
						<span>{toast.text}</span>
					</div>
				</div>
			)}
			<button
				className="btn btn-outline text-yellow-600"
				title={`${saved ? "retirar licitación" : "guardar licitación"}`}
				onClick={handleClickToggleLicitation}
			>
				{saved ? <IconStarFilled /> : <IconStar />}
			</button>
			<button
				className="btn btn-outline text-success"
				title="compartir licitación"
				onClick={handleClickShareLicitation}
			>
				<IconShare />
			</button>
		</div>
	)
}
