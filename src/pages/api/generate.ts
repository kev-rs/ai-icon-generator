import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import type { FormValues } from "../generate";
import { prisma } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const { prompt: data } = req.body as { prompt: FormValues };
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user.email) return res.status(401).json({ error: 'UNAUTHORIZED' });

  const prompt = `${data.prompt}, with a background color of ${data.color}, with a style of ${data.iconStyle}, and a shape of ${data.iconShape}`;

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "256x256",
      response_format: 'url'
    });

    const url = response.data.data[0]?.url;
    
    const res_upload = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });

    if (!res_upload.ok) return res.status(400).json({ error: 'error uploading image to cloudinary' });
    const data = await res_upload.json() as { url: string };

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { generatedImgs: true }
    });

    if (!user) return res.status(401).json({ error: 'UNAUTHORIZED' });

    await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        generatedImgs: {
          create: [
            ...user.generatedImgs,
            { image: data.url }
          ]
        }
      }
    });

    res.status(200).json({ data: response.data.data });
  } catch (err) {
    console.log(err);    
    return res.status(400).json(err);
  }
}
