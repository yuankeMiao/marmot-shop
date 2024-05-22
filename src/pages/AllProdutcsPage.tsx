import { useState } from "react";
import { Breadcrumb } from "flowbite-react";

import DisplayProducts from "../components/produtcs/DisplayProducts";
import Filters from "../components/produtcs/Filters";

import { Link } from "react-router-dom";
import { ProductQueryOptionsType } from "../misc/productTypes";


function AllProdutcsPage() {

  const [filter, setFilter] = useState<ProductQueryOptionsType>({});

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="relative min-w-56 ">
        <Filters filter={filter} setFilter={setFilter} />
      </div>
      <main className="py-8 px-4 lg:px-8">
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
