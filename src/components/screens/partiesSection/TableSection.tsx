"use client";

import { Search } from "lucide-react";

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
    <section className="w-full bg-white py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-5xl lg:text-6xl font-semibold text-primary/900 mb-6 md:mb-8">
          {pageText.secondTitle}
        </h2>

        <div className="mx-auto max-w-4xl mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={pageText.searchBarPlaceHolder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 md:h-14 pl-10 md:pl-12 pr-4 rounded-full border border-neutral-300 text-sm md:text-base"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-neutral-400" />
            </div>

            <div className="flex gap-3 md:gap-4">
              <div className="relative flex-1 md:w-32">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none text-center h-12 md:h-14 rounded-full border border-neutral-300 w-full text-sm md:text-base pr-8 bg-white"
                >
                  <option value="all">{pageText.category}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              <div className="relative flex-1 md:w-32">
                <select
                  value={selectedCommission}
                  onChange={(e) => setSelectedCommission(e.target.value)}
                  className="appearance-none text-center h-12 md:h-14 rounded-full border border-neutral-300 w-full text-sm md:text-base pr-8 bg-white"
                >
                  <option value="all">{pageText.commission}</option>
                  {commissions.map((commission) => (
                    <option key={commission.id} value={commission.id}>
                      {commission.name}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="relative w-full md:w-32">
              <input
                type="date"
                placeholder={pageText.date}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-12 md:h-14 w-full px-4 rounded-full border border-neutral-400 bg-white text-neutral-600 text-center text-sm md:text-base [&::-webkit-calendar-picker-indicator]:opacity-100"
              />
            </div>

            {/* <button className='h-12 md:h-14 px-6 md:px-8 rounded-full bg-secondary text-white font-semibold text-sm md:text-base hover:bg-secondary/90 transition-colors'>
              {pageText.searchBarPlaceHolder}
            </button> */}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl md:rounded-4xl max-w-7xl mx-auto shadow-2xl">
          {isLoading ? (
            <div className="bg-white p-8">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-neutral-200 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            </div>
          ) : tableData.length === 0 ? (
            <div className="bg-white p-12 text-center">
              <p className="text-lg text-neutral-600">
                {pageText.noProposalsFound}
              </p>
            </div>
          ) : (
            <table className="w-full bg-primary-30 min-w-[800px]">
              <thead className="bg-white">
                <tr className="h-16 md:h-19 text-primary font-semibold text-base md:text-lg lg:text-xl text-left">
                  <th className="py-3 md:py-4 first:rounded-tl-lg font-semibold pl-4 md:pl-8">
                    {pageText.proposalName}
                  </th>
                  <th className="py-3 md:py-4 font-semibold pl-3 md:pl-4">
                    {pageText.commission}
                  </th>
                  <th className="py-3 md:py-4 font-semibold pl-3 md:pl-6">
                    {pageText.category}
                  </th>
                  {partyColumns.map((party) => (
                    <th
                      key={party.key}
                      className="py-3 md:py-4 font-semibold pl-4 md:pl-8"
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
                      className="border-b border-neutral-300 h-20 md:h-24 text-sm md:text-base text-neutral-800 text-left font-medium"
                    >
                      <td className="py-3 md:py-4 font-semibold text-base md:text-lg lg:text-xl pl-4 md:pl-8">
                        {row.proposalName}
                      </td>
                      <td className="py-3 md:py-4 pl-3 md:pl-4 text-xs md:text-sm lg:text-base">
                        {row.commission}
                      </td>
                      <td className="py-3 md:py-4 pl-3 md:pl-4">
                        <span
                          className="inline-flex items-center px-2 md:px-4 py-1 rounded-full text-white text-xs md:text-sm"
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
                            className="py-3 md:py-4 pl-3 md:pl-4"
                          >
                            <span
                              className="inline-flex items-center px-2 md:px-4 py-1 rounded-full border gap-1 text-xs md:text-sm"
                              style={{ borderColor: stance.borderColor }}
                            >
                              <div
                                className="w-3 h-3 md:w-4 md:h-4 rounded-full"
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
          <div className="flex justify-center items-center gap-2 mt-6 md:mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-neutral-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
