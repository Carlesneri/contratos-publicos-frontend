import mongoose from "mongoose"

const { MONGODB_URI } = process.env

export async function connectDB() {
	if (!MONGODB_URI) {
		throw new Error("Env MONGODB_URI not found")
	}

	return await mongoose
		.connect(MONGODB_URI, { autoIndex: true })
		.then(() => {
			console.log("DB connected")
		})
		.catch((error) => {
			console.error(error)
		})
}

export async function disconnectDB() {
	return await mongoose.disconnect()
}
