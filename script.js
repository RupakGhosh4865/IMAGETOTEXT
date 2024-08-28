const inputtxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("button");

const token = "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"; // Use your actual Hugging Face token here

async function query() {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
		{
			headers: {
				Authorization: `Bearer ${token}`, // Use backticks for string interpolation
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({ "inputs": inputtxt.value }), // Use "inputs" instead of "input"
		}
	);

	if (!response.ok) {
		console.error("Failed to fetch data:", response.statusText);
		return null;
	}

	const result = await response.blob();
	return result;
}

button.addEventListener("click", async function () {
	const response = await query();
	if (response) {
		const objectURL = URL.createObjectURL(response);
		image.src = objectURL;
		image.style.display = "block"; // Make the image visible after generating it
	}
});
