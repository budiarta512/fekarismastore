import React from "react";

const FilterDateTable = () => {
  return (
    <div>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
      >
        <option value={"month"}>Bulan Ini</option>
        <option value="day">Hari Ini</option>
        <option value="year">Tahun Ini</option>
      </select>
    </div>
  );
};

export default FilterDateTable;
