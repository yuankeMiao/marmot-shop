import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Rating, Carousel } from "flowbite-react";

import { useGetProductByIdQuery } from "../redux/slices/apiQuery";
import { ProductType } from "../misc/productTypes";
import ShopButton from "../components/produtcs/ShopButton";
import AmountControl from "../components/produtcs/AmountControl";
import { ErrorType } from "../misc/errorTypes";

function ProductPage() {
  const productId = Number(useParams().productId);
  const { data, error, isLoading } = useGetProductByIdQuery(productId);
  const product: ProductType = data;

  const [amount, setAmount] = useState(1);

  return (
    <div className="py-4 mx-auto md:max-w-2xl lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      {isLoading && <p>Loading...</p>}
      {error && "data" in error && <p>{(error as ErrorType).data.message}</p>}
      {product && (
        <div className="*:m-4">
          <Breadcrumb aria-label="breadcrumb">
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/all-products">Products</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {product.category.replace(
                product.category[0],
                product.category[0].toUpperCase()
              )}
            </Breadcrumb.Item>
          </Breadcrumb>

          <div className="flex flex-col md:grid grid-cols-3 gap-8">
            <div className="col-span-2 h-[28rem] bg-gray-200 flex justify-center rounded-xl shadow-md">
              <Carousel pauseOnHover>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                ))}
              </Carousel>
            </div>

            <div className="*:mb-4">
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {product.rating}
                </p>
              </Rating>
              <h2 className="text-2xl font-semibold h-28">{product.title}</h2>
              <div>
                <p className="py-4 *:pr-4">
                  <span className="text-2xl font-semibold line-through">
                    {product.price}€
                  </span>
                  <span className="text-3xl font-bold text-red-700">
                    {Math.round(
                      (product.price * (100 - product.discountPercentage)) / 100
                    )}
                    €
                  </span>
                </p>

                <p className="my-2 text-green-600 font-medium">Avaliable Now</p>
              </div>

              <AmountControl amount={amount} setAmount={setAmount} limit={product.stock} />

              <ShopButton newItem={product} quantity={amount} />
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
