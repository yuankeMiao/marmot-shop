import DisplayProducts from "../components/produtcs/DisplayProducts";
import Filters from "../components/produtcs/Filters";

function AllProdutcsPage() {
  return (
    <div className="flex">
      <div className="relative min-w-56">
        <Filters />
      </div>
      <main className="p-8">
        <DisplayProducts />
      </main>
    </div>
  );
}

export default AllProdutcsPage;
