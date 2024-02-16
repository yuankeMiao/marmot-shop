import { Breadcrumb } from "flowbite-react";

import DisplayProducts from "../components/produtcs/DisplayProducts";
import Filters from "../components/produtcs/Filters";

function AllProdutcsPage() {
  return (
    <div className="pt-8">
      <Breadcrumb aria-label="breadcrumb">
        <Breadcrumb.Item
          href="/"
        >
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="/all-products"
        >
          Products
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="flex">
        <div className="relative min-w-56">
          <Filters />
        </div>
        <main className="p-8">
          <DisplayProducts />
        </main>
      </div>
    </div>
  );
}

export default AllProdutcsPage;
