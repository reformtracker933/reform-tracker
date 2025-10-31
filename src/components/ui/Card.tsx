import Image from 'next/image';

export interface CardProps {
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
  buttonName?: string;
}

export function Card({
  title,
  description,
  imageSrc,
  className = '',
  buttonName = '',
}: CardProps) {
  return (
    <div
  className={`bg-surface rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 max-w-[415px] max-h-[296px] hover:scale-105 ${className}`}
    >
      <div className='mt-5'>
        {imageSrc && (
          <div className='relative h-20 w-20'>
            <Image src={imageSrc} alt={title} fill className='object-cover' />
          </div>
        )}
      </div>
      <div className='px-4 py-3'>
        <h3 className='text-2xl font-semibold text-neutral-900 mb-2'>
          {title}
        </h3>
        <p className='text-neutral-600'>{description}</p>
      </div>
      <div>
  <button className='mb-6 bg-surface border border-primary-400 text-primary px-5 py-2 rounded-full flex items-center gap-2 cursor-pointer'>
          {buttonName}
          <Image
            src='/images/icons/upRight.png'
            alt=''
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}
