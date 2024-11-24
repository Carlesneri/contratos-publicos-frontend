import mongoose from "mongoose"
import { VALID_LICITATION_FIELDS } from "@/CONSTANTS"

const { Schema, model } = mongoose

const schema: Record<string, any> = { link: { type: String, required: true } }

VALID_LICITATION_FIELDS.forEach((field) => {
	schema[field] = String
})

const LicitationSchema = new Schema(schema, {
	timestamps: true,
})

export const LicitationModel =
	mongoose.models.Licitations || model("Licitations", LicitationSchema)
