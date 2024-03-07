import { useState, useEffect, useCallback } from "react";
import { TextInput, Table, Modal } from "flowbite-react";

import { useLazyGetProductsBySearchQuery } from "../redux/slices/apiQuery";
import { useAppSelector } from "../appHooks/reduxHooks";
import ProductManageForm from "../components/admin/ProductManageForm";
import { ProductType } from "../misc/productTypes";
import TableItemLoader from "../components/skeleton/TableItemLoader";
import DeleteProduct from "../components/admin/DeleteProduct";

const debounce = require("lodash.debounce");

function Dashboard() {
  const [InfoFormModalOpen, setInfoFormModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  const [
    getProductsBySearchTrigger,
    { data: searchResult, isLoading, isFetching },
  ] = useLazyGetProductsBySearchQuery();

  const handleEdit = useCallback((product: ProductType) => {
    setSelectedProduct(product);
    setInfoFormModalOpen(true);
  }, []);

  // since handlAdd is the same all the time ,no need to create a new one every re-render
  const handleAdd = useCallback(() => {
    setSelectedProduct(null);
    setInfoFormModalOpen(true);
  }, []);

  const [input, setInput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    getProductsBySearchTrigger(input);
  };

  const debounced = useCallback(debounce(handleSearch, 1000), [input]);

  useEffect(() => {
    debounced();
    return () => {
      debounced.cancel();
    };
  }, [input, debounced]);

  const { user: currentUser, isLoading: currentUserIsLoading } = useAppSelector(
    (state) => state.currentUser
  );

  if (currentUserIsLoading)
    return (
      <div className="py-20">
        <p className="text-center text-xl dark:text-gray-100">Loading...</p>
      </div>
    );

  if (currentUser?.role !== "admin")
    return <div>You are not authorized to access this page</div>;

  return (
    <div className="p-8 flex flex-col gap-8">
      <button className="btn-primary max-w-min" onClick={() => handleAdd()}>
        Add New Product
      </button>
      <label htmlFor="search-admin" className="sr-only">
        Search
      </label>
      <TextInput
        id="search-admin"
        name="search-admin"
        className="pb-8 pt-4 w-96"
        type="text"
        placeholder="Search products"
        value={input}
        onChange={handleInput}
      />
      <div>
        {input.length > 0 && searchResult?.length === 0 && (
          <div>There is no result, try another keyword.</div>
        )}
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="hidden md:table-cell">
              <span className="sr-only">Thumbnail</span>
            </Table.HeadCell>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell className="hidden lg:table-cell">
              Category
            </Table.HeadCell>
            <Table.HeadCell className="hidden lg:table-cell">
              Brand
            </Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">
              Price
            </Table.HeadCell>
            <Table.HeadCell>Stock</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {(isLoading || isFetching) && (
              <>
                <TableItemLoader />
                <TableItemLoader />
                <TableItemLoader />
                <TableItemLoader />
                <TableItemLoader />
                <TableItemLoader />
                <TableItemLoader />
                <TableItemLoader />
                <TableItemLoader />
              </>
            )}
            {searchResult?.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell className="hidden md:table-cell">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="min-w-[3rem] w-12 min-h-[3rem] h-12 object-cover rounded-md"
                  />
                </Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell className="hidden lg:table-cell">
                  {product.category}
                </Table.Cell>
                <Table.Cell className="hidden lg:table-cell">
                  {product.brand}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {product.price} €
                </Table.Cell>
                <Table.Cell>{product.stock}</Table.Cell>
                <Table.Cell>
                  <button
                    className="text-blue-600 font-semibold underline"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <DeleteProduct
                    product={product}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <Modal
        dismissible
        show={InfoFormModalOpen}
        onClose={() => {
          setInfoFormModalOpen(false);
          setSelectedProduct(null);
        }}
      >
        <Modal.Header>
          {selectedProduct ? "Edit Product" : "Add New Product"}
        </Modal.Header>
        <Modal.Body>
          <ProductManageForm
            initialValue={selectedProduct}
            setInfoFormModalOpen={setInfoFormModalOpen}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashboard;
