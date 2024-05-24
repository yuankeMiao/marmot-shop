import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Rating, Carousel, Pagination } from "flowbite-react";

import { useGetProductByIdQuery } from "../redux/slices/apiQuery";
import { ImageReadDto, ProductReadDto } from "../misc/productTypes";
import ShopButton from "../components/produtcs/ShopButton";
import AmountControl from "../components/produtcs/AmountControl";
import ErrorPage from "./ErrorPage";
import { useGetCategoryByIdQuery } from "../redux/slices/categoryApi";
import ReviewCard from "../components/produtcs/ReviewCard";
import { useGetReviewsByProductIdQuery } from "../redux/slices/reviewApi";
import { ReviewQueryOptionsType, ReviewReadDto } from "../misc/reviewTypes";

const ProductPage = () => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [sortOrder, setSortOrder] = useState<'Asc' | 'Desc'>('Desc');
  const [reviews, setReviews] = useState<ReviewReadDto[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const {
    data: reviewsResponse,
    error: reviewsError,
    isLoading: reviewsIsLoading,
    isFetching: reviewsIsFetching,
  } = useGetReviewsByProductIdQuery({
    productId,
    options: {
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      sortOrder: sortOrder,
      sortBy: 'Rating'
    },
  });

  useEffect(() => {
    if (reviewsResponse) {
      setReviews(reviewsResponse.data);
      setTotalItems(reviewsResponse.totalCount);
    }
  }, [reviewsResponse]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder]);

  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'Asc' | 'Desc');
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <Rating.Star key={`full-${index}`} filled={true} />
        ))}
        {hasHalfStar && <Rating.Star key="half" filled={true} className="half-filled-star" />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Rating.Star key={`empty-${index}`} filled={false} />
        ))}
      </>
    );
  };

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
                {renderStars(product.rating)}
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {product.rating.toFixed(1)}
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
            <div className="flex justify-end mb-4">
              <select
                className="p-2 my-2 text-sm rounded-lg border border-gray-300 dark:bg-gray-700"
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="Asc">Sort by Rating: Low to High</option>
                <option value="Desc">Sort by Rating: High to Low</option>
              </select>
            </div>
            {reviewsIsLoading || reviewsIsFetching ? (
              <p>Loading reviews...</p>
            ) : (
              <>
                {reviews.length === 0 ? (
                  <p>No reviews found.</p>
                ) : (
                  reviews.map((review, index) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                    />
                  ))
                )}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
            {reviewsError && <p>Error loading reviews.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
