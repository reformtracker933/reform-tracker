'use client';

import { Search } from 'lucide-react';

interface PageText {
  secondTitle: string;
  searchBarPlaceHolder: string;
  sector: string;
  writer: string;
  date: string;
  proposalName: string;
  commission: string;
  category: string;
  BNP: string;
  NCP: string;
  Jamat: string;
  noProposalsFound: string;
}

export interface PartyStance {
  text: string;
  color: string;
  borderColor: string;
}

export interface PartyColumn {
  key: string;
  name: string;
}

export interface TableDataRow {
  proposalName: string;
  commission: string;
  category: string;
  color: string;
  [key: string]: string | PartyStance; // Dynamic party columns
}

interface TableSectionProps {
  pageText: PageText;
  tableData: TableDataRow[];
  partyColumns: PartyColumn[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedCommission: string;
  setSelectedCommission: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  categories: { id: string; name: string }[];
  commissions: { id: string; name: string }[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  isLoading?: boolean;
}

const TableSection = ({
  pageText,
  tableData,
  partyColumns,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedCommission,
  setSelectedCommission,
  selectedDate,
  setSelectedDate,
  categories,
  commissions,
  currentPage,
  setCurrentPage,
  totalPages,
  isLoading = false,
}: TableSectionProps) => {
  return (
    <section className='w-full bg-neutral-100 py-6 md:py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-center text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-6 md:mb-8'>
          {pageText.secondTitle}
        </h2>

        <div className='mx-auto max-w-4xl mb-6 md:mb-8'>
          <div className='flex flex-col md:flex-row gap-3 md:gap-4'>
            <div className='relative flex-1'>
              <input
                type='text'
                placeholder={pageText.searchBarPlaceHolder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full h-12 md:h-14 pl-12 md:pl-14 pr-4 rounded-xl border-2 border-neutral-900 bg-white text-sm md:text-base font-bold shadow-[3px_3px_0px_#1a1a1a] focus:shadow-[4px_4px_0px_#e63946] focus:outline-none transition-all duration-150'
              />
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-neutral-900' />
            </div>

            <div className='flex gap-3 md:gap-4'>
              <div className='relative flex-1 md:w-36'>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='appearance-none text-center h-12 md:h-14 rounded-xl border-2 border-neutral-900 w-full text-sm md:text-base font-bold bg-white shadow-[3px_3px_0px_#1a1a1a] focus:shadow-[4px_4px_0px_#e63946] focus:outline-none pr-8 cursor-pointer transition-all duration-150'
                >
                  <option value='all'>{pageText.category}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <svg
                  className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-900 pointer-events-none'
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
              </div>

              <div className='relative flex-1 md:w-36'>
                <select
                  value={selectedCommission}
                  onChange={(e) => setSelectedCommission(e.target.value)}
                  className='appearance-none text-center h-12 md:h-14 rounded-xl border-2 border-neutral-900 w-full text-sm md:text-base font-bold bg-white shadow-[3px_3px_0px_#1a1a1a] focus:shadow-[4px_4px_0px_#e63946] focus:outline-none pr-8 cursor-pointer transition-all duration-150'
                >
                  <option value='all'>{pageText.commission}</option>
                  {commissions.map((commission) => (
                    <option key={commission.id} value={commission.id}>
                      {commission.name}
                    </option>
                  ))}
                </select>
                <svg
                  className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-900 pointer-events-none'
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
              </div>
            </div>

            <div className='relative w-full md:w-36'>
              <input
                type='date'
                placeholder={pageText.date}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className='h-12 md:h-14 w-full px-4 rounded-xl border-2 border-neutral-900 bg-white text-neutral-900 font-bold text-center text-sm md:text-base shadow-[3px_3px_0px_#1a1a1a] focus:shadow-[4px_4px_0px_#e63946] focus:outline-none cursor-pointer transition-all duration-150 [&::-webkit-calendar-picker-indicator]:opacity-100'
              />
            </div>
          </div>
        </div>

        <div className='overflow-x-auto rounded-xl max-w-7xl mx-auto border-2 border-neutral-900 shadow-[6px_6px_0px_#1a1a1a]'>
          {isLoading ? (
            <div className='bg-white p-8'>
              <div className='space-y-4'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className='h-20 bg-neutral-200 rounded-xl border-2 border-neutral-900 animate-pulse'
                  />
                ))}
              </div>
            </div>
          ) : tableData.length === 0 ? (
            <div className='bg-white p-12 text-center'>
              <p className='text-lg font-bold text-neutral-700'>
                {pageText.noProposalsFound}
              </p>
            </div>
          ) : (
            <table className='w-full bg-white min-w-[800px]'>
              <thead className='bg-neutral-100'>
                <tr className='h-16 md:h-19 text-neutral-900 font-bold text-base md:text-lg lg:text-xl text-left border-b-2 border-neutral-900'>
                  <th className='py-3 md:py-4 first:rounded-tl-lg font-bold pl-4 md:pl-8'>
                    {pageText.proposalName}
                  </th>
                  <th className='py-3 md:py-4 font-bold pl-3 md:pl-4'>
                    {pageText.commission}
                  </th>
                  <th className='py-3 md:py-4 font-bold pl-3 md:pl-6'>
                    {pageText.category}
                  </th>
                  {partyColumns.map((party) => (
                    <th
                      key={party.key}
                      className='py-3 md:py-4 font-bold pl-4 md:pl-8'
                    >
                      {party.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => {
                  const rowData = row as Record<string, string | PartyStance>;
                  return (
                    <tr
                      key={index}
                      className='border-b-2 border-neutral-300 h-20 md:h-24 text-sm md:text-base text-neutral-800 text-left font-semibold hover:bg-neutral-50 transition-colors'
                    >
                      <td className='py-3 md:py-4 font-bold text-base md:text-lg lg:text-xl pl-4 md:pl-8'>
                        {row.proposalName}
                      </td>
                      <td className='py-3 md:py-4 pl-3 md:pl-4 text-xs md:text-sm lg:text-base'>
                        {row.commission}
                      </td>
                      <td className='py-3 md:py-4 pl-3 md:pl-4'>
                        <span
                          className='inline-flex items-center px-3 md:px-4 py-1 rounded-lg text-white text-xs md:text-sm font-bold border-2 border-neutral-900'
                          style={{ backgroundColor: row.color as string }}
                        >
                          {row.category}
                        </span>
                      </td>
                      {partyColumns.map((party) => {
                        const stance = rowData[party.key] as PartyStance;
                        return (
                          <td
                            key={party.key}
                            className='py-3 md:py-4 pl-3 md:pl-4'
                          >
                            <span className='inline-flex items-center px-3 md:px-4 py-1 rounded-lg border-2 border-neutral-900 gap-2 text-xs md:text-sm font-bold shadow-[2px_2px_0px_#1a1a1a]'>
                              <div
                                className='w-3 h-3 md:w-4 md:h-4 rounded-sm border border-neutral-900'
                                style={{ backgroundColor: stance.color }}
                              ></div>
                              {stance.text}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && !isLoading && (
          <div className='flex justify-center items-center gap-3 mt-6 md:mt-8'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className='px-5 py-2 rounded-lg bg-white border-2 border-neutral-900 font-bold shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150'
            >
              Previous
            </button>
            <span className='px-4 py-2 text-neutral-900 font-bold border-2 border-neutral-900 rounded-lg bg-white'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className='px-5 py-2 rounded-lg bg-primary text-white border-2 border-neutral-900 font-bold shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TableSection;
