import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Rating, Button } from "flowbite-react";

import { useGetProductByIdQuery } from "../redux/slices/productQuery";
import { ProductType } from "../misc/productTypes";
import ShopAndFav from "../components/produtcs/ShopAndFav";

function ProductPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const productId = Number(useParams().productId);
  const { data, error, isLoading } = useGetProductByIdQuery(productId); //Yay!!!!
  const product: ProductType = data;

  const [amount, setAmount] = useState(1);

  const handleIncrement = () => {
    setAmount(prev => prev + 1);
  };

  const handledecrement = () => {
    if (amount > 1) {
      setAmount(prev => prev - 1);
    }
  };

  // i did not set the input type = "number" because I dont want the default browser layout for number input
  // so here I use customized validation for the input to make sure it is number and greater than 0, less than 100
  const handleInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value)){
      setAmount(1);
    } else if (Number(e.target.value) < 1) {
      setAmount(1);
    } else if (Number(e.target.value) > 99) {
      setAmount(99);
    } else {
      setAmount(Number(e.target.value));
    }
  };

  return (
    <div className="py-4 mx-auto md:max-w-2xl lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      {isLoading && <p>Loading...</p>}
      {product && (
        <div className="*:m-4">
          <Breadcrumb aria-label="breadcrumb">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/all-products">Products</Breadcrumb.Item>
            <Breadcrumb.Item href="/">
              {product.category.replace(
                product.category[0],
                product.category[0].toUpperCase()
              )}
            </Breadcrumb.Item>
          </Breadcrumb>

          <div className="flex flex-col md:grid grid-cols-3 gap-8">
            <div className="col-span-2 max-h-96 bg-white p-8 flex justify-center rounded-xl shadow-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full md:h-full aspect-square object-contain"
              />
            </div>

            <div className="*:mb-4">
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {product.rating.rate}
                </p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                  {product.rating.count} reviews
                </span>
              </Rating>
              <h2 className="text-2xl font-semibold h-28">{product.title}</h2>
              <div>
                <p className="text-3xl font-bold">{product.price} €</p>
                <p className="my-2 text-green-600 font-medium">Avaliable Now</p>
              </div>

              <Button.Group>
                <Button color="gray" onClick={handledecrement} disabled={amount === 1}>-</Button>
                <input
                  type="text"
                  className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-md text-center"
                  value={amount}
                  onChange={handleInputAmount}
                />
                <Button color="gray" onClick={handleIncrement}>+</Button>
              </Button.Group>
              <ShopAndFav newItem={{...product,quantity:0}} quantity={amount} />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold py-8">Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
