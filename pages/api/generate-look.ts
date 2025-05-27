import type { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const {
      person_image,
      cloth_image,
      cloth_type,
      output_format,
      output_quality,
    } = req.body;

    const output = await replicate.run(
      "cedoysch/flux-fill-redux-try-on:b894c30d730b871bf68f59dcbf71945d620299d3cb0b8e2623cf9b6b6f0bfeac",
      {
        input: {
          person_image,
          cloth_image,
          cloth_type,
          output_format,
          output_quality,
        },
      }
    );

    res.status(200).json({ output });
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Replicate error:", error.message);
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Unknown error" });
  }
}

