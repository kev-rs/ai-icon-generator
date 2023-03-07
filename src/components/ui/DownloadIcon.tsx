import { asset } from '@assets';
import Image from 'next/image';

interface Props {
  callback: () => void;
}

export const DownloadIcon: React.FC<Props> = ({ callback }) => {
  return (
    <div 
      className='relative right-32 top-2 cursor-pointer'
      role='button'
      onClick={callback}
    >
      <Image 
        src={asset.downloadImg as string}
        alt="download"
        width={20}
        height={20}
      />
    </div>
  )
}
