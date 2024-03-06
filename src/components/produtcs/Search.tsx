import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, TextInput } from "flowbite-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useLazyGetProductsBySearchQuery } from "../../redux/slices/apiQuery";
import { ErrorType } from "../../misc/errorTypes";

const debounce = require("lodash.debounce");

function Search() {
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState<string>("");

  const [triggerSearch, { data: searchResult, isLoading, isFetching, error }] =
    useLazyGetProductsBySearchQuery();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    triggerSearch(input);
  };

  const handleClickProduct = () => {
    setOpenModal(false);
    setInput("");
  };

  const debounced = useCallback(debounce(handleSearch, 1000), [input]);

  useEffect(() => {
    if (input.length > 0) debounced();
    return () => {
      debounced.cancel();
    };
  }, [input, debounced]);

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
          {(isLoading || isFetching) && (
            <div className="dark:text-gray-100">Loading ...</div>
          )}
          {input.length > 0 && searchResult?.length === 0 && (
            <div className="dark:text-gray-100">
              <p>There is no result, try another keyword.</p>
            </div>
          )}
          {input.length > 0 &&
            searchResult?.map((product) => (
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
                      className="aspect-square h-16 w-16 rounded-md object-cover"
                    />
                    <h3 className="text-xl font-bold mx-4">{product.title}</h3>
                  </div>
                  <p className="py-4 *:pr-4">
                    <span className="text-md font-semibold line-through">
                      {product.price}€
                    </span>
                    <span className="text-lg font-bold text-red-700">
                      {Math.round(
                        (product.price * (100 - product.discountPercentage)) /
                          100
                      )}
                      €
                    </span>
                  </p>
                </Link>
              </div>
            ))}
          {error && "data" in error && (
            <div className="dark:text-gray-100">
              <p>{(error as ErrorType).data.message}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Search;
