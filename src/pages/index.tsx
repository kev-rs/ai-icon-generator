import type { NextPage } from "next";
import { RootLayout } from '@layouts';
import Image from "next/image";
import { Arrow } from "@/components";
import { asset as img } from '@assets';
import { info, usersFeedback, benefits } from "@/data/info";

const Home: NextPage = () => {

  return (
    <RootLayout>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-4">
          <h1
            className="text-5xl font-mono font-bold"
          >Generate icons with the click of a button</h1>
          <p
            className="text-xl w-[80%]"
          >Save time by generating icons for your businesses website, applications, or brand using our AI digital icon generator.</p>
          <div className="">
            <button
              className="uppercase bg-cyan-400 text-gray-900 p-4 rounded-md shadow-md drop-shadow-md font-mono"
            >Get started</button>

            <div className="ml-20 mt-2">
              <Arrow />
              <p>limited time offer!</p>
              <p>$5 for 100 credits</p>
            </div>
          </div>
        </div>

        <div className="">
          <Image
            className="rounded-xl shadow-md drop-shadow-md"
            /* eslint-disable */
            src={img.iconskev}
            alt="img"
            width={800}
            height={100}
          />
        </div>
      </div>
      <div className="mt-64 flex flex-col-reverse items-center gap-10">
        <Image
          // className="animate-[flow_1s_ease-in-out_infinite]"
          className="relative animate-flow"
          src={img.bot}
          alt="img"
          width={200}
          height={100}
        />

        <div className="flex flex-col items-center w-[50%]">
          <h3 className="text-4xl font-bold">Let us save your time</h3>
          <p className="text-xl mt-8 font-normal text-center">Hiring a designer to build web assets and digital icons for your site can be hard and time consuming. Describe your icons with a custom prompt, and we'll generate your assets in seconds.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {
          info.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start gap-5"
            >
              <Image
                src={item.icon}
                alt="img"
                width={50}
                height={50}
              />
              <div className="w-[60%]">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))
        }        
      </div>

      <div className="mt-40 flex flex-col items-center">
        <h3 className="text-center text-4xl font-mono mb-10">What our users are saying</h3>

        <div className="grid grid-cols-3 w-[80%] gap-8">
          {usersFeedback.map((item, index) => (
            <div key={index} className="border bg-slate-700 p-4 ">
              <div className="flex items-start mb-4">
                <Image
                  src={item.avatar}
                  alt="img"
                  width={50}
                  height={50}
                />
                <p>{item.name}</p>
              </div>
              <p className="">{item.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex justify-center">
        <div className="w-[50%]">
          <h3 className="text-center text-4xl mb-4">The Benefits of Generated Icons</h3>
          <p className="text-lg">Let's be honest, you don't have the time or money to find a designer, communicate back and forth via email, and refine your icon over and over again. Letting AI generate your icon provides many benefits.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-20 gap-10">
        {benefits.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Image
                src={item.src}
                alt="img"
                width={200}
                height={100}
              />
              <h3 className="text-2xl font-bold">{item.title}</h3>
            </div>
            <div className="w-[60%]">
              <p className="text-lg">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-20">
        <p className="w-[50%]">Our tool is a great choice for web application developers who want to create custom icons quickly, affordably, and with a high degree of consistency and customizability. While a designer may still be necessary in certain cases, an AI icon generator can be a valuable addition to your design toolkit.</p>
        <button className="uppercase bg-cyan-500 p-3 rounded-xl text-black">Start generating icons!</button>
      </div>

    </RootLayout>
  );
};

export default Home;