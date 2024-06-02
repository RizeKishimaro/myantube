import React, { useState } from 'react';

const fakeData = [
  'Apple',
  'Banana',
  'Orange',
  'Mango',
  'Grapes',
  'Pineapple',
  'Strawberry',
  'Blueberry',
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    const filtered = fakeData.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <ul className="list-disc pl-5">
        {filteredData.map((item, index) => (
          <li key={index} className="py-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
