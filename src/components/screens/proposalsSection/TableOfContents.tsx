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
      <div className='sticky top-24 bg-white rounded-xl shadow-md p-6'>
        <h3 className='font-bold text-lg mb-4 text-gray-900'>
          {text.contents}
        </h3>
        <nav className='space-y-2'>
          {themes?.map((themeGroup, index) => (
            <a
              key={themeGroup.theme._id}
              href={`#theme-${index}`}
              className='block text-sm text-gray-600 hover:text-primary transition-colors py-1.5 px-3 rounded-lg hover:bg-gray-50'
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
