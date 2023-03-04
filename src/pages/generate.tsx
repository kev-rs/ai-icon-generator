import { useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { RootLayout } from "@/components";
import clsx from "clsx";
import { asset } from "@/assets";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";

const formValues = z.object({
  prompt: z.string().min(1),
  color: z.string().min(1),
  iconStyle: z.string().min(1),
  iconShape: z.string().min(1),
  imgs: z.number().min(1).default(1)
})

type FormValues = z.infer<typeof formValues>;

type Res = {
  data: {
    url: string;
  }[];
}

const colors = [
  { name: 'red', hex: '#ff0000' },
  { name: 'blue', hex: '#0000ff' },
  { name: 'green', hex: '#00ff00' },
  { name: 'yellow', hex: '#ffff00' },
  { name: 'orange', hex: '#ffa500' },
  { name: 'purple', hex: '#800080' },
  { name: 'pink', hex: '#ffc0cb' },
  { name: 'brown', hex: '#a52a2a' },
  { name: 'black', hex: '#000000' },
  { name: 'white', hex: '#ffffff' },
  { name: 'gray', hex: '#808080' },
  { name: 'silver', hex: '#c0c0c0' },
]

const Generate = () => {

  const { register, formState: { errors }, handleSubmit, setValue } = useForm<FormValues>({ 
    mode: 'all', 
    resolver: zodResolver(formValues)
  });

  const mutation = useMutation(async (input: FormValues) => {

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
  

  const handlePrompt: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // mutation.mutate(data, {
    //   onSuccess: (v) => {
    //     setImgs(v);
    //     setText('');
    //   }
    // });
  }
  return (
    <RootLayout>
      <div className="flex justify-center">
        <form
          /* eslint-disable */
          onSubmit={handleSubmit(handlePrompt)}
          /* eslint-enable */
          className="flex flex-col items-start gap-10"
        >
          <h2 className="text-center text-4xl font-bold">{"Let's generate your icon."}</h2>
          <label htmlFor="" className="flex flex-col gap-5">
            <p className="">1. Describe your icon using a noun and adjective </p>
            <input
              type='text'
              className="bg-transparent border-2 border-rose-500 outline-2 outline-cyan-500 rounded-md p-2 w-full"
              placeholder="Ex: an angry chicken"
              {...register('prompt')}
            />
          </label>

          <label htmlFor="" className="flex flex-col gap-5">
            <p className="">2. Select a primary color for your icon</p>
            <div className="grid grid-cols-4 gap-4">
              {
                colors.map((c, i) => {
                  const box = i + 1;
                  return (
                    <div key={i}>
                      <div
                        id={`${box}`}
                        style={{ backgroundColor: c.hex }}
                        className={clsx(
                          "p-10 rounded-md  transition-all", {
                            // "hover:-translate-y-2 hover:translate-x-1": `${box}` !== selected.color,
                            // "absolute top-[85%] left-[55%] p-[8%] shadow-lg": `${box}` === selected.color,
                          }
                        )}
                        {...register('color'), { onClick: () => {
                          setValue('color', c.hex)
                        } }}
                        // onClick={() => setSelected(prev => ({ ...prev, color: `${box}`}))}
                      ></div>
                    </div>
                  )
                }
                )}
            </div>
          </label>

          <label className="flex flex-col gap-5">
            <h3 className="text-xl font-bold">3. Select a style for your icon</h3>
            <div className="grid grid-cols-4 gap-4">
              {
                Object.entries(asset.iconStyles).map(([key, value]) => {
                  return (
                    <div 
                      key={key}
                      // onClick={() => setSelected(prev => ({ ...prev, style: `${box}`}))}
                      {...register('iconStyle'), { onClick: () => {
                        setValue('iconStyle', key)
                      } }}
                      className={clsx(
                        // {"flex flex-col-reverse gap-4 justify-center items-center absolute right-[29%] top-[138%] w-[15%] transition-all": `${box}` === selected.style}
                      )}
                    >
                      <Image                      
                        className={clsx(
                          "rounded-md shadow-md", {
                            // "w-full transition-all": `${box}` === selected.style,
                          }
                        )}
                        alt="img"
                        src={value}
                        width={100}
                        height={100}
                      />
                      <p className="capitalize text-center">{key}</p>
                    </div>
                  )
                })
              }
            </div>
          </label>

          <label htmlFor="" className="flex flex-col gap-5">
            <p className="">4. Select the shape of your icon</p>
            <div className="grid grid-cols-4 gap-4">
              {
                Object.entries(asset.iconShapes).map(([key, value]) => {
                  return (
                    <div 
                      key={key}
                      // onClick={() => setSelected(prev => ({ ...prev, shape: `${box}`}))}
                      {...register('iconShape'), { onClick: () => {
                        setValue('iconShape', key)
                      } }}
                      className={clsx(
                        // {"flex flex-col-reverse gap-4 justify-center items-center absolute right-[29%] top-[185%] w-[15%] transition-all": `${box}` === selected.shape}
                      )}
                    >
                      <Image                      
                        className={clsx(
                          "rounded-md shadow-md", {
                            // "w-full transition-all": `${box}` === selected.shape,
                          }
                        )}
                        alt="img"
                        src={value}
                        width={100}
                        height={100}
                      />
                      <p className="capitalize text-center">{key}</p>
                    </div>
                  )
                })
              }
            </div>
          </label>

          <label htmlFor="" className="flex flex-col gap-5">
            <p className="">5. How many images do you want (1 credit per image)</p>
            <input
              type='number'
              value={1}
              // onChange={(e) => handleChange(e)}
              {...register('imgs')}
              className="bg-transparent rounded-md w-full p-2 mt-2 border-2 border-rose-500 outline-2 outline-cyan-500"
            />
          </label>

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