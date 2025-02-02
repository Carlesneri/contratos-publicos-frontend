"use client"

import { LOCAL_STORAGE_SAVED_LICITATIONS } from "@/CONSTANTS"
import { LocalStorageLicitation, ToastType } from "@/types"
import {
	addLicitationStorage,
	getStorageLicitations,
	removeLicitationStorage,
} from "@/utils"
import { IconShare, IconStar, IconStarFilled } from "@tabler/icons-react"
import { useCallback, useEffect, useRef, useState } from "react"

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

	const setFavState = useCallback(() => {
		const savedLicitations: LocalStorageLicitation[] = JSON.parse(
			localStorage.getItem(LOCAL_STORAGE_SAVED_LICITATIONS) || "[]"
		)

		setSaved(
			savedLicitations.some((licitation) => {
				return licitation.id === licitationId
			})
		)
	}, [licitationId])

	useEffect(() => {
		setFavState()
	}, [setFavState])

	useEffect(() => {
		window.addEventListener("storage", setFavState)

		return () => {
			window.removeEventListener("storage", setFavState)
		}
	}, [setFavState])

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
		const savedLicitations = getStorageLicitations()

		if (savedLicitations.some((licitation) => licitation.id === licitationId)) {
			removeLicitationStorage(licitationId)
			setSaved(false)
			setToast({ text: "Licitación retirada", type: "success" })
		} else {
			addLicitationStorage({ licitationId, title })
			setSaved(true)
			setToast({ text: "Licitación guardada", type: "success" })
		}
	}

	function handleClickShareLicitation() {
		const shareLicitationObject = {
			title: "Licitatión | contratopublico.es",
			text: title || "Mira esta licitación",
			url: window.location.href,
		}

		navigator.canShare(shareLicitationObject)
			? shareLicitation(shareLicitationObject)
			: copyClipboardLicitation()
	}

	function shareLicitation(shareLicitationObject: {
		title: string
		text: string
		url: string
	}) {
		if (navigator.share) {
			try {
				navigator.share(shareLicitationObject)
			} catch {
				setToast({ text: "No se pudo compartir.", type: "error" })
			}
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
