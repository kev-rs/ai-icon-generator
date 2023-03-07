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


{/*<div className='p-8 flex flex-col gap-4'>
  <p>Download is in {isInProgress ?
    "in progress" : "stopped"}</p>
  

  <p>Download size in bytes {size}</p>
  <div className='flex items-center gap-4'>
    <label htmlFor="file">Downloading progress:</label>
    <progress id="file" value={percentage} max="100" />
  </div>
  <p>Elapsed time in seconds {elapsed}</p>
  {error && <p>possible error {JSON.stringify(error)}</p>}
  <div className='flex gap-10'>
    <button className='bg-green-500 p-2 rounded-md' onClick={() => download(fileUrl, filename)}>
      Download
    </button>
    <button className='bg-red-500 p-2 rounded-md' onClick={() => cancel()}>
      Cancel
    </button>
  </div>
</div>*/}