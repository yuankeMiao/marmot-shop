import React, { useState, useEffect } from "react";
import { ProductQueryOptionsType } from "../../misc/productTypes";
import { useGetAllCategoriesQuery } from "../../redux/slices/categoryApi";

function Filters({
  filter,
  setFilter,
}: {
  filter: ProductQueryOptionsType;
  setFilter: React.Dispatch<React.SetStateAction<ProductQueryOptionsType>>;
}) {
  const { data: categories } = useGetAllCategoriesQuery(null);

  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [inStock, setInStock] = useState(false);

  useEffect(() => {
    if (filter.sortBy && filter.sortOrder) {
      const sortValue = `${filter.sortBy}:${filter.sortOrder}`;
      switch (sortValue) {
        case "Price:Asc":
          setSort("1");
          break;
        case "Price:Desc":
          setSort("2");
          break;
        case "Title:Asc":
          setSort("3");
          break;
        case "Title:Desc":
          setSort("4");
          break;
        case "Created_Date:Desc":
          setSort("5");
          break;
        default:
          setSort("");
          break;
      }
    } else {
      setSort("");
    }

    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
      if (filter.minPrice === undefined && filter.maxPrice === 20) {
        setPriceRange("1");
      } else if (filter.minPrice === 20 && filter.maxPrice === 50) {
        setPriceRange("2");
      } else if (filter.minPrice === 50 && filter.maxPrice === 100) {
        setPriceRange("3");
      } else if (filter.minPrice === 100 && filter.maxPrice === 200) {
        setPriceRange("4");
      } else if (filter.minPrice === 200 && filter.maxPrice === undefined) {
        setPriceRange("5");
      } else {
        setPriceRange("");
      }
    } else {
      setPriceRange("");
    }

    setInStock(!!filter.inStock);
  }, [filter]);

  const handleCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value;
    setFilter((prev) => ({ ...prev, categoryId: cat }));
  };

  const handlePriceRange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPriceRange(value);
    switch (value) {
      case "1":
        setFilter((prev) => ({ ...prev, minPrice: undefined, maxPrice: 20 }));
        break;
      case "2":
        setFilter((prev) => ({ ...prev, minPrice: 20, maxPrice: 50 }));
        break;
      case "3":
        setFilter((prev) => ({ ...prev, minPrice: 50, maxPrice: 100 }));
        break;
      case "4":
        setFilter((prev) => ({ ...prev, minPrice: 100, maxPrice: 200 }));
        break;
      case "5":
        setFilter((prev) => ({ ...prev, minPrice: 200, maxPrice: undefined }));
        break;
      default:
        setFilter((prev) => ({
          ...prev,
          minPrice: undefined,
          maxPrice: undefined,
        }));
        break;
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSort(value);
    switch (value) {
      case "1":
        setFilter((prev) => ({ ...prev, sortBy: "Price", sortOrder: "Asc" }));
        break;
      case "2":
        setFilter((prev) => ({ ...prev, sortBy: "Price", sortOrder: "Desc" }));
        break;
      case "3":
        setFilter((prev) => ({ ...prev, sortBy: "Title", sortOrder: "Asc" }));
        break;
      case "4":
        setFilter((prev) => ({ ...prev, sortBy: "Title", sortOrder: "Desc" }));
        break;
      case "5":
        setFilter((prev) => ({
          ...prev,
          sortBy: "Created_Date",
          sortOrder: "Desc",
        }));
        break;
      default:
        setFilter((prev) => ({
          ...prev,
          sortBy: undefined,
          sortOrder: undefined,
        }));
        break;
    }
  };

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setInStock(checked);
    setFilter((prev) => ({ ...prev, inStock: checked }));
  };

  const handleReset = () => {
    setFilter({});
    setSort("");
    setPriceRange("");
    setInStock(false);
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
              value={filter.categoryId || ""}
            >
              <option value="">--All Products--</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name.replace(cat.name[0], cat.name[0].toUpperCase())}
                </option>
              ))}
            </select>
          </li>

          <li className="flex-1">
            <label htmlFor="price-range" className="font-bold">
              Price Range
            </label>
            <select
              className="my-2 w-full text-sm rounded-lg border border-gray-300 dark:bg-gray-700"
              name="price-range"
              id="price-range"
              onChange={handlePriceRange}
              value={priceRange}
            >
              <option value="">--default--</option>
              <option value="1">0 € - 20 € </option>
              <option value="2">20 € - 50 € </option>
              <option value="3">50 € - 100 € </option>
              <option value="4">100 € - 200 € </option>
              <option value="5">over 200 € </option>
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
              value={sort}
            >
              <option value="">--default--</option>
              <option value="1">Price: Low to high</option>
              <option value="2">Price: High to low</option>
              <option value="3">A - Z</option>
              <option value="4">Z - A</option>
              <option value="5">Latest</option>
            </select>
          </li>

          <li className="flex-1 flex justify-start items-center gap-2">
            <input
              type="checkbox"
              name="inStock"
              id="inStock"
              onChange={handleInStockChange}
              checked={inStock}
            />
            <label htmlFor="inStock">
              Available Now
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filters;
