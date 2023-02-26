import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const { prompt } = req.body as { prompt: string };
  // console.log({prompt});

  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "256x256",
  })

  res.status(200).json({ data: response.data.data });
  // res.status(200).json({ message: `Hello Kev, ${prompt}` });
}
