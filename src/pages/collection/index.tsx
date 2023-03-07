import { RootLayout } from '@/components'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import { asset } from '@assets';
import useDownloader from 'react-use-downloader'
import { useEffect } from 'react';
import { DownloadIcon } from '@/components/ui/DownloadIcon';

type InferSSR<T extends (args: any) => any> = Awaited<Extract<Awaited<ReturnType<T>>, { props: any }>['props']>;

const CollectionPage: React.FC<InferSSR<typeof getServerSideProps>> = ({ user_imgs }) => {
  
  const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader();
  
  const filename = 'beautiful-carpathia.jpg';

  return (
    <RootLayout>
      <div className='h-screen'>
        <div className='p-8 flex flex-col gap-4'>
          <p>Download is in {isInProgress ?
            "in progress" : "stopped"}</p>
          {/* eslint-disable */}
          
          <p>Download size in bytes {size}</p>
          <div className='flex items-center gap-4'>
            <label htmlFor="file">Downloading progress:</label>
            <progress id="file" value={percentage} max="100" />
          </div>
          <p>Elapsed time in seconds {elapsed}</p>
          {error && <p>possible error {JSON.stringify(error)}</p>}
          <div className='flex gap-10'>
            {/* <button className='bg-green-500 p-2 rounded-md' onClick={() => download(fileUrl, filename)}>
              Download
            </button> */}
            <button className='bg-red-500 p-2 rounded-md' onClick={() => cancel()}>
              Cancel
            </button>
          </div>
        </div>
        
        <div className='grid grid-cols-7 gap-10'>
          {user_imgs.map((img, i) => (
            <div key={i} className='flex'>
              <Image
                className="w-full rounded-3xl"
                alt="img"
                src={img}
                width={100}
                height={100}
                priority
              />
              <DownloadIcon callback={() => download(img, filename)} />
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{ user_imgs: string[] }> = async (ctx: GetServerSidePropsContext) => {

  const session = await getServerAuthSession(ctx);

  if (!session || !session.user.email) return {
    redirect: { destination: '/', permanent: false, statusCode: 401 }
  }

  const user_imgs = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { generatedImgs: true }
  })

  if (!user_imgs) return {
    redirect: { destination: '/', permanent: false, statusCode: 401 }
  };

  return {
    props: {
      user_imgs: user_imgs.generatedImgs.map(img => img.image)
    }
  }
}

export default CollectionPage;