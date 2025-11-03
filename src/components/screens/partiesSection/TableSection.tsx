"use client";

import { Search, Clock } from "lucide-react";

interface TableSectionProps {
  pageText: any;
  tableData: any[];
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
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-6xl font-semibold text-primary/900 mb-8">
          {pageText.secondTitle}
        </h2>

        <div className="mx-auto max-w-4xl h-14 mb-6">
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={pageText.searchBarPlaceHolder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-full border border-gray-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-center h-14 rounded-full border border-gray-300 w-32"
            >
              <option value="all">{pageText.sector}</option>
              <option value="economic">Economic</option>
              <option value="social">Social</option>
              <option value="political">Political</option>
            </select>

            <select
              value={selectedWriter}
              onChange={(e) => setSelectedWriter(e.target.value)}
              className="text-center h-14 rounded-full border border-gray-300 w-32"
            >
              <option value="all">{pageText.writer}</option>
              <option value="writer1">Writer 1</option>
              <option value="writer2">Writer 2</option>
            </select>

            <div className="relative w-32">
              <input
                type="text"
                placeholder={"    " + pageText.date}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-14 w-full px-4 rounded-full border border-gray-300"
              />
              {selectedDate === "" && (
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  <Clock />
                </div>
              )}
            </div>

            <button className="h-14 px-8 rounded-full bg-secondary text-white font-semibold">
              {pageText.searchBarPlaceHolder}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-4xl max-w-7xl mx-auto shadow-2xl">
          <table className="w-full bg-primary-30">
            <thead className="bg-white">
              <tr className="h-19 text-primary font-semibold text-xl text-left">
                <th className="py-4 first:rounded-tl-lg font-semibold pl-8">
                  {pageText.proposalName}
                </th>
                <th className="py-4 font-semibold pl-4">
                  {pageText.commission}
                </th>
                <th className="py-4 font-semibold pl-6">{pageText.category}</th>
                <th className="py-4 font-semibold pl-8">{pageText.BNP}</th>
                <th className="py-4 font-semibold pl-8">{pageText.NCP}</th>
                <th className="py-4 font-semibold pl-8">{pageText.Jamat}</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-300 h-24 text-base text-neutral-800 text-left font-medium"
                >
                  <td className="py-4 font-semibold text-xl pl-8">
                    {row.proposalName}
                  </td>
                  <td className="py-4 pl-4">{row.commission}</td>
                  <td className="py-4 pl-4">
                    <span
                      className="inline-flex items-center px-4 py-1 rounded-full text-white"
                      style={{ backgroundColor: row.color }}
                    >
                      {row.category}
                    </span>
                  </td>
                  <td className="py-4 pl-4">
                    <span className="inline-flex items-center px-4 py-1 rounded-full border border-green-500 gap-1">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      {row.bnp}
                    </span>
                  </td>
                  <td className="py-4 pl-4">
                    <span className="inline-flex items-center px-4 py-1 rounded-full border border-primary/900 gap-1">
                      <div className="w-4 h-4 bg-primary/900 rounded-full"></div>
                      {row.ncp}
                    </span>
                  </td>
                  <td className="py-4 pl-4">
                    <span className="inline-flex items-center px-4 py-1 rounded-full border border-primary/900 gap-1">
                      <div className="w-4 h-4 bg-primary/900 rounded-full"></div>
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
