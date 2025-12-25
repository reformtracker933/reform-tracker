'use client';

import { useLocale } from '@/context/LocaleContext';
import { CommissionReport, CommissionParty } from '@/types/sanity';
import { useEffect, useState, useCallback } from 'react';
import { CommissionCard } from '@/components/screens/proposalsSection/CommissionCard';

export default function ProposalsPage() {
  const { getTranslation } = useLocale();
  const text = getTranslation('proposalsPage');
  const commissionText = getTranslation('commissionReports');

  const [reports, setReports] = useState<CommissionReport[]>([]);
  const [parties, setParties] = useState<CommissionParty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedParties, setSelectedParties] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const reportsPerPage = 9;

  // Fetch reports
  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: reportsPerPage.toString(),
      });

      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (selectedThemes.length > 0)
        params.append('themes', selectedThemes.join(','));
      if (selectedParties.length > 0)
        params.append('parties', selectedParties.join(','));

      const response = await fetch(`/api/commissions?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const data = await response.json();

      if (data.success) {
        setReports(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalResults(data.pagination?.total || 0);
      } else {
        throw new Error(data.message || 'Failed to load reports');
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load commission reports'
      );
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, selectedThemes, selectedParties]);

  // Fetch filter data
  const fetchFilterData = useCallback(async () => {
    try {
      const partiesRes = await fetch('/api/taxonomies?type=parties');

      if (partiesRes.ok) {
        const partiesData = await partiesRes.json();
        setParties(partiesData.data || []);
      }
    } catch (err) {
      console.error('Error fetching filter data:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchFilterData();
  }, [fetchFilterData]);

  // Fetch reports when dependencies change
  useEffect(() => {
    const timer = setTimeout(
      () => {
        fetchReports();
      },
      searchQuery ? 500 : 0
    );

    return () => clearTimeout(timer);
  }, [searchQuery, selectedThemes, selectedParties, currentPage, fetchReports]);

  const handleClearFilters = useCallback(() => {
    setSelectedThemes([]);
    setSelectedParties([]);
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handlePartyToggle = useCallback((partyId: string) => {
    setSelectedParties((prev) =>
      prev.includes(partyId)
        ? prev.filter((id) => id !== partyId)
        : [...prev, partyId]
    );
    setCurrentPage(1);
  }, []);

  return (
    <div className='min-h-screen bg-neutral-100'>
      <div className='relative bg-primary text-white border-b-2 border-neutral-900'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-size-[4rem_4rem]'></div>
        <div className='relative max-w-7xl mx-auto px-4 xl:px-0 pt-32 md:pt-36 pb-16 md:pb-20'>
          <div className='max-w-4xl'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight'>
              {text.title}
            </h1>
            <p className='text-base md:text-lg lg:text-xl text-white/90 font-semibold'>
              {text.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 xl:px-0 py-12 pt-6 md:pt-8 md:py-16'>
        {/* Search Bar on Top */}
        <div className='mb-6 md:mb-8'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={text.searchPlaceholder}
            className='w-full px-5 py-4 md:py-4.5 bg-white border-2 border-neutral-900 rounded-xl text-sm md:text-base font-medium shadow-[4px_4px_0px_#1a1a1a] focus:shadow-[2px_2px_0px_#1a1a1a] focus:translate-x-[2px] focus:translate-y-[2px] focus:outline-none transition-all duration-150 placeholder:text-neutral-500'
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8'>
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-xl border-2 border-neutral-900 shadow-[4px_4px_0px_#1a1a1a] p-4 md:p-6 sticky top-24'>
              <div className='flex items-center justify-between mb-4 md:mb-6'>
                <h2 className='text-base md:text-lg font-black text-neutral-900'>
                  {text.filters}
                </h2>
                {(selectedParties.length > 0 || searchQuery) && (
                  <button
                    onClick={handleClearFilters}
                    className='text-xs md:text-sm text-primary hover:text-primary/80 font-bold'
                  >
                    {text.clearFilters}
                  </button>
                )}
              </div>

              {parties.length > 0 && (
                <div>
                  <h3 className='text-sm md:text-base font-bold text-neutral-900 mb-3 pb-2 border-b-2 border-neutral-900'>
                    {text.filterByParty}
                  </h3>
                  <div className='space-y-2.5 md:space-y-3'>
                    {parties.map((party) => (
                      <label
                        key={party._id}
                        className='flex items-center cursor-pointer group'
                      >
                        <input
                          type='checkbox'
                          checked={selectedParties.includes(party._id)}
                          onChange={() => handlePartyToggle(party._id)}
                          className='w-5 h-5 border-2 border-neutral-900 rounded text-primary focus:ring-primary focus:ring-2 accent-primary'
                        />
                        <span className='ml-2.5 md:ml-3 text-xs md:text-sm text-neutral-900 font-bold group-hover:text-primary'>
                          {party.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='lg:col-span-4'>
            {error && (
              <div className='bg-white border-2 border-primary rounded-xl shadow-[4px_4px_0px_#e63946] p-6 mb-6'>
                <div className='flex items-start'>
                  <svg
                    className='w-6 h-6 text-primary mr-3 shrink-0'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <div>
                    <h3 className='text-sm font-bold text-neutral-900'>
                      {commissionText.sectionTitle} - Error
                    </h3>
                    <p className='text-sm text-neutral-700 font-semibold mt-1'>
                      {error}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className='mt-3 text-sm font-bold text-primary hover:text-primary/80'
                    >
                      {text.loading.replace('...', '')} - Retry
                    </button>
                  </div>
                </div>
              </div>
            )}

            {loading && !error && (
              <div className='flex flex-col items-center justify-center py-20'>
                <div className='animate-spin rounded-lg h-12 w-12 border-4 border-primary border-t-transparent mb-4'></div>
                <p className='text-neutral-700 font-bold'>{text.loading}</p>
              </div>
            )}

            {!loading && !error && (
              <>
                {/* Results Count */}
                {totalResults > 0 && (
                  <div className='mb-4 flex items-center justify-between'>
                    <p className='text-sm text-neutral-700 font-bold'>
                      {text.showingResults.replace(
                        '{count}',
                        totalResults.toString()
                      )}
                    </p>
                    {totalPages > 1 && (
                      <p className='text-sm text-neutral-700 font-bold'>
                        {text.page}: {currentPage}/{totalPages}
                      </p>
                    )}
                  </div>
                )}

                {/* Empty State */}
                {reports.length === 0 ? (
                  <div className='bg-white rounded-xl border-2 border-neutral-900 shadow-[4px_4px_0px_#1a1a1a] p-12 text-center'>
                    <svg
                      className='mx-auto h-16 w-16 text-neutral-400 mb-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                    <h3 className='text-lg font-black text-neutral-900 mb-2'>
                      {text.noResults}
                    </h3>
                    <p className='text-neutral-700 font-semibold mb-4'>
                      {text.noResultsDescription}
                    </p>
                    {(selectedThemes.length > 0 ||
                      selectedParties.length > 0 ||
                      searchQuery) && (
                      <button
                        onClick={handleClearFilters}
                        className='px-6 py-3 bg-primary text-white rounded-xl font-bold border-2 border-neutral-900 shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[5px_5px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150'
                      >
                        {text.clearFilters}
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Reports Grid - 3 columns layout for 9 cards */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                      {reports.map((report, index) => (
                        <CommissionCard
                          key={report._id}
                          report={report}
                          priority={index < 6}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className='flex items-center justify-center mt-12'>
                        <div className='flex items-center gap-3'>
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='px-4 py-2 rounded-lg border-2 border-neutral-900 bg-white text-neutral-900 font-bold shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 text-sm md:text-base'
                            aria-label='Previous page'
                          >
                            {text.previous}
                          </button>

                          <div className='flex gap-2'>
                            {Array.from(
                              { length: Math.min(totalPages, 7) },
                              (_, i) => {
                                let page;
                                if (totalPages <= 7) {
                                  page = i + 1;
                                } else if (currentPage <= 4) {
                                  page = i + 1;
                                } else if (currentPage >= totalPages - 3) {
                                  page = totalPages - 6 + i;
                                } else {
                                  page = currentPage - 3 + i;
                                }
                                return (
                                  <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 md:w-11 md:h-11 rounded-lg font-bold transition-all duration-150 text-sm md:text-base border-2 border-neutral-900 ${
                                      currentPage === page
                                        ? 'bg-primary text-white shadow-[3px_3px_0px_#1a1a1a]'
                                        : 'bg-white text-neutral-900 shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                                    }`}
                                    aria-label={`Page ${page}`}
                                    aria-current={
                                      currentPage === page ? 'page' : undefined
                                    }
                                  >
                                    {page}
                                  </button>
                                );
                              }
                            )}
                          </div>

                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className='px-4 py-2 rounded-lg border-2 border-neutral-900 bg-primary text-white font-bold shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 text-sm md:text-base'
                            aria-label='Next page'
                          >
                            {text.next}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
