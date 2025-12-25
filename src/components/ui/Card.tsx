import Image from 'next/image';
import Link from 'next/link';

export interface CardProps {
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
  buttonName?: string;
  href?: string;
}

export function Card({
  title,
  description,
  imageSrc,
  className = '',
  buttonName = '',
  href = '#',
}: CardProps) {
  const CardContent = (
    <div
      className={`bg-white border-2 border-neutral-900 rounded-xl overflow-hidden transition-all duration-150 w-full md:max-w-[415px] shadow-[4px_4px_0px_#1a1a1a] hover:shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] ${className}`}
    >
      <div className='p-4'>
        {imageSrc && (
          <div className='relative h-20 w-20 border-2 border-neutral-900 rounded-lg overflow-hidden'>
            <Image src={imageSrc} alt={title} fill className='object-cover' />
          </div>
        )}
      </div>
      <div className='px-5 py-4'>
        <h3 className='text-xl font-bold text-neutral-900 mb-2'>{title}</h3>
        <p className='text-neutral-700 font-medium'>{description}</p>
      </div>
      {buttonName && (
        <div className='px-5 pb-5'>
          <button className='bg-white border-2 border-neutral-900 text-neutral-900 px-5 py-2 rounded-lg font-bold flex items-center gap-2 shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150'>
            {buttonName}
            <Image
              src='/images/icons/upRight.png'
              alt=''
              width={20}
              height={20}
            />
          </button>
        </div>
      )}
    </div>
  );

  if (href && href !== '#') {
    return (
      <Link href={href} className='block'>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
