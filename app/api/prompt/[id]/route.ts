import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req: Request, { params }) => {
	try {
		await connectToDB();

		const prompt = await Prompt.findById(params.id).populate("creator");

		if (!prompt) return new Response("Prompt not found", { status: 404 });

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all prompts", { status: 500 });
	}
};

export const PATCH = async (req: Request, { params }) => {
	const { prompt, tag } = await req.json();

	try {
		await connectToDB();

		const existingPrompt = await Prompt.findById(params.id);

		if (!existingPrompt)
			return new Response("Prompt not found", { status: 404 });

		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to update prompt", { status: 500 });
	}
};

export const DELETE = async (req: Request, { params }) => {
	try {
		await connectToDB();

		// Find the prompt by ID and delete it
		await Prompt.findByIdAndDelete(params.id);

		return new Response("Prompt deleted successfully", { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Failed to delete prompt", { status: 500 });
	}
};
