
import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, TextInput } from "flowbite-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useLazyGetProductsBySearchQuery } from "../redux/slices/apiQuery";

const debounce = require("lodash.debounce");

function Search() {
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState<string>("")

  const [triggerSearch,{data: searchResult, isLoading, isFetching, error} ] = useLazyGetProductsBySearchQuery();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch =() => {
    triggerSearch(input)
  }

  const handleClickProduct = () => {
    setOpenModal(false)
    setInput("")
  }

  const debounced = useCallback(debounce(handleSearch, 1000),[input])

  useEffect(() => {
    if(input.length > 0) debounced();
    return () => {
      debounced.cancel()
    }
  },[input, debounced])

  return (
    <div>
      <button
        className="relative w-12 sm:w-40 bg-gray-100 text-gray-600 p-2 text-sm rounded-full hover:bg-gray-300"
        onClick={() => setOpenModal(true)}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-3" />
        <span className="mx-4 hidden sm:inline">Search</span>
      </button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} className="pt-20 sm:p-0">
        <Modal.Header className="sm:hidden"></Modal.Header>
        <Modal.Body>
        <TextInput
        className="pb-8 pt-4"
            type="text"
            placeholder="Search products"
            value={input}
            onChange={handleInput}
          />
          {(isLoading || isFetching) && (<div>Loading ...</div>)}
          {(input.length > 0 && searchResult?.length === 0) && (
          <div>
            <p>There is no result, try another keyword.</p>
            </div>)}
          {input.length>0 &&  searchResult?.map((product) => (
            <div  key={product.id}  className="border-b-2 last:border-none">
              <Link to={`/product/${product.id}`} onClick={handleClickProduct} className="flex gap-8 items-center py-2 ">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="aspect-square h-16 w-16 rounded-md object-cover"
                />
                <h3 className="text-xl font-bold">{product.title}</h3>
                <p className="text-md font-semibold">{product.price} €</p>
              </Link>
            </div>
          ))}
          {error && <div>Something wrong with the search!</div>}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Search;
