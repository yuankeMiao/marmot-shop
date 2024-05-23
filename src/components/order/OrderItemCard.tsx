
import { Link } from 'react-router-dom'
import { OrderProductReadDto } from '../../misc/orderTypes'
import { useState } from 'react';
import CreateReviewForm from '../review/CreateReviewForm';

const OrderItemCard = ({product, role}: {product: OrderProductReadDto, role: string}) => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const handleWriteReview = (productId: string) => {
        setSelectedProductId(productId);
        setShowReviewModal(true);
      };
  return (
    <div
    key={product.productId}
    className="flex items-center border p-2 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <img
      src={product.thumbnail}
      alt={product.title}
      className="w-20 h-20 object-cover rounded mr-4"
    />
    <div className="flex-1">
      <Link to={`/product/${product.productId}`}>
        <h4 className="font-medium text-gray-900 dark:text-gray-100">
          {product.title}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="block">
            Quantity: {product.quantity}
          </span>
          <span className="block">
            Price: {product.actualPrice.toLocaleString()}€
          </span>
          <span className="block">
            Total Price: {product.totalPrice.toLocaleString()}€
          </span>
        </p>
      </Link>
      {role === "customer" && (
        <button
          onClick={() => handleWriteReview(product.productId)}
          className="mt-2 text-sm underline text-blue-600 dark:text-blue-400"
        >
          Write a Review
        </button>
      )}
    </div>

    {showReviewModal && selectedProductId && (
        <CreateReviewForm
          productId={selectedProductId}
          onClose={() => setShowReviewModal(false)}
        />
      )}
  </div>
  )
}

export default OrderItemCard