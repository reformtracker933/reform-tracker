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
    <div className='min-h-screen'>
      <div className='relative bg-linear-to-br from-primary to-secondary text-white'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[4rem_4rem]'></div>
        <div className='relative max-w-7xl mx-auto px-4 xl:px-0 pt-32 md:pt-36 pb-16 md:pb-20'>
          <div className='max-w-4xl'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight'>
              {text.title}
            </h1>
            <p className='text-base md:text-lg lg:text-xl text-white/90'>
              {text.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 xl:px-0  py-12 pt-6 md:pt-8 md:py-16'>
        {/* Search Bar on Top */}
        <div className='mb-6 md:mb-8'>
          <div className='bg-white rounded-lg shadow-sm p-3 md:p-4'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={text.searchPlaceholder}
              className='w-full px-4 py-3 md:py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8'>
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-sm p-4 md:p-6 sticky top-24'>
              <div className='flex items-center justify-between mb-4 md:mb-6'>
                <h2 className='text-base md:text-lg font-bold text-gray-900'>
                  {text.filters}
                </h2>
                {(selectedParties.length > 0 || searchQuery) && (
                  <button
                    onClick={handleClearFilters}
                    className='text-xs md:text-sm text-purple-600 hover:text-purple-700 font-medium'
                  >
                    {text.clearFilters}
                  </button>
                )}
              </div>

              {parties.length > 0 && (
                <div>
                  <h3 className='text-sm md:text-base font-semibold text-gray-900 mb-3'>
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
                          className='rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4'
                        />
                        <span className='ml-2.5 md:ml-3 text-xs md:text-sm text-gray-700 group-hover:text-gray-900'>
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
              <div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-6'>
                <div className='flex items-start'>
                  <svg
                    className='w-6 h-6 text-red-600 mr-3 shrink-0'
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
                    <h3 className='text-sm font-medium text-red-800'>
                      {commissionText.sectionTitle} - Error
                    </h3>
                    <p className='text-sm text-red-700 mt-1'>{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className='mt-3 text-sm font-medium text-red-600 hover:text-red-700'
                    >
                      {text.loading.replace('...', '')} - Retry
                    </button>
                  </div>
                </div>
              </div>
            )}

            {loading && !error && (
              <div className='flex flex-col items-center justify-center py-20'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4'></div>
                <p className='text-gray-600'>{text.loading}</p>
              </div>
            )}

            {!loading && !error && (
              <>
                {/* Results Count */}
                {totalResults > 0 && (
                  <div className='mb-4 flex items-center justify-between'>
                    <p className='text-sm text-gray-600'>
                      {text.showingResults.replace(
                        '{count}',
                        totalResults.toString()
                      )}
                    </p>
                    {totalPages > 1 && (
                      <p className='text-sm text-gray-600'>
                        {text.page}: {currentPage}/{totalPages}
                      </p>
                    )}
                  </div>
                )}

                {/* Empty State */}
                {reports.length === 0 ? (
                  <div className='bg-white rounded-lg shadow p-12 text-center'>
                    <svg
                      className='mx-auto h-16 w-16 text-gray-300 mb-4'
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
                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                      {text.noResults}
                    </h3>
                    <p className='text-gray-600 mb-4'>
                      {text.noResultsDescription}
                    </p>
                    {(selectedThemes.length > 0 ||
                      selectedParties.length > 0 ||
                      searchQuery) && (
                      <button
                        onClick={handleClearFilters}
                        className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors'
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
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base'
                            aria-label='Previous page'
                          >
                            {text.previous}
                          </button>

                          <div className='flex gap-1.5'>
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
                                    className={`w-10 h-10 md:w-11 md:h-11 rounded-lg font-medium transition-colors text-sm md:text-base ${
                                      currentPage === page
                                        ? 'bg-primary text-white shadow-md'
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
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
                            className='px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base'
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
