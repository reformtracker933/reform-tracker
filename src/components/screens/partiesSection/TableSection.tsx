"use client";

import { Search, Clock } from "lucide-react";

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
}

interface TableDataRow {
  proposalName: string;
  commission: string;
  category: string;
  color: string;
  bnp: string;
  ncp: string;
  jamat: string;
}

interface TableSectionProps {
  pageText: PageText;
  tableData: TableDataRow[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedWriter: string;
  setSelectedWriter: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
}

const TableSection = ({
  pageText,
  tableData,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedWriter,
  setSelectedWriter,
  selectedDate,
  setSelectedDate,
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
                  <option value="all">{pageText.sector}</option>
                  <option value="economic">Economic</option>
                  <option value="social">Social</option>
                  <option value="political">Political</option>
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
                  value={selectedWriter}
                  onChange={(e) => setSelectedWriter(e.target.value)}
                  className="appearance-none text-center h-12 md:h-14 rounded-full border border-neutral-300 w-full text-sm md:text-base pr-8 bg-white"
                >
                  <option value="all">{pageText.writer}</option>
                  <option value="writer1">Writer 1</option>
                  <option value="writer2">Writer 2</option>
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
                className="h-12 md:h-14 w-full px-4 pr-10 rounded-full border border-neutral-300 text-sm md:text-base text-center bg-white"
              />
              <Clock className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-neutral-400 pointer-events-none" />
            </div>

            <button className="h-12 md:h-14 px-6 md:px-8 rounded-full bg-secondary text-white font-semibold text-sm md:text-base hover:bg-secondary/90 transition-colors">
              {pageText.searchBarPlaceHolder}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl md:rounded-4xl max-w-7xl mx-auto shadow-2xl">
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
                <th className="py-3 md:py-4 font-semibold pl-4 md:pl-8">
                  {pageText.BNP}
                </th>
                <th className="py-3 md:py-4 font-semibold pl-4 md:pl-8">
                  {pageText.NCP}
                </th>
                <th className="py-3 md:py-4 font-semibold pl-4 md:pl-8">
                  {pageText.Jamat}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
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
                      style={{ backgroundColor: row.color }}
                    >
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3 md:py-4 pl-3 md:pl-4">
                    <span className="inline-flex items-center px-2 md:px-4 py-1 rounded-full border border-success gap-1 text-xs md:text-sm">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-success rounded-full"></div>
                      {row.bnp}
                    </span>
                  </td>
                  <td className="py-3 md:py-4 pl-3 md:pl-4">
                    <span className="inline-flex items-center px-2 md:px-4 py-1 rounded-full border border-primary/900 gap-1 text-xs md:text-sm">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-primary/900 rounded-full"></div>
                      {row.ncp}
                    </span>
                  </td>
                  <td className="py-3 md:py-4 pl-3 md:pl-4">
                    <span className="inline-flex items-center px-2 md:px-4 py-1 rounded-full border border-primary/900 gap-1 text-xs md:text-sm">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-primary/900 rounded-full"></div>
                      {row.jamat}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TableSection;
