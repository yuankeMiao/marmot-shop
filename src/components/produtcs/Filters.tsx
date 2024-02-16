import React from "react";
import { CATEGORIES } from "../../misc/constants";
import { FilterType } from "../../misc/productTypes";

function Filters({setFilter} : {setFilter: React.Dispatch<React.SetStateAction<FilterType>>}) {

  const handleCatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cat = e.target.value;
    if (e.target.checked) {
      setFilter((prev) => ({ ...prev, categories: [...prev.categories, cat] }));
    }
    if (!e.target.checked) {
      setFilter((prev) => ({
        ...prev,
        categories: prev.categories.filter((oldCat) => oldCat !== cat),
      }));
    }
  }

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "" | "asc" | "desc"; 
    setFilter((prev) => ({ ...prev, sortByPrice: value }));
  }


  return (
    <div className="lg:absolute w-full mt-8 top-0 left-0 rounded-lg group bg-gray-100 dark:text-gray-100 dark:bg-cyan-900 ">
      <div className="h-full px-4 py-4 overflow-y-auto ">
        <ul className="*:py-4">
          <li className="border-b-2">
            <span className="font-bold">By Category</span>
            <ul className="py-2">
              {CATEGORIES.map((cat) => (
                <li key={cat} className="group/item px-2 flex items-center gap-2">
                  <input type="checkbox" id={cat} name={cat} value={cat} onChange={handleCatChange} />
                  <label htmlFor={cat}>
                    {cat.replace(cat[0], cat[0].toUpperCase())}
                  </label>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <label htmlFor="sortBy" className="font-bold">Sort By</label>
            <select className="my-2 text-sm rounded-lg border border-gray-300" name="sortBy" id="sortBy" onChange={handleSort}>
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
