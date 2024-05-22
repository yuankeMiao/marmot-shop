import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, TextInput } from "flowbite-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useGetAllProductsQuery } from "../../redux/slices/apiQuery";
import { ErrorType } from "../../misc/errorTypes";
import { ProductReadDto } from "../../misc/productTypes";

const debounce = require("lodash.debounce");

function Search() {
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState<string>("");

  const [productList, setProductList] = useState<ProductReadDto[]>([]);
  const {
    data,
    isLoading: productsIsLoading,
    error: productsError,
  } = useGetAllProductsQuery({ title: input });

  useEffect(() => {
    if (data) {
      setProductList(data.data);
    }
  }, [data]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const debouncedHandleInput = useCallback(debounce(handleInput, 1000), []);

  useEffect(() => {
    debouncedHandleInput({ target: { value: input } });
    return () => {
      debouncedHandleInput.cancel();
    };
  }, [input, debouncedHandleInput]);

  const handleClickProduct = () => {
    setOpenModal(false);
    setInput("");
  };

  return (
    <>
      <button
        className="relative w-10 h-10 md:w-40 bg-white dark:bg-gray-100 text-gray-600 p-2 text-sm rounded-full hover:bg-gray-300"
        onClick={() => setOpenModal(true)}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-3"
        />
        <span className="mx-4 hidden md:inline">Search</span>
      </button>

      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="pt-20 sm:p-0"
      >
        <Modal.Header className="sm:hidden"></Modal.Header>
        <Modal.Body>
          <TextInput
            className="pb-8 pt-4"
            type="text"
            placeholder="Search products"
            value={input}
            onChange={handleInput}
          />
          {productsIsLoading && (
            <div className="dark:text-gray-100">Loading ...</div>
          )}
          {input.length > 0 && productList?.length === 0 && (
            <div className="dark:text-gray-100">
              <p>There is no result, try another keyword.</p>
            </div>
          )}
          {input.length > 0 &&
            productList?.map((product) => (
              <div
                key={product.id}
                className="border-b-2 dark:border-gray-400 last:border-none dark:text-gray-100"
              >
                <Link
                  to={`/product/${product.id}`}
                  onClick={handleClickProduct}
                  className="flex gap-8 justify-between items-center py-2 "
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="aspect-square h-12 w-12 md:h-16 md:w-16 rounded-md object-cover"
                    />
                    <h3 className="text-lg md:text-xl font-bold mx-4">
                      {product.title}
                    </h3>
                  </div>
                  <p className="py-4 *:pr-4">
                    <span className={`text-sm md:text-md font-semibold ${product.discountPercentage && product.discountPercentage !== 0 ? "line-through" : ""}`}>
                      {product.price}€
                    </span>
                    {!product.discountPercentage ||
                    product.discountPercentage === 0 ? (
                      <></>
                    ) : (
                      <span className="text-md md:text-lg font-bold text-red-700">
                        {Math.round(
                          product.price * (100 - product.discountPercentage)
                        ) / 100}
                        €
                      </span>
                    )}
                  </p>
                </Link>
              </div>
            ))}
          {productsError && "data" in productsError && (
            <div className="dark:text-gray-100">
              <p>{(productsError as ErrorType).data.message}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Search;
