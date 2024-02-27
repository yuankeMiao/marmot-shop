import { useState, useEffect, useCallback } from "react";
import { TextInput, Table, Modal } from "flowbite-react";

import { useLazyGetProductsBySearchQuery, useDeleteProductMutation } from "../redux/slices/apiQuery";
import ProductManageForm from "../components/admin/ProductManageForm";
import { set } from "react-hook-form";
import { ProductType } from "../misc/productTypes";

const debounce = require("lodash.debounce");

function Dashboard() {
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [InfoFormModalOpen, setInfoFormModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  const [
    getProductsBySearchTrigger,
    { data: searchResult, isLoading, isFetching, error: searchError },
  ] = useLazyGetProductsBySearchQuery();

  const [deleteProductTrigger, { isSuccess: deleteSuccess, error: deleteError, isLoading:deleteLoading }] = useDeleteProductMutation();
  const handleDelete = (id: number) => {
    setDeleteModalOpen(true);
    deleteProductTrigger(id);
  }

  const handleEdit = (product: ProductType) => {
    setInfoFormModalOpen(true);
    setSelectedProduct(product);
  }

  const handleAdd = () => {
    setSelectedProduct(null);
    setInfoFormModalOpen(true);
  }

  const [input, setInput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const debounced = useCallback(
    debounce(() => {
      getProductsBySearchTrigger(input);
    }, 1000),
    [input]
  );

  useEffect(() => {
    if (input.length > 0) debounced();
    else getProductsBySearchTrigger(input);
    return () => {
      debounced.cancel();
    };
  }, [input, debounced, getProductsBySearchTrigger]);

  return (
    <div className="p-8 flex flex-col gap-8">
      <button className="btn-primary max-w-min" onClick={() => handleAdd()}>Add New Product</button>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <TextInput
        id="search"
        className="pb-8 pt-4 w-96"
        type="text"
        placeholder="Search products"
        value={input}
        onChange={handleInput}
      />
      <div>
      {(isLoading || isFetching) && <div>Loading ...</div>}
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
                  <button className="text-blue-600 font-semibold underline" onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button className="text-red-700 font-semibold underline" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <Modal show={InfoFormModalOpen} onClose={() => {setInfoFormModalOpen(false); setSelectedProduct(null)}}>
        <Modal.Header>{selectedProduct ? "Edit Product" : "Add New Product"}</Modal.Header>
        <Modal.Body>
          <ProductManageForm initialValue={selectedProduct} />
        </Modal.Body>
      </Modal>

      <Modal dismissible show={DeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Modal.Header>Delete Product</Modal.Header>
        <Modal.Body>
          {deleteLoading && <div>Deleting ...</div>}
          {deleteSuccess && <div>Product has been deleted</div>}
          {deleteError && <div>Something wrong with the delete!</div>}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashboard;
