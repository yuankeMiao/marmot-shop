import { Breadcrumb } from "flowbite-react";

import DisplayProducts from "../components/produtcs/DisplayProducts";
import Filters from "../components/produtcs/Filters";

function AllProdutcsPage() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="relative min-w-56 ">
        <Filters />
      </div>
      <main className="py-8 lg:px-8">
        <Breadcrumb aria-label="breadcrumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/all-products">Products</Breadcrumb.Item>
        </Breadcrumb>
        <DisplayProducts />
      </main>
    </div>
  );
}

export default AllProdutcsPage;
