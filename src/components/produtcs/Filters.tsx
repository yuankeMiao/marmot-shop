import React from "react";
import { CATEGORIES } from "../../misc/constants";
import { CategoryType, FilterType } from "../../misc/productTypes";

function Filters({
  filter,
  setFilter,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) {

  const handleCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value as CategoryType;
    setFilter((prev) => ({ ...prev, category: cat }));
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "" | "asc" | "desc";
    setFilter((prev) => ({ ...prev, sortByPrice: value }));
  };

  const handleReset = () => {
    setFilter({ category: "", sortByPrice: "" });
  };

  return (
    <div className="sidebar">
      <div className="h-full mx-auto px-4 py-4 overflow-y-auto ">
        <button className="btn-primary mb-4 max-w-36" onClick={handleReset}>
          Reset All
        </button>
        <ul className="*:py-4 flex gap-8 around lg:block">
          <li className="flex-1">
            <label htmlFor="category-select" className="font-bold">
              Choose Category
            </label>
            <select
              className="my-2 w-full text-sm rounded-lg border border-gray-300 dark:bg-gray-700"
              name="category"
              id="category-select"
              onChange={handleCatChange}
              value={filter.category}
            >
              <option value="">--All Products--</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(cat[0], cat[0].toUpperCase())}
                </option>
              ))}
            </select>
          </li>

          <li className="flex-1">
            <label htmlFor="sortBy" className="font-bold">
              Sort By
            </label>
            <select
              className="my-2 w-full text-sm rounded-lg border border-gray-300 dark:bg-gray-700"
              name="sortBy"
              id="sortBy"
              onChange={handleSort}
              value={filter.sortByPrice}
            >
              <option value="">--default--</option>
              <option value="asc">Price from low to high</option>
              <option value="desc">Price from high to low</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filters;
