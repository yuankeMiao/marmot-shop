import { useState } from "react";
import { Breadcrumb } from "flowbite-react";

import DisplayProducts from "../components/produtcs/DisplayProducts";
import Filters from "../components/produtcs/Filters";

import type { FilterType } from "../misc/productTypes";
import { Link } from "react-router-dom";


function AllProdutcsPage() {

  // I set categories as a list then I can select multiple categories
  const [filter, setFilter] = useState<FilterType>({
    category: "",
    sortByPrice: "",
  });
  // then I pass the filter to the DisplayProducts component. setter to the Filters component

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="relative min-w-56 ">
        <Filters filter={filter} setFilter={setFilter} />
      </div>
      <main className="py-8 lg:px-8">
        <Breadcrumb aria-label="breadcrumb">
          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/all-products">Products</Link></Breadcrumb.Item>
        </Breadcrumb>
        <DisplayProducts filter={filter} />
      </main>
    </div>
  );
}

export default AllProdutcsPage;
