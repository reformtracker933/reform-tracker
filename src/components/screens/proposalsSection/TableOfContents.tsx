'use client';

import { useLocale } from '@/context/LocaleContext';

export function TableOfContents({
  themes,
}: {
  themes: Array<{ theme: { _id: string; name: string; icon?: string } }>;
}) {
  const { getTranslation } = useLocale();
  const text = getTranslation('commissionDetail');

  return (
    <aside className='lg:col-span-1'>
      <div className='sticky top-24 bg-white rounded-xl border-2 border-neutral-900 shadow-[4px_4px_0px_#1a1a1a] p-6'>
        <h3 className='font-black text-lg mb-4 text-neutral-900 pb-2 border-b-2 border-neutral-900'>
          {text.contents}
        </h3>
        <nav className='space-y-2'>
          {themes?.map((themeGroup, index) => (
            <a
              key={themeGroup.theme._id}
              href={`#theme-${index}`}
              className='block text-sm font-bold text-neutral-800 hover:text-primary transition-all py-2 px-3 rounded-lg hover:bg-warning border-2 border-transparent hover:border-neutral-900'
            >
              <span className='mr-2'>{themeGroup.theme.icon}</span>
              {themeGroup.theme.name}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
