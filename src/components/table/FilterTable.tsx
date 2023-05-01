const FilterTable = (props: {
  filter: string;
  setFilter: (filter: any) => any;
}) => {
  return (
    <div>
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 font-thin text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-2 focus:outline-blue-500 focus:ring-1 focus:ring-blue-300"
          value={props.filter || ""}
          onChange={(e) => props.setFilter(e.target.value)}
          placeholder="Search"
          required
        />
      </div>
    </div>
  );
};

export default FilterTable;
