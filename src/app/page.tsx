import Image from 'next/image';

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-3 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image
        src={'/sample.jpg'}
        alt='sample image'
        width={400}
        height={1}
      />
      <div className="bg-slate-50 h-20 w-full flex flex-row flex-auto">
        <div className='bg-slate-400 '>
          <strong className='text-gray-800 text-xs'>ISO1600 26mm f1.5 1/14s</strong>
          <p className='text-gray-800 text-xs'>Dec 28, 2024</p>
        </div>
        <div>
          <strong className='text-gray-900 text-md'>|</strong>
        </div>
        <div>
          <strong className='text-gray-800 text-xs'>Apple iPhone 14</strong>
          <p className='text-gray-800 text-xs'>back dual wide camera 5.7mm f1.5</p>
        </div>
      </div>
    </div>
  );
}
