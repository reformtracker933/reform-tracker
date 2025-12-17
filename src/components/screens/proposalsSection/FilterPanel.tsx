'use client';

import { useLocale } from '@/context/LocaleContext';
import { Theme, CommissionParty } from '@/types/sanity';
import { useState } from 'react';

interface FilterPanelProps {
  themes: Theme[];
  parties: CommissionParty[];
  selectedThemes: string[];
  selectedParties: string[];
  onThemeChange: (themeIds: string[]) => void;
  onPartyChange: (partyIds: string[]) => void;
  onClearFilters: () => void;
}

export default function FilterPanel({
  themes,
  parties,
  selectedThemes,
  selectedParties,
  onThemeChange,
  onPartyChange,
  onClearFilters,
}: FilterPanelProps) {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeToggle = (themeId: string) => {
    if (selectedThemes.includes(themeId)) {
      onThemeChange(selectedThemes.filter((id) => id !== themeId));
    } else {
      onThemeChange([...selectedThemes, themeId]);
    }
  };

  const handlePartyToggle = (partyId: string) => {
    if (selectedParties.includes(partyId)) {
      onPartyChange(selectedParties.filter((id) => id !== partyId));
    } else {
      onPartyChange([...selectedParties, partyId]);
    }
  };

  const hasActiveFilters =
    selectedThemes.length > 0 || selectedParties.length > 0;

  return (
    <div className='w-full'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden w-full mb-4 px-4 py-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors'
      >
        <span className='font-medium text-gray-700'>
          {t('proposalsPage.filters')}
          {hasActiveFilters && (
            <span className='ml-2 px-2 py-1 bg-primary text-white text-xs rounded-full'>
              {selectedThemes.length + selectedParties.length}
            </span>
          )}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } lg:block bg-white rounded-xl border border-gray-200 p-6`}
      >
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className='w-full mb-4 px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors'
          >
            {t('proposalsPage.clearFilters')}
          </button>
        )}

        <div className='mb-6'>
          <h3 className='font-semibold text-gray-900 mb-3'>
            {t('proposalsPage.filterByTheme')}
          </h3>
          <div className='space-y-2'>
            {themes.map((theme) => (
              <label
                key={theme._id}
                className='flex items-center cursor-pointer group'
              >
                <input
                  type='checkbox'
                  checked={selectedThemes.includes(theme._id)}
                  onChange={() => handleThemeToggle(theme._id)}
                  className='w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2'
                />
                <span className='ml-3 text-sm text-gray-700 group-hover:text-gray-900 flex items-center'>
                  {theme.icon && <span className='mr-2'>{theme.icon}</span>}
                  {theme.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className='font-semibold text-gray-900 mb-3'>
            {t('proposalsPage.filterByParty')}
          </h3>
          <div className='space-y-2'>
            {parties.map((party) => (
              <label
                key={party._id}
                className='flex items-center cursor-pointer group'
              >
                <input
                  type='checkbox'
                  checked={selectedParties.includes(party._id)}
                  onChange={() => handlePartyToggle(party._id)}
                  className='w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2'
                />
                <span className='ml-3 text-sm text-gray-700 group-hover:text-gray-900 flex items-center'>
                  <span
                    className='w-3 h-3 rounded-full mr-2'
                    style={{ backgroundColor: party.color || '#4a7ec9' }}
                  />
                  {party.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
