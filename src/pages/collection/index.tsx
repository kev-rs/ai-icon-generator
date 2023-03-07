import { RootLayout } from '@/components'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image';
import useDownloader from 'react-use-downloader'
import { DownloadIcon } from '@/components/ui/DownloadIcon';

type InferSSR<T extends (args: any) => any> = Awaited<Extract<Awaited<ReturnType<T>>, { props: any }>['props']>;

const CollectionPage: React.FC<InferSSR<typeof getServerSideProps>> = ({ user_imgs }) => {
  
  const { download } = useDownloader();
  
  const filename = 'beautiful-carpathia.jpg';

  return (
    <RootLayout>
      <div className='h-screen'>        
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
              {/* eslint-disable */}
              <DownloadIcon callback={() => download(img, filename)} />
              {/* eslint-enable */}
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