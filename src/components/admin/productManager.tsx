import { useState, useEffect, useCallback, useMemo } from "react";
import { TextInput, Table, Modal, Pagination } from "flowbite-react";

import {
  ProductQueryOptionsType,
  ProductReadDto,
} from "../../misc/productTypes";
import TableItemLoader from "../../components/skeleton/TableItemLoader";
import DeleteProduct from "../../components/admin/DeleteProduct";
import { useGetAllProductsQuery } from "../../redux/slices/apiQuery";
import { useGetAllCategoriesQuery } from "../../redux/slices/categoryApi";
import UpdateProductForm from "../../components/admin/UpdateProductForm";
import CreateProductForm from "../../components/admin/CreateProductForm";
import Filters from "../../components/produtcs/Filters";

const debounce = require("lodash.debounce");

function ProductManager() {
  const [InfoFormModalOpen, setInfoFormModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductReadDto | null>(
    null
  );

  // pagination
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const onPageChange = (page: number) => setCurrentPage(page);

  const [filter, setFilter] = useState<ProductQueryOptionsType>({});
  const [products, setProducts] = useState<ProductReadDto[]>([]);

  const { data: categories, error: categoryError, isLoading: categoryIsLoading } = useGetAllCategoriesQuery(null);

  const { data: productsQueryResult, error, isLoading, isFetching } = useGetAllProductsQuery({
    ...filter,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  useEffect(() => {
    if (productsQueryResult) {
      setProducts(productsQueryResult.data);
      setTotalItems(productsQueryResult.totalCount);
    }
  }, [productsQueryResult]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems]);

  const handleEdit = useCallback((product: ProductReadDto) => {
    setSelectedProduct(product);
    setInfoFormModalOpen(true);
  }, []);

  const handleAdd = useCallback(() => {
    setSelectedProduct(null);
    setInfoFormModalOpen(true);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      title: e.target.value,
    }));
  };

  const debouncedInput = useCallback(
    debounce((value: string) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        title: value,
      }));
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedInput(filter.title || "");
    return () => {
      debouncedInput.cancel();
    };
  }, [filter.title, debouncedInput]);

  return (
    <div className="p-8 flex flex-col gap-8">
      <button className="btn-primary max-w-min" onClick={() => handleAdd()}>
        Add New Product
      </button>

      <div className="relative min-w-56 ">
        <Filters filter={filter} setFilter={setFilter} className="topbar" />
      </div>

      <label htmlFor="search-admin" className="sr-only">
        Search
      </label>
      <TextInput
        id="search-admin"
        name="search-admin"
        className="pb-8 pt-4 w-96"
        type="text"
        placeholder="Search products"
        value={filter.title || ""}
        onChange={handleInput}
      />

      {isLoading || isFetching ? (
        <>
          <Table>
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
              <Table.HeadCell className="hidden md:table-cell">
                Discount
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
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
              <TableItemLoader />
            </Table.Body>
          </Table>
        </>
      ) : (
        <>
          {filter.title && products?.length === 0 && (
            <div className="dark:text-gray-100">
              <p>There is no result, try another keyword.</p>
            </div>
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
              <Table.HeadCell className="hidden md:table-cell">
                Discount
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
              {products?.map((product) => (
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
                    {
                      categories?.filter((c) => c.id === product.categoryId)[0]
                        .name
                    }
                  </Table.Cell>
                  <Table.Cell className="hidden lg:table-cell">
                    {product.brand}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {product.price} €
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    - {product.discountPercentage} %
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
        </>
      )}

      <div className="flex sm:justify-center my-4">
        <Pagination
          className="hidden sm:flex"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <Pagination
          className="flex sm:hidden"
          layout="navigation"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
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
          {selectedProduct ? (
            <UpdateProductForm
              initialValue={selectedProduct}
              setInfoFormModalOpen={setInfoFormModalOpen}
            />
          ) : (
            <CreateProductForm setInfoFormModalOpen={setInfoFormModalOpen} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductManager;
