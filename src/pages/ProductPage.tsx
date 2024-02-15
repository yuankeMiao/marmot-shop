import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/slices/productQuery";
import { ProductType } from "../types/productTypes";

function ProductPage() {
  const productId = Number(useParams().productId);

  const { data, error, isLoading } = useGetProductByIdQuery(productId); //Yay!!!!

  console.log(data);

  const product: ProductType = data;

  return (
    <div className="py-4">
      {isLoading && <p>Loading...</p>}
      {product && (
        <div>
          <div className="grid grid-cols-2 gap-8">
            <div className="max-h-96 bg-white flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-full aspect-square object-contain"
              />
            </div>

            <div>
              <p>Rate: {product.rating.rate}</p>
              {/* here i plan to add a rating component for better UI */}
            </div>
          </div>

          <div>
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
