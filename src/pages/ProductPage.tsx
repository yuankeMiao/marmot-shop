import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Rating, Carousel } from "flowbite-react";

import { useGetProductByIdQuery } from "../redux/slices/apiQuery";
import { ImageReadDto, ProductReadDto } from "../misc/productTypes";
import ShopButton from "../components/produtcs/ShopButton";
import AmountControl from "../components/produtcs/AmountControl";
import ErrorPage from "./ErrorPage";
import { useGetCategoryByIdQuery } from "../redux/slices/categoryApi";
import ReviewCard from "../components/produtcs/ReviewCard";

function ProductPage() {
  const productId = useParams().productId as string;

  const {
    data: product,
    error: productError,
    isLoading: productIsLoading,
  } = useGetProductByIdQuery(productId);
  const {
    data: category,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useGetCategoryByIdQuery(product?.categoryId);

  const [amount, setAmount] = useState(1);

  return (
    <div className="py-4 mx-auto md:max-w-2xl lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      {productIsLoading && <p>Loading...</p>}
      {productError && <ErrorPage errorMsg="Hi, we don't have this product!" />}
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
              {category?.name.replace(
                category.name[0],
                category.name[0].toUpperCase()
              )}
            </Breadcrumb.Item>
          </Breadcrumb>

          <div className="flex flex-col md:grid grid-cols-3 gap-8">
            <div className="col-span-2 h-[28rem] bg-gray-200 flex justify-center rounded-xl shadow-md">
              <Carousel pauseOnHover>
                {product.images.map((image: ImageReadDto) => (
                  <img
                    key={image.id}
                    src={image.url}
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
                  <span
                    className={`text-2xl font-semibold ${
                      product.discountPercentage > 0 ? "line-through" : ""
                    }`}
                  >
                    {product.price}€
                  </span>
                  {product.discountPercentage > 0 ? (
                    <span className="text-3xl font-bold text-red-500">
                      {Math.round(
                        product.price * (100 - product.discountPercentage)
                      ) / 100}
                      €
                    </span>
                  ) : (
                    <></>
                  )}
                </p>

                <p className="my-2 text-green-600 font-medium">Avaliable Now</p>
              </div>

              <AmountControl
                amount={amount}
                setAmount={setAmount}
                limit={product.stock}
              />

              <ShopButton newItem={product} quantity={amount} />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold py-8">Description</h3>
            <p>{product.description}</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold py-8">Reviews</h3>
            <ReviewCard />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
