import { useContext, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import BooksCard from './BooksCrad';
import { SearchContext } from '../../context/SearchProvider';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortQuery: string;
  setSortQuery: (query: string) => void;
}

const BookContainer = () => {
  const { sortQuery, setSortQuery } = useContext(SearchContext) as SearchContextType;
  const [sortOrder, setSortOrder] = useState<string>(sortQuery || 'relevance');

  const items: MenuProps['items'] = [
    {
      label: 'Sort by relevance',
      key: 'relevance',
      onClick: () => handleSort('relevance'),
    },
    {
      label: 'Price: High to Low',
      key: 'highToLow',
      onClick: () => handleSort('highToLow'),
    },
    {
      label: 'Price: Low to High',
      key: 'lowToHigh',
      onClick: () => handleSort('lowToHigh'),
    },
  ];

  const handleSort = (sortKey: string) => {
    setSortOrder(sortKey);
    setSortQuery(sortKey); 
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <p className="text-lg md:text-2xl font-semibold">Books</p>
        </div>
        <div className="cursor-pointer border-2 border-black-600 w-40 flex items-center justify-center py-1 px-2">
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className="flex justify-between items-center w-full">
                <p className="text-xs font-semibold">
                  {sortOrder === 'highToLow'
                    ? 'Price: High to Low'
                    : sortOrder === 'lowToHigh'
                    ? 'Price: Low to High'
                    : 'Sort by relevance'}
                </p>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="mt-4 min-h-[70vh]">
        <BooksCard />
      </div>
    </div>
  );
};

export default BookContainer;
