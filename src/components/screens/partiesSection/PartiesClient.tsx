'use client';

import { useLocale } from '@/context/LocaleContext';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import StatisticsSection from '@/components/screens/partiesSection/StatisticsSection';
import TableSection, {
  type PartyColumn,
  type TableDataRow,
} from '@/components/screens/partiesSection/TableSection';
import BarChartSection from '@/components/screens/partiesSection/BarChartSection';
import { PoliticalParty, Proposal } from '@/types/sanity';
import { getColorWithFallback } from '@/lib/utils/colorMapper';
import { useDebounce } from '@/hooks/useDebounce';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PartiesClientProps {
  parties: PoliticalParty[];
}

export default function PartiesClient({ parties }: PartiesClientProps) {
  const { getTranslation, locale } = useLocale();
  const pageText = getTranslation('parties');

  const [currentDoughnutPage, setCurrentDoughnutPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCommission, setSelectedCommission] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [proposalsData, setProposalsData] = useState<Proposal[]>([]);
  const [totalProposalPages, setTotalProposalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [commissions, setCommissions] = useState<
    { id: string; name: string }[]
  >([]);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Fetch taxonomies on mount
  useEffect(() => {
    const fetchTaxonomies = async () => {
      try {
        const [categoriesRes, commissionsRes] = await Promise.all([
          fetch('/api/taxonomies?type=categories'),
          fetch('/api/taxonomies?type=commissions'),
        ]);

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData.items || []);
        }

        if (commissionsRes.ok) {
          const commissionsData = await commissionsRes.json();
          setCommissions(commissionsData.items || []);
        }
      } catch (error) {
        console.error('Error fetching taxonomies:', error);
      }
    };

    fetchTaxonomies();
  }, []);

  // Fetch proposals from API
  useEffect(() => {
    const fetchProposals = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '10',
          language: locale,
        });

        if (debouncedSearch) {
          params.append('search', debouncedSearch);
        }
        if (
          selectedCategory !== 'all' &&
          selectedCategory !== pageText.category
        ) {
          params.append('category', selectedCategory);
        }
        if (
          selectedCommission !== 'all' &&
          selectedCommission !== pageText.commission
        ) {
          params.append('commission', selectedCommission);
        }
        if (selectedDate) {
          params.append('date', selectedDate);
        }

        const response = await fetch(`/api/proposals?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch proposals');

        const data = await response.json();
        setProposalsData(data.items);
        setTotalProposalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposals();
  }, [
    currentPage,
    debouncedSearch,
    selectedCategory,
    selectedCommission,
    selectedDate,
    locale,
    pageText.category,
    pageText.commission,
  ]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, selectedCommission, selectedDate]);

  const defaultDoughnutData = [
    {
      id: '1',
      name: pageText.BNP,
      data: {
        labels: ['Running', 'Completed'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#FFA726', '#4CAF50'],
            borderWidth: 0,
          },
        ],
      },
      stats: { approved: 0, rejected: 0 },
    },
    {
      id: '2',
      name: pageText.NCP,
      data: {
        labels: ['Running', 'Completed'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#FFA726', '#4CAF50'],
            borderWidth: 0,
          },
        ],
      },
      stats: { approved: 0, rejected: 0 },
    },
    {
      id: '3',
      name: 'Jamat',
      data: {
        labels: ['Running', 'Completed'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#FFA726', '#4CAF50'],
            borderWidth: 0,
          },
        ],
      },
      stats: { approved: 0, rejected: 0 },
    },
    {
      id: '4',
      name: 'Party 4',
      data: {
        labels: ['Running', 'Completed'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#FFA726', '#4CAF50'],
            borderWidth: 0,
          },
        ],
      },
      stats: { approved: 0, rejected: 0 },
    },
  ];

  const doughnutData =
    parties.length > 0
      ? parties.map((party) => {
          // TODO: Statistics removed from schema - implement when data source is available
          const completedCount = 0;
          const pendingCount = 0;
          const approvedCount = 0;
          const rejectedCount = 0;

          return {
            id: party._id,
            name: party.name,
            data: {
              labels: ['Running', 'Completed'],
              datasets: [
                {
                  data: [pendingCount, completedCount],
                  backgroundColor: ['#FFA726', '#4CAF50'],
                  borderWidth: 0,
                },
              ],
            },
            stats: { approved: approvedCount, rejected: rejectedCount },
          };
        })
      : defaultDoughnutData;

  const itemsPerPage = 4;
  const totalDoughnuts = doughnutData.length;
  const totalPages = Math.ceil(totalDoughnuts / itemsPerPage);
  const visibleDoughnuts = doughnutData.slice(
    currentDoughnutPage * itemsPerPage,
    (currentDoughnutPage + 1) * itemsPerPage
  );

  const handleNextDoughnuts = () => {
    if (currentDoughnutPage < totalPages - 1) {
      setCurrentDoughnutPage((prev) => prev + 1);
    }
  };

  const handlePrevDoughnuts = () => {
    if (currentDoughnutPage > 0) {
      setCurrentDoughnutPage((prev) => prev - 1);
    }
  };

  const getStanceStyle = (stanceText: string) => {
    if (stanceText === pageText.support || stanceText === 'সমর্থন') {
      return {
        text: stanceText,
        color: 'var(--color-success)',
        borderColor: 'var(--color-success)',
      };
    } else if (stanceText === pageText.against || stanceText === 'বিরোধিতা') {
      return { text: stanceText, color: '#e83231', borderColor: '#e83231' };
    } else {
      return { text: stanceText, color: '#FFA726', borderColor: '#FFA726' };
    }
  };

  // Get party slugs dynamically from backend data
  const partyColumns: PartyColumn[] =
    parties.length > 0
      ? parties.slice(0, 3).map((party) => ({
          key: party._id,
          name: party.name,
        }))
      : [
          { key: 'bnp', name: pageText.BNP },
          { key: 'ncp', name: pageText.NCP },
          { key: 'jamat', name: pageText.Jamat },
        ];

  const tableData: TableDataRow[] = proposalsData.map((proposal, index) => {
    const partyPositions: Record<string, string> = {};

    proposal.partyPositions?.forEach((position) => {
      const partyKey =
        position.party.slug?.current ||
        position.party.name.toLowerCase().replace(/\s+/g, '-');
      const stance = position.stance.toLowerCase();

      let displayValue = '-';
      if (stance === 'support') {
        displayValue = pageText.support;
      } else if (stance === 'against') {
        displayValue = pageText.against;
      } else if (stance === 'neutral') {
        displayValue = pageText.neutral;
      }

      partyPositions[partyKey] = displayValue;
    });

    const rowData: TableDataRow = {
      proposalName: proposal.title,
      commission: proposal.commission?.name || '-',
      category: proposal.category?.title || '-',
      color: getColorWithFallback(proposal.category?.color, undefined, index),
    };

    // Dynamically add party columns
    partyColumns.forEach(({ key }) => {
      rowData[key] = getStanceStyle(partyPositions[key] || '-');
    });

    return rowData;
  });

  const defaultBarChartLabels = [
    pageText.BNP,
    pageText.NCP,
    pageText.Jamat,
    'Party 4',
    'Party 5',
    'Party 6',
  ];

  const barChartData = {
    labels:
      parties.length > 0
        ? parties.map((party) => party.name).slice(0, 6)
        : defaultBarChartLabels,
    datasets: [
      {
        label: pageText.acceptable,
        data:
          parties.length > 0
            ? parties
                // TODO: Statistics removed from schema - implement when data source is available
                .map(() => 0)
                .slice(0, 6)
            : [0, 0, 0, 0, 0, 0],
        backgroundColor: '#4a7ec9',
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
      },
      {
        label: pageText.unacceptable,
        data:
          parties.length > 0
            ? parties
                // TODO: Statistics removed from schema - implement when data source is available
                .map(() => 0)
                .slice(0, 6)
            : [0, 0, 0, 0, 0, 0],
        backgroundColor: '#e83231',
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className='w-full space-y-8 md:space-y-12 pt-24 md:pt-32 px-4 md:px-6 lg:px-8'>
      <StatisticsSection
        doughnutData={doughnutData}
        visibleDoughnuts={visibleDoughnuts}
        currentDoughnutPage={currentDoughnutPage}
        totalPages={totalPages}
        pageText={pageText}
        handleNextDoughnuts={handleNextDoughnuts}
        handlePrevDoughnuts={handlePrevDoughnuts}
      />

      <TableSection
        pageText={pageText}
        tableData={tableData}
        partyColumns={partyColumns}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCommission={selectedCommission}
        setSelectedCommission={setSelectedCommission}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        categories={categories}
        commissions={commissions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalProposalPages}
        isLoading={isLoading}
      />

      <BarChartSection barChartData={barChartData} pageText={pageText} />
    </div>
  );
}
