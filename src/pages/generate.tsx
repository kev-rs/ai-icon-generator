import { useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { RootLayout } from "@/components";

type Res = {
  data: {
    url: string;
  }[];
}

const Generate = () => {

  const mutation = useMutation(async (input: string) => {

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      })
    });

    const imgs = await res.json() as Res;

    return imgs.data;
  });

  const [imgs, setImgs] = useState<Res['data']>();
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length < 1) return;
    mutation.mutate(text, {
      onSuccess: (v) => {
        setImgs(v);
        setText('');
      }
    });
  }
  return (
    <RootLayout>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2"
        >
          <input
            type='text'
            onChange={(e) => handleChange(e)}
            className="border border-gray-300 rounded-md p-2 w-[50%]"
            value={text}
          />

          <button type='submit' className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
        </form>
        <div>
          {
            imgs?.map((img, i) => {
              return (
                <div key={i}>
                  <Image
                    alt="img"
                    src={img.url}
                    width={100}
                    height={100}
                    priority
                  />
                </div>
              )
            }
            )
          }
        </div>
      </div>
    </RootLayout>
  )
}

export default Generate