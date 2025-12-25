import { LucideIcon } from 'lucide-react';

interface CardStatProps {
  icon?: LucideIcon;
  title: string;
  value: string | number;
  delta?: string;
}

export default function CardStat({
  icon: Icon,
  title,
  value,
  delta,
}: CardStatProps) {
  return (
    <div className='w-full h-full p-5 bg-white rounded-xl border-2 border-neutral-900 shadow-[4px_4px_0px_#1a1a1a] flex flex-col justify-between'>
      <div className='flex items-start gap-3'>
        <div className='p-3 rounded-xl bg-secondary-100 border-2 border-neutral-900 flex items-center justify-center shadow-[2px_2px_0px_#1a1a1a]'>
          {Icon && <Icon className='w-10 h-10 text-secondary' />}
        </div>

        <div className='flex flex-col flex-1'>
          <div className='text-base font-bold text-neutral-700'>{title}</div>

          <div className='flex items-center justify-between mt-4 w-full'>
            <div className='text-4xl font-black text-neutral-900'>{value}</div>
            {delta && (
              <div className='text-xs font-bold bg-success text-white rounded-lg px-4 py-2 border-2 border-neutral-900 shadow-[2px_2px_0px_#1a1a1a]'>
                {`↑ ${delta}`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
